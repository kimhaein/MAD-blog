import { Icon } from "antd";
import "./modal.css";
import Post from "../../Post";

const PostModal = (data, isOpen, fn) => {
  const returnToParents = () => {
    fn(!isOpen);
  };
  console.log("dddd", data);
  return (
    <div className={isOpen ? "modalWrap" : "modalWrap hidden"}>
      <div className="modal myPage">
        <div className="modalHeader">
          <h2>
            <span className="modalClose" onClick={returnToParents}>
              <Icon type="close" />
            </span>
          </h2>
        </div>
        <div className="modalBody">
          <div>
            {data.length === 0 ? (
              <div className="content_no_data">
                <h4>삭제된 글입니다.</h4>
                <p>
                  해당 글은 글쓴이가 삭제함으로써 상세보기를 확인하실 수
                  없습니다.
                </p>
              </div>
            ) : (
              <Post postDatas={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
