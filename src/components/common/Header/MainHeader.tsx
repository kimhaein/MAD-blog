import Link from "next/link";
import { Modal, message, Icon } from "antd";
const confirm = Modal.confirm;
import { BrowserView, MobileView } from "react-device-detect";
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
  onMenu?(): void;
  onLogOut?(): void | undefined;
  onModal?(): void;
}

const MainHeader: React.FC<Props> = props => {
  return (
    <header>
      <BrowserView>
        <div className="LeftBtn" onClick={props.onMenu}>
          MENU
        </div>
        <div className="LeftBtn">{props.isLogin ? <Logout onLogOut={props.onLogOut} /> : <Login onModal={props.onModal} />}</div>
      </BrowserView>
      <MobileView>
        <Icon type="menu-fold" style={{ padding: 25, fontSize: "25px" }} onClick={props.onMenu} />
      </MobileView>
      <div className="logo">
        <Link href="/">
          <span>MAD;</span>
        </Link>
      </div>
      <BrowserView>
        {props.isLogin ? (
          <div className="postBtn">
            <Link href="/write">
              <span>Post</span>
            </Link>
          </div>
        ) : (
          <div className="postBtn">
            <PostBtn />
          </div>
        )}
      </BrowserView>
      <MobileView>
        <div className="postBtn">
          {props.isLogin ? (
            <Icon type="logout" style={{ padding: 25, fontSize: "25px" }} onClick={props.onLogOut} />
          ) : (
            <Icon type="login" style={{ padding: 25, fontSize: "25px" }} onClick={props.onModal} />
          )}
        </div>
      </MobileView>
    </header>
  );
};

export default MainHeader;
