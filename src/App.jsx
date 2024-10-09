import { Link, Route, Routes } from 'react-router-dom';

import './App.css'

import { MainPage } from './pages/MainPage'
import { UserPage } from "./pages/UserPage";
import { CategoryPage } from "./pages/CategoryPage";
import { SpendingPage } from "./pages/SpendingPage";
import { NotFoundPage } from "./pages/NotFoundPage";


function App() {

  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/spendings">Spendings</Link>
      </header>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/users" element={<UserPage/>}/>
        <Route path="/categories" element={<CategoryPage/>}/>
        <Route path="/spendings" element={<SpendingPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <footer>

      </footer>
    </>
  )
}

export default App
