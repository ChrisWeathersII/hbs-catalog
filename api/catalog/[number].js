// HBS migrated its course catalog from static pages
// (www.hbs.edu/coursecatalog/{number}.html) to the Leepfrog "FoSE" search app
// at coursecatalog.mba.hbs.edu. The old URLs now 200-redirect to a generic SPA
// shell, so the previous HTML scrape silently returned no paragraphs.
//
// FoSE exposes a two-step JSON API:
//   1. POST ?route=search  with a keyword -> returns code / crn / srcdb
//   2. POST ?route=details with code+crn+srcdb -> returns the description HTML
const FOSE_BASE = 'https://coursecatalog.mba.hbs.edu/api/?page=fose'

function htmlToParagraphs(html) {
  if (!html) return []
  const paragraphs = []
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let match
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, '’')
      .replace(/&lsquo;/g, '‘')
      .replace(/&rdquo;/g, '”')
      .replace(/&ldquo;/g, '“')
      .replace(/&mdash;/g, '—')
      .replace(/\s+/g, ' ')
      .trim()
    if (text && text.length > 20) paragraphs.push(text)
  }
  // Fallback: some descriptions have no <p> wrappers, just bare text.
  if (paragraphs.length === 0) {
    const text = html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim()
    if (text.length > 20) paragraphs.push(text)
  }
  return paragraphs
}

async function fosePost(route, body) {
  const r = await fetch(`${FOSE_BASE}&route=${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; HBSCatalog/1.0)',
    },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`FoSE ${route} HTTP ${r.status}`)
  const data = await r.json()
  if (data && data.fatal) throw new Error(`FoSE ${route}: ${data.fatal}`)
  return data
}

export default async function handler(req, res) {
  const { number } = req.query

  if (!number || !/^\d+$/.test(number)) {
    return res.status(400).json({ error: 'Invalid course number' })
  }

  try {
    // 1. Search by course number.
    const search = await fosePost('search', {
      other: { srcdb: '' },
      criteria: [{ field: 'keyword', value: String(number) }],
    })

    const results = Array.isArray(search?.results) ? search.results : []
    // Match the result whose code ends with the exact course number
    // (e.g. "3 TECH 1632" -> 1632), so a substring hit can't win.
    const numRe = new RegExp(`(^|\\s)${number}$`)
    const hit =
      results.find(r => numRe.test(String(r.code || '').trim())) || results[0]

    if (!hit) {
      return res.status(404).json({ error: 'Course not found on HBS catalog' })
    }

    // 2. Fetch full details for the description.
    const srcdb = hit.srcdb || search.srcdb
    const details = await fosePost('details', {
      group: `code:${hit.code}`,
      key: `crn:${hit.crn}`,
      srcdb,
      matched: `crn:${hit.crn}`,
    })

    const paragraphs = htmlToParagraphs(details?.description)
    const faculty =
      (details?.instructordetail_html || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim() ||
      hit.instr ||
      null

    res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate') // cache 1 week
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.json({ paragraphs, faculty })
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch course data' })
  }
}
