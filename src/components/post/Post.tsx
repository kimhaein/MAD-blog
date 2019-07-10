import { PostConsumer } from "../../contexts/postContext";
import Router from "next/router";
import { Col, Row, Avatar, Icon } from "antd";
import moment from "moment";
import { BrowserView } from "react-device-detect";

// components
import { Tags } from "../common/Tags";
import Likes from "../common/Likes";
import { CodeView } from "../common/CodeView/CodeView";

import "./post.css";

const PostMenu = ({ pno }: any) => {
  return (
    <BrowserView>
      <div className="postMenuBtn">
        <Icon type="more" />
        <div className="postMenu">
          <span
            onClick={() => {
              Router.replace(`/write?mode=edit&pno=${pno}`);
            }}
          >
            수정
          </span>
          <PostConsumer>
            {({ actions }: any) => (
              <span
                onClick={() => {
                  actions.onDelete(pno);
                }}
              >
                삭제
              </span>
            )}
          </PostConsumer>
        </div>
      </div>
    </BrowserView>
  );
};

interface Props {
  postDatas: object[];
  type?: string | null;
}

interface PostItemProps {
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
    love: number;
  };
  type: string | null;
}

const PostItem: React.FC<PostItemProps> = ({ postData, type }) => {
  const hashArry = postData.hashes ? postData.hashes.split(",") : [];
  return (
    <div className="postList">
      <div className="postListHeader">
        <div className="postListTitle">
          {postData.title}
          {postData.nowUser ? <PostMenu pno={postData.pno} /> : null}
        </div>
        <div className="postInfo">
          <span>
            <Avatar src={postData.thumbnail_image ? postData.thumbnail_image : undefined} style={{ backgroundColor: "#000", marginRight: 10 }}>
              {postData.writer ? postData.writer.substring(0, 1).toUpperCase() : null}
            </Avatar>
            <span>BY. {postData.writer}</span>
          </span>
          <span className="postDate">{moment(postData.wrDate).format("ll")}</span>
        </div>
      </div>
      <div className="postListBody">
        <CodeView markdown={postData.contents} type="post" />
      </div>
      {type !== "detail" ? (
        <div className="postListfooter">
          <Tags tagDatas={hashArry} styleClass="tagWrap" />
          <Likes like={postData.likes} love={postData.love} pno={postData.pno} nowUser={postData.nowUser} />
        </div>
      ) : null}
    </div>
  );
};

const Post: React.FC<Props> = ({ postDatas, type = null }) => {
  let postList = postDatas.map((postData: any, index: number) => {
    return (
      <Col xs={24} md={24} lg={24} xl={12} key={index}>
        <PostItem postData={postData} type={type} />
      </Col>
    );
  });

  return (
    <Row type="flex" justify="space-between" gutter={32} className={`postWrap ${type}`}>
      {postList}
    </Row>
  );
};

export default Post;
