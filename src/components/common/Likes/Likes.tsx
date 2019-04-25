import { Statistic, Icon } from "antd";
import "./likes.css";

const Likes = ({ likeDatas, love }) => {
  const color = love === 1 ? "#f92672" : "%%$#ccc";
  return (
    <div className="likeWrap">
      <Statistic
        value={likeDatas}
        prefix={<Icon type="heart" theme="filled" />}
        valueStyle={{ fontSize: 18, lineHeight: "20px", color: color }}
      />
    </div>
  );
};

export default Likes;
