import { Tabs, List } from "antd";

const TabPane = Tabs.TabPane;
interface Props {
  tab: string;
  openModal(pno?: number, userId?: number): void;
  key: string;
  dataSource: object[];
}

const Tab: React.FC<Props> = ({
  tab,
  openModal,
  key,
  dataSource,
  ...restProps
}) => {
  return (
    <TabPane key={key} {...restProps}>
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item: any) => (
          <List.Item
            onClick={() => {
              openModal(item.pno, item.writer);
            }}
          >
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
