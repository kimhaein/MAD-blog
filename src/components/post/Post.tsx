import { AuthConsumer } from "../../contexts/authContext";
import { Col, Row, Avatar, Icon } from "antd";
import moment from "moment";

// components
import Tags from "../common/Tags";
import Likes from "../common/Likes";
import { Code } from "../common/CodeView/CodeView";

import "./post.css";

const PostMenu = ({ pno, writer }) => {
  return (
    <AuthConsumer>
      {({ actions }: any) => (
        <div className="postMenuBtn">
          <Icon type="more" />
          <ul className="postMenu">
            <li
              onClick={() => {
                actions.onEdit(pno, writer);
              }}
            >
              수정
            </li>
            <li
              onClick={() => {
                actions.onDelete(pno);
              }}
            >
              삭제
            </li>
          </ul>
        </div>
      )}
    </AuthConsumer>
  );
};

interface PostItem {
  postData: {
    pno: number;
    title: string;
    writer: string;
    wrDate: string;
    upDate: string;
    contents: string;
    hashes: string;
    thumbnail_image: string;
    nowUser?: number;
    likes: number;
  };
}

const PostItem = ({ postData }: PostItem) => {
  const hashArry = postData.hashes.split(",");
  return (
    <div className="postList">
      <div className="postListHeader">
        <div className="postListTitle">
          {postData.title}
          {postData.nowUser ? (
            <PostMenu pno={postData.pno} writer={postData.writer} />
          ) : null}
        </div>
        <div className="postInfo">
          <span>
            <Avatar
              src={postData.thumbnail_image}
              style={{ backgroundColor: "#000", marginRight: 10 }}
            >
              {postData.writer.substring(1)}
            </Avatar>
            <span>BY. {postData.writer}</span>
          </span>
          <span className="postDate">
            {moment(postData.wrDate).format("ll")}
          </span>
        </div>
      </div>
      <div className="postListBody">
        <Code markdown={postData.contents} type="post" />
      </div>
      <div className="postListfooter">
        <Tags tagDatas={hashArry} />
        <Likes likeDatas={postData.likes} />
      </div>
    </div>
  );
};

const Post = ({ postDatas }) => {
  let postList = postDatas.map((postData, index) => {
    return (
      <Col xs={24} md={24} lg={24} xl={12} key={index}>
        <PostItem postData={postData} />
      </Col>
    );
  });

  return (
    <Row type="flex" justify="space-between" gutter={32} className="posthWrap">
      {postList}
    </Row>
  );
};

export default Post;
