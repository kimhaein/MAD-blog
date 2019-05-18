import { Drawer, Avatar } from "antd";

const Menu = ({ state, actions }) => {
  return (
    <Drawer
      title="MAD-BLOG"
      placement={"left"}
      closable={true}
      onClose={actions.onMenu}
      visible={state.isMenu}
    >
      <Avatar
        src={localStorage.getItem("userImg")}
        style={{ backgroundColor: "#000", marginRight: 10 }}
      />
      <p>{localStorage.getItem("userName")}</p>
      <p>메뉴우</p>
      <p>메뉴우2</p>
      <p>메뉴우3</p>
    </Drawer>
  );
};

export default Menu;
