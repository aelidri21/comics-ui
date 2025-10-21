import type { Comic } from '../types'

export async function searchComics(query: string): Promise<Comic[]> {
   if (!query.trim()) return []

   const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

   if (!res.ok) {
       const msg = await res.text()
       throw new Error(`Backend error: ${res.status} ${msg}`)
   }

   const data = await res.json()
   return data as Comic[]
}