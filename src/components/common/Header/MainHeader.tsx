import Link from "next/link";
import "./header.css";

const Login = ({ onModal }) => {
  return (
    <div className="login" onClick={onModal}>
      login
    </div>
  );
};

const Logout = ({ onLogOut }) => {
  return (
    <div className="login" onClick={onLogOut}>
      logout
    </div>
  );
};

const PostBtn = () => {
  return <div className="postBtn">Post1</div>;
};

const MainHeader = ({ onModal, onLogOut, isLogin }) => {
  return (
    <header>
      <div className="LeftBtn">
        {isLogin ? <Logout onLogOut={onLogOut} /> : <Login onModal={onModal} />}
      </div>
      <div className="logo">
        <Link href="/">
          <a>MAD;</a>
        </Link>
      </div>
      <div className="postBtn">
        {isLogin ? (
          <Link href="/write">
            <a>Post</a>
          </Link>
        ) : (
          <PostBtn />
        )}
      </div>
    </header>
  );
};

export default MainHeader;
