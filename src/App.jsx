import { Route, Routes } from 'react-router-dom';

import './App.css'

import { MainPage } from './pages/MainPage'
import { UserPage } from "./pages/UserPage";
import { CategoryPage } from "./pages/CategoryPage";
import { SpendingPage } from "./pages/SpendingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UserDetailPage } from "./pages/UserDetailPage";
import { Layout } from "./components/Layout";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path="users" element={<UserPage/>}/>
          <Route path="users/:id" element={<UserDetailPage/>}/>
          <Route path="categories" element={<CategoryPage/>}/>
          <Route path="spendings" element={<SpendingPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
      <footer>

      </footer>
    </>
  )
}

export default App
