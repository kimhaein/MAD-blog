import { Tabs, List } from "antd";

const TabPane = Tabs.TabPane;
// interface TabsItem {
//   tabList: Array<number>;
// }

const Tab = ({ my_prop, key, userFavoriteList, ...restProps }) => {
  return (
    <TabPane key={key} {...restProps}>
      <List
        itemLayout="horizontal"
        dataSource={userFavoriteList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<span>{item.title}</span>}
              description={item.contents}
            />
          </List.Item>
        )}
      />
    </TabPane>
  );
};

export default Tab;
