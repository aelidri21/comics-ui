import { Routes, Route, Link } from 'react-router-dom'
import SearchPage from './pages/SearchPage'

export default function App() {
  return(
    <>
      <header style={{ padding: '1rem'}}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 700}}>
      Comics UI
      </Link>
      </header>

      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </>
  )
}