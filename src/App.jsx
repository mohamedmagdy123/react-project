import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import Tv from "./Components/Tv/Tv";
import People from "./Components/People/People";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import jwtDecode from "jwt-decode";
import { useState } from "react";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { path: 'home', element: <Home /> },
        { path: 'movies', element: <Movies /> },
        { path: 'tv', element: <Tv /> },
        { path: 'people', element: <People /> },
        { path: 'login', element: <Login /> },
        { index: true, element: <Register /> }
      ]
    },
  ]);
  return (<>
    <RouterProvider router={routers} /></>);
}

export default App;
