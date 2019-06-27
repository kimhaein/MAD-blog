import Link from "next/link";
import { Modal, message } from "antd";
const confirm = Modal.confirm;

import "./header.css";

// confirm
const showConfirm = (content: string, onOk: () => void) => {
  confirm({
    title: "mad-blog",
    content: content,
    onOk() {
      onOk();
    }
  });
};

const MenuBtn: React.FC<Props> = ({ onMenu }) => {
  return (
    <div className="LeftBtn" onClick={onMenu}>
      MENU
    </div>
  );
};

const Login: React.FC<Props> = ({ onModal }) => {
  return (
    <div className="login" onClick={onModal}>
      login
    </div>
  );
};

const Logout: React.FC<Props> = ({ onLogOut }: any) => {
  return (
    <div
      className="login"
      onClick={() => {
        showConfirm("로그아웃 하시겠습니까?", onLogOut);
      }}
    >
      logout
    </div>
  );
};

const PostBtn: React.FC<{}> = () => {
  const alertEvt = () => {
    message.warning("로그인 후 이용해 주세요");
  };
  return (
    <div className="postBtn" onClick={alertEvt}>
      Post
    </div>
  );
};

interface Props {
  isLogin?: boolean;
  isMobile?: boolean;
  onMenu?(): void;
  onLogOut?(): void | undefined;
  onModal?(): void;
}

const MainHeader: React.FC<Props> = props => {
  return (
    <header>
      <MenuBtn onMenu={props.onMenu} />
      <div className="LeftBtn">{props.isLogin ? <Logout onLogOut={props.onLogOut} /> : <Login onModal={props.onModal} />}</div>
      <div className="logo">
        <Link href="/">
          <span>MAD;</span>
        </Link>
      </div>
      {props.isLogin ? (
        <div className="postBtn">
          <Link href="/write">
            <span>Post</span>
          </Link>
        </div>
      ) : props.isMobile ? null : (
        <div className="postBtn">
          <PostBtn />
        </div>
      )}
    </header>
  );
};

export default MainHeader;
