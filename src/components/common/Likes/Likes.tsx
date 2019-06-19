import { PostConsumer } from "../../../contexts/postContext";
import { Statistic, Icon, message } from "antd";
import "./likes.css";
interface Props {
  like: number;
  love: number;
  pno: number;
  nowUser: number;
}

interface Actions {
  offLike(pno: number): void;
  onLike(pno: number): void;
}
const Likes: React.FC<Props> = ({ like, love, pno, nowUser }) => {
  const color = love === 1 ? "#f5222d" : "#ccc";
  const likeEvt = (actions: Actions) => {
    if (!nowUser) {
      return love === 1 ? actions.offLike(pno) : actions.onLike(pno);
    } else {
      return message.warning("로그인 후 이용해 주세요");
    }
  };

  return (
    <PostConsumer>
      {({ actions }: any) => (
        <div
          className="likeWrap"
          onClick={() => {
            likeEvt(actions);
          }}
        >
          <Statistic
            value={like}
            prefix={<Icon type="heart" theme="filled" />}
            valueStyle={{ fontSize: 18, lineHeight: "20px", color: color }}
          />
        </div>
      )}
    </PostConsumer>
  );
};

export default Likes;
