import "./AuthorHomePage.css";

import AuthorHomePageStats from "../AuthorHomePageStats";
import AuthorHomePageBooks from "../AuthorHomePageBooks/AuthorHomePageBooks";

const AuthorHomePage = () => {
  return (
    <div className="author-page-container">
      <AuthorHomePageStats />
      <AuthorHomePageBooks />
    </div>
  );
};

export default AuthorHomePage;
