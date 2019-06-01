import { Tabs, List } from "antd";

const TabPane = Tabs.TabPane;
// interface TabsItem {
//   tabList: Array<number>;
// }

const Tab = ({ my_prop, key, userFavoriteList, ...restProps }) => {
  const returnToParents = (pno, writer) => {
    // 클릭된 녀석의 pno 값을 부모에게 리턴
    my_prop(pno, writer);
  };
  return (
    <TabPane key={key} {...restProps}>
      <List
        itemLayout="horizontal"
        dataSource={userFavoriteList}
        renderItem={item => (
          <List.Item pno={item.pno}>
            <List.Item.Meta
              title={<span>{item.title}</span>}
              description={item.contents}
              onClick={returnToParents.bind(this, item.pno, item.writer)}
            />
          </List.Item>
        )}
      />
    </TabPane>
  );
};

export default Tab;
