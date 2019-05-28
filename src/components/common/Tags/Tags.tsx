import { PostConsumer } from "../../../contexts/postContext";
import { Tag, Tooltip } from "antd";
import Router from "next/router";
import "./tags.css";

interface TagItem {
  tagList: Array<number>;
}

const TagItem = ({ tagList }: TagItem) => {
  const isLongTag = tagList.length > 6;
  const tag = (
    <PostConsumer>
      {({ actions }: any) => (
        <Tooltip title={tagList}>
          <Tag color="#000" onClick={actions.onSearch} data-keyword={tagList}>
            {isLongTag ? `${tagList.slice(0, 6)}...` : tagList}
          </Tag>
        </Tooltip>
      )}
    </PostConsumer>
  );
  return tag;
};

const Tags = ({ tagDatas, styleClass }) => {
  const tagList = tagDatas.map((tagData, index) => {
    return <TagItem tagList={tagData} key={index} />;
  });
  return (
    <div className={styleClass}>
      {styleClass === "topTagWrap" ? (
        <Tag
          color="#40a9ff"
          onClick={() => {
            window.location.reload();
          }}
        >
          ALL
        </Tag>
      ) : null}
      {tagList}
    </div>
  );
};

export default Tags;
