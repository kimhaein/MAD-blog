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

const MenuBtn: React.FC<{}> = ({ onMenu }: any) => {
  return (
    <div className="LeftBtn" onClick={onMenu}>
      MENU
    </div>
  );
};

const Login: React.FC<{}> = ({ onModal }: any) => {
  return (
    <div className="login" onClick={onModal}>
      login
    </div>
  );
};

const Logout: React.FC<{}> = ({ onLogOut }: any) => {
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
  isLogin: boolean;
  onMenu(): void;
  onLogOut(): void;
  onModal(): void;
}

const MainHeader: React.FC<Props> = props => {
  return (
    <header>
      <MenuBtn onMenu={props.onMenu} />
      <div className="LeftBtn">
        {props.isLogin ? (
          <Logout onLogOut={props.onLogOut} />
        ) : (
          <Login onModal={props.onModal} />
        )}
      </div>
      <div className="logo">
        <Link href="/">
          <span>MAD;</span>
        </Link>
      </div>
      <div className="postBtn">
        {props.isLogin ? (
          <Link href="/write">
            <span>Post</span>
          </Link>
        ) : (
          <PostBtn />
        )}
      </div>
    </header>
  );
};

export default MainHeader;
