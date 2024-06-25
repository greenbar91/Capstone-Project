import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import BookDetails from '../components/BookDetails';
import AuthorHomePage from '../components/AuthorHomePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"/books/:bookId",
        element: <BookDetails/>
      },
      {
        path:"/books/my_books",
        element: <AuthorHomePage/>
      }
    ],
  },
]);
