import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';
import './App.css';
import Home from "./views/Home/Home";
import Reservation from "./views/Reservation/Reservation";
import Login from "./views/Login/Login";
import Review from "./views/Review/Review";
import Dashboard from "./views/Dashboard/Dashboard";
import Contact from "./views/Contact/Contact";
import Payment from "./components/Payment/Payment";
import Admin from "./views/Admin/Admin";
import Chatbot from "./views/Chatbot/Chatbot"
import Signup from "./views/Signup/Signup";
import Checker from "./views/Checker/Checker";
import ProgressTracker from "./views/ProgressTracker/ProgressTracker";
// import AdminLogin from "./views/Admin/AdminLogin"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/contact",
      element: <Contact/>
    },
    {
      path: "/review",
      element: <Review/>
    },

    {
      path: "/reservation",
      element: <Reservation/>
    },
    
    {
      path: "/chatbot",
      element: <Chatbot/>
    },
    {
      path: "/payment",
      element: <Payment/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path: "/admin",
      element : <Admin/>
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    },
    {
      path: "/symptoms",
      element: <Checker/>
    },
    {
      path: "/progress-tracker",
      element: <ProgressTracker/>
    },

  ])

  return (
    <>
    {/* === ROUTING HERE  === */}
    <RouterProvider router={router}/>
    
    </>
  );
}
export default App;
