import Link from "next/link";
import { Drawer, Avatar, Icon } from "antd";

const Menu = ({ state, actions }) => {
  return (
    <Drawer
      title="MAD-BLOG"
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
      ) : null}
      <ul className="menuLisr">
        <li>
          <Link href="/trend">
            <span>
              <Icon type="dot-chart" />
              트랜딩 차트
            </span>
          </Link>
        </li>
        <li>
          <Link href="/tags">
            <span>
              <Icon type="tag" />
              태그 차트
            </span>
          </Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default Menu;
