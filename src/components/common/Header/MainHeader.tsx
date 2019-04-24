import Link from "next/link";
import { Button, notification, Icon } from "antd";
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
  const alertEvt = () => {
    notification["info"]({
      message: "mad-blog",
      description: "로그인 후 이용해 주세요",
      duration: 0
    });
  };
  return (
    <div className="postBtn" onClick={alertEvt}>
      Post
    </div>
  );
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
