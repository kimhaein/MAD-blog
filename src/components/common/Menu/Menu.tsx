import Link from "next/link";
import { Drawer, Avatar, Icon } from "antd";
import "./menu.css";

const Menu = ({ state, actions }) => {
  return (
    <Drawer
      placement={"left"}
      closable={true}
      onClose={actions.onMenu}
      visible={state.isMenu}
    >
      {state.userName ? (
        <div className="userInfo">
          <Avatar
            src={state.userImg}
            size={100}
            style={{ backgroundColor: "#000" }}
          >
            {state.userName.substring(0, 1).toUpperCase()}
          </Avatar>
          <p>{state.userName}</p>
        </div>
      ) : (
        <div className="userInfo">
          <Avatar size={100} style={{ backgroundColor: "#000" }}>
            MAD
          </Avatar>
          <p>MAD BLOG</p>
        </div>
      )}
      <ul className="menuList">
        <li>
          <Link href="/trend">
            <span>
              <Icon type="rise" className="icon" />
              트랜딩 차트
            </span>
          </Link>
        </li>
        <li>
          <Link href="/likes">
            <span>
              <Icon type="bar-chart" className="icon" />
              좋아요 랭킹
            </span>
          </Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default Menu;
