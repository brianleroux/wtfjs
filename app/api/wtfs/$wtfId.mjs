import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'
const arcdown = new Arcdown()

export async function get(req) {
    // Get requested path
    const { path: activePath } = req
    let docPath = activePath.replace(/^\/?wtfs\//, '') || 'index'
    
    // Read markdown file
    const docURL = new URL(`../../md/${docPath}.md`, import.meta.url)
    const docMarkdown = readFileSync(docURL.pathname, 'utf-8')

    // Convert to HTML and add to store
    const doc = await arcdown.render(docMarkdown)
    return {
        json: {
            title: docPath.replace(/-/g, ' '),
            message: doc,
        }
    }
}
