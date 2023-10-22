import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage/Index';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
