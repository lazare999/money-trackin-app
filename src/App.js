import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage/Index';
// import Main from './pages/Main/Index';
import { checkAuthLoader } from './pages/HomePage/Index';
// import Test from './pages/Main/Test';
import Main from './pages/Main/Index';
import Expenses from './pages/Expenses/Index';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: 'main', element: <Main />, loader: checkAuthLoader },
  { path: 'category/:category', element: <Expenses /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
