import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Protected from './components/Protected';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

const paths = ["/", "/tasks", "/itinerary", "/food", "/gear", "/shopping-list"];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signin" element={<SignIn />} />
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