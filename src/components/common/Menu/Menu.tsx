import Link from "next/link";
import { Drawer, Avatar } from "antd";
import "./menu.css";

interface Props {
  isMenu: boolean;
  userName: string;
  userImg: string;
  onMenu(): void;
}

const Menu: React.FC<Props> = props => {
  return (
    <Drawer
      placement={"left"}
      closable={true}
      onClose={props.onMenu}
      visible={props.isMenu}
    >
      {props.userName ? (
        <div className="userInfo">
          <Avatar
            src={props.userImg}
            size={150}
            style={{ backgroundColor: "#000" }}
          >
            {props.userName.substring(0, 1).toUpperCase()}
          </Avatar>
          <p>{props.userName}</p>
        </div>
      ) : (
        <div className="userInfo">
          <Avatar size={150} style={{ backgroundColor: "#000" }}>
            MAD
          </Avatar>
          <p>MAD BLOG</p>
        </div>
      )}
      <ul className="menuList">
        <li>
          <Link href="/trend">
            <span>트렌딩 차트</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage">
            <span>마이페이지</span>
          </Link>
        </li>
      </ul>
      <div className="menuFooter">
        <div className="catImg" />
        <Link href="/readme">
          <h3>프로젝트 소개</h3>
        </Link>
        <div className="gitHub">
          <p>GitHub</p>
          <ul>
            <li>황윤지 /</li>
            <li> 김혜인 /</li>
            <li>유윤선</li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default Menu;
