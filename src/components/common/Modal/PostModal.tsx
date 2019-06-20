import { Icon } from "antd";
import Post from "../../Post";
import "./modal.css";

interface Props {
  title: string;
  isOpen: boolean;
  postDatas: object[];
  openModal(): void;
}
const PostModal: React.FC<Props> = ({
  title,
  isOpen,
  postDatas,
  openModal
}) => {
  return (
    <div className={isOpen ? "modalWrap" : "modalWrap hidden"}>
      <div className="modal">
        <div>
          <h2>
            {title}
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
          <Post postDatas={postDatas} type="detail" />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
