import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { MainPage } from "./pages/MainPage.jsx";
import { UserDetailPage } from "./pages/UserDetailPage.jsx";
import { CategoryPage } from "./pages/CategoryPage.jsx";
import { SpendingPage } from "./pages/SpendingPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <MainPage/>,
      },
      {
        path: 'users/',
        element: <UserPage/>,
      },
      {
        path: 'users/:id/',
        element: <UserDetailPage/>,
      },
      {
        path: 'categories/',
        element: <CategoryPage/>,
      },
      {
        path: 'spendings/',
        element: <SpendingPage/>,
      },
      {
        path: '*',
        element: <NotFoundPage/>,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);
