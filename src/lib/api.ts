import type { Comic } from '../types'

export async function searchComics(query: string): Promise<Comic[]> {
    if (!query.trim()) return []
    await new Promise (r => setTimeout(r, 400))

    const q = query.trim()
    return[
        {id: '1', title: `${q} #1`, authors: ['Author A'], publisher: 'Test', publishedDate: '2010'},
        {id: '2', title: `${q} Returns`, authors: ['Author B', 'Author C'], publisher: 'Demo', publishedDate: '2015'},
        {id: '3', title: `${q} #1`, authors: ['Author A'], publisher: 'Test', publishedDate: '2010'}
    ]
}