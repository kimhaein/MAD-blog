import { Icon } from "antd";
import Post from "../../Post";
import "./modal.css";

interface Props {
  isOpen: boolean;
  postDatas: object[];
  openModal: () => void;
}
const PostModal: React.FC<Props> = ({ isOpen, postDatas, openModal }) => {
  return (
    <div className={isOpen ? "modalWrap" : "modalWrap hidden"}>
      <div className="modal">
        <div className="">
          <h2>
            <span
              className="modalClose"
              onClick={() => {
                openModal();
              }}
            >
              <Icon type="close" />
            </span>
          </h2>
        </div>
        <div className="modalBody">
          <Post postDatas={postDatas} />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
