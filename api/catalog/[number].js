export default async function handler(req, res) {
  const { number } = req.query

  if (!number || !/^\d+$/.test(number)) {
    return res.status(400).json({ error: 'Invalid course number' })
  }

  try {
    const response = await fetch(`https://www.hbs.edu/coursecatalog/${number}.html`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HBSCatalog/1.0)' },
    })

    if (!response.ok) {
      return res.status(404).json({ error: 'Course not found on HBS catalog' })
    }

    const html = await response.text()

    // Extract faculty title + name from #courseinfo
    const facultyMatch = html.match(/<div[^>]*id="courseinfo"[^>]*>([\s\S]*?)<\/div>/i)
    const facultyRaw = facultyMatch
      ? facultyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      : null

    // Extract description: everything after #courseinfo closing </div>
    const afterInfoIdx = html.indexOf('</div>', html.indexOf('id="courseinfo"')) + 6
    const descSection = afterInfoIdx > 6 ? html.slice(afterInfoIdx) : html

    // Pull all <p> tags from the description section
    const paragraphs = []
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi
    let match
    while ((match = pRegex.exec(descSection)) !== null) {
      const text = match[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
      if (text && text.length > 30) paragraphs.push(text)
    }

    res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate') // cache 1 week
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.json({ paragraphs, faculty: facultyRaw })
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch course data' })
  }
}
