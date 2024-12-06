import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Protected from './components/Protected';
import Login from './pages/Login';
import Home from './pages/Home';

const paths = ["/", "/tasks", "/itinerary", "/meals", "/gear", "/shopping-list"];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Protected />} >
        {paths.map((path, index) => (
          <Route key={index} path={path} element={<Home />} />
        ))}
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);