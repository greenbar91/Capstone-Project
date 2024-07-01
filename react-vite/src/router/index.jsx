import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import BookDetails from '../components/BookDetails';
import AuthorHomePage from '../components/AuthorHomePage';
import ChapterDetails from '../components/ChapterDetails/ChapterDetails';
import Tags from '../components/Tags';
import AllBooksPage from '../components/AllBooksPage';

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
        path:"/books/my_books",
        element: <AuthorHomePage/>
      },
      {
        path:"/books/:bookId",
        element: <BookDetails/>
      },
      {
        path:"/books/:bookId/chapters/:chapterId",
        element: <ChapterDetails/>
      },
      {
        path:"/books/:bookId/tags",
        element: <Tags type="create"/>
      },
      {path:"/books/:bookId/tags/edit",
        element: <Tags type="delete"/>
      },
      {
        path:"/books/all_books",
        element:<AllBooksPage/>
      }
    ],
  },
]);
