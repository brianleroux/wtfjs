import { readFileSync, readdirSync } from 'fs'
import { URL } from 'url'

export async function get(req) {
    // Get requested path
    const { path: activePath } = req
    let docPath = activePath || 'index'
    
    // Read markdown file
    const docsURL = new URL(`../../md`, import.meta.url)
    const docs = readdirSync(docsURL.pathname, 'utf-8')
    
    return {
        json: {
            docs: docs.map(doc => {
                let docName = doc.replace(/\.md$/, '')
                return {
                    url: `/wtfs/${docName}`,
                    title: docName.replace(/-/g, ' '),
                }
            }),
        }
    }
}
