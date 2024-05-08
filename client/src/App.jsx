import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  About,
  Error,
  Home,
  HomeLayout,
  Profile,
  Signin,
  Signup,
} from './pages';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
