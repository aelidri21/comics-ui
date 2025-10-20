
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchComics } from '../lib/api'
import type { Comic } from '../types'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const qFromUrl = params.get('q') ?? ''
  const [query, setQuery] = useState(qFromUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Comic[]>([])

  useEffect(() => setQuery(qFromUrl), [qFromUrl])

  useEffect(() => {
    const q = qFromUrl.trim()
    if(!q) {
      setResults([])
      setError(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    searchComics(q)
      .then(data => { if (!cancelled) setResults(data) })
      .catch(e => { if (!cancelled) setError(e?.message ?? 'Error unknown') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [qFromUrl])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next = query.trim()
    setParams(next ? { q: next } : {})
  }

  const hasQuery = useMemo(() => (qFromUrl.trim().length > 0), [qFromUrl])

  return (
    <main style={{ padding: '1rem', maxWidth: 800, margin: '0 auto' }}>
      <h1>Search Comics</h1>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g. Batman, Spider-Man"
          aria-label="Search comics"
          style={{ flex: 1, padding: '0.6rem 0.8rem' }}
        />
        <button type="submit" style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>
          Search
        </button>
      </form>

      {!hasQuery && <p>Type a keyword and hit <kbd>Search</kbd>.</p>}

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {!loading && !error && results.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
          {results.map((c) => (
            <li key={c.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>
                {c.authors?.length ? c.authors.join(', ') : 'N/A'} {c.publishedDate ? `• ${c.publishedDate}` : ''}
              </div>
              {c.publisher && <div style={{ fontSize: 13, opacity: 0.7 }}>{c.publisher}</div>}
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && hasQuery && results.length === 0 && (
        <p>No results found.</p>
      )}
    </main>
  )
}
