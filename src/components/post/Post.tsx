import { Col, Row, Avatar } from "antd";
import moment from "moment";

// components
import Tags from "../common/Tags";
import Likes from "../common/Likes";
import { Code } from "../common/CodeView/CodeView";

import "./post.css";

interface PostItem {
  postData: {
    title: string;
    writer: string;
    wrDate: string;
    upDate: string;
    contents: string;
    tag?: Array<string>;
    likes: number;
  };
}

const PostItem = ({ postData }: PostItem) => {
  return (
    <div className="postList">
      <div className="postListHeader">
        <p>{postData.title}</p>
        <div className="postInfo">
          <span>
            <Avatar style={{ backgroundColor: "#130", marginRight: 10 }}>
              {postData.writer.substring(1)}
            </Avatar>
            <span>BY. {postData.writer}</span>
          </span>
          <span className="postDate">
            {moment(postData.wrDate).format("MMM Do YY")}
          </span>
        </div>
      </div>
      <div className="postListBody">
        <Code markdown={postData.contents} type="post" />
      </div>
      <div className="postListfooter">
        {/* <Tags tagDatas={postData.tag} /> */}
        <Likes likeDatas={postData.likes} />
      </div>
    </div>
  );
};

const Post = ({}) => {
  let postDatas = [
    {
      title: "오늘의 코드 기록 01",
      writer: "김혜인",
      wrDate: "2019-01-03",
      upDate: "2019-01-03",
      contents:
        "Hseded\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\n\n  *[Francesco Agnoletto](https://twitter.com/fragno92)*",
      tag: [
        "프론트개발",
        "자바스크립트",
        "리액트",
        "프론트개발",
        "자바스크립트"
      ],
      likes: 30
    },
    {
      title: "오늘의 코드 기록 02",
      writer: "황윤지",
      wrDate: "2019-01-02",
      upDate: "2019-01-02",
      contents: "# DatePicker The DatePicker works",
      tag: ["백엔드개발", "자바스크립트", "노드"],
      likes: 30
    },
    {
      title: "오늘의 코드 기록 03",
      writer: "김철수",
      wrDate: "2019-01-01",
      upDate: "2019-01-01",
      contents:
        "> 안녕하세요 \n ```javascript \n const a = 1;\n console.log(a); // 1 \n```",
      tag: ["프론트개발", "자바스크립트", "리액트"],
      likes: 30
    }
  ];

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
