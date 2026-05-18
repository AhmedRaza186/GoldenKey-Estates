import React from 'react'
import Navbar from './components/navbar/Navbar.jsx'
import HomePage from './pages/Home/Home.jsx'
import { createBrowserRouter, RouterProvider, Link, Route } from "react-router";
import ListPage from './pages/listPage/ListPage.jsx';
import {Layout, RequireAuth} from './pages/layout/Layout.jsx';
import SinglePage from "./pages/singlePage/singlePage.jsx";
// import { singlePageLoader, profilePageLoader } from "./lib/loaders.js";
import ProfilePage from "./pages/profilePage/profilePage.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import ProfileUpdatePage from "./pages/updateProfilePage/UpdateProfile.jsx";
import NewPostPage from "./pages/newPostPage/NewPsotPage.jsx";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";


function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader

        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader: singlePageLoader
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },

      ]
    }
      ]);
  return (

    <div className="pages">
      <RouterProvider router={router} />
    </div>


  )
}

export default App