import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import BookDetails from "../components/BookDetails";
import AuthorHomePage from "../components/AuthorHomePage";
import ChapterDetails from "../components/ChapterDetails/ChapterDetails";
import Tags from "../components/Tags";
import AllBooksPage from "../components/AllBooksPage";
import UpdateBooks from "../components/UpdateBooks";
import CreateChapter from "../components/CreateChapter";
import UpdateChapter from "../components/UpdateChapter/UpdateChapter";
import CreateBook from "../components/CreateBook";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        path: "/books/my_books",
        element: <AuthorHomePage />,
      },
      {
        path:`/books/my_books/add_book`,
        element:<CreateBook/>
      },
      {
        path: "/books/my_books/edit/:bookId",
        element: <UpdateBooks />,
      },
      {
        path: `/books/my_books/add_chapter/:bookId`,
        element: <CreateChapter />,
      },
      {
        path: `/books/my_books/:bookId/edit_chapter/:chapterId`,
        element:<UpdateChapter/>
      },
      {
        path: "/books/:bookId",
        element: <BookDetails />,
      },
      {
        path: "/books/:bookId/chapters/:chapterId",
        element: <ChapterDetails />,
      },
      {
        path: "/books/:bookId/tags",
        element: <Tags type="create" />,
      },
      { path: "/books/:bookId/tags/edit", element: <Tags type="delete" /> },
      {
        path: "/books/all_books",
        element: <AllBooksPage />,
      },
    ],
  },
]);
