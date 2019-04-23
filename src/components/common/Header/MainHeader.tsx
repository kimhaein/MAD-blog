import Link from "next/link";
import "./header.css";

const MenuBtn = () => {
  return <div className="menuBtn">Menu</div>;
};

const Logo = () => {
  return (
    <Link href="/">
      <div className="logo">MAD;</div>
    </Link>
  );
};

const PostBtn = () => {
  return (
    <Link href="/write">
      <div className="postBtn">Post</div>
    </Link>
  );
};

const Login = ({ onModal }) => {
  return (
    <div className="menuBtn">
      <div className="login" onClick={onModal}>
        login
      </div>
    </div>
  );
};

const Logout = ({ onLogOut }) => {
  return (
    <div className="loginWrap">
      <div className="login" onClick={onLogOut}>
        logOut
      </div>
    </div>
  );
};

const MainHeader = ({ onModal, onLogOut }) => {
  return (
    <header>
      {/* <Logout onLogOut={onLogOut} /> */}
      <Login onModal={onModal} />
      <Logo />
      <PostBtn />
    </header>
  );
};

export default MainHeader;
