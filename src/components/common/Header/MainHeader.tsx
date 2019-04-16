import Link from "next/link";
import "./header.css";

const MenuBtn = () => {
  return (
    <div className="menuBtn">
      <a href="https://kauth.kakao.com/oauth/authorize?client_id=6524057de9740a3a5e7e82bbaaf94679&redirect_uri=https://mad-server.herokuapp.com/kakaologin&response_type=code">
        Menu
      </a>
    </div>
  );
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

const Registor = () => {
  return (
    <div className="loginWrap">
      <div className="registor">registor</div>
      <div className="login">login</div>
    </div>
  );
};

const MainHeader = () => {
  return (
    <header>
      <MenuBtn />
      <Logo />
      <Registor />
      <PostBtn />
    </header>
  );
};

export default MainHeader;
