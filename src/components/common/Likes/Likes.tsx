import { AuthConsumer } from "../../../contexts/authContext";
import { Statistic, Icon } from "antd";
import "./likes.css";

const Likes = ({ likeDatas, love, pno }) => {
  const color = love === 1 ? "#f92672" : "#ccc";
  const likeEvt = actions => {
    return love === 1 ? actions.offLike(pno) : actions.onLike(pno);
  };
  return (
    <AuthConsumer>
      {({ actions }: any) => (
        <div
          className="likeWrap"
          onClick={() => {
            likeEvt(actions);
          }}
        >
          <Statistic
            value={likeDatas}
            prefix={<Icon type="heart" theme="filled" />}
            valueStyle={{ fontSize: 18, lineHeight: "20px", color: color }}
          />
        </div>
      )}
    </AuthConsumer>
  );
};

export default Likes;
