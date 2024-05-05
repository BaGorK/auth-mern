import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Home, Profile, Signin, Signup } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/singup',
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
