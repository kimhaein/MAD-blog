import { Col, Row, Avatar } from "antd";
import moment from "moment";

// components
// import Tags from "../common/Tags";
import Likes from "../common/Likes";
import { Code } from "../common/CodeView/CodeView";
import None from "../common/None";

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

const Post = ({ postDatas }) => {
  if (postDatas.length <= 0) {
    // api 서버 오류일 경우 dumy data
    postDatas = [
      {
        title: "마크다운을 배워보자!",
        writer: "김혜인",
        wrDate: "2019-01-03",
        upDate: "2019-01-03",
        contents:
          "# 가장 큰 제목 \n ## 그 다음 크기의 제목 \n ### 또 그 다음 크기의 제목 \n ###### 가장 작은 크기의 제목 ###### \n > 인용이다.\n>\n> 인용 안에서도 문단을 나눌 수 있다.\n>\n> ## 제목 등의 다른 문법도 사용 가능하다.\n>\n> > 인용 안의 인용도 된다.\n\n 이 문장에서 **여기부터 여기까지** 강조한다.\n 이 문장에서는 __여기만__ 강조한다.\n마크다운에 관한 자세한 내용은 [여기](http://daringfireball.net/projects/markdown/)를 참고하라.\n[여기](http://en.wikipedia.org/wiki/Markdown 'Wikipedia')에도 잘 정리가 되어 있다.\n 이미지 넣기 \n ![마크다운 로고](https://raw.github.com/dcurtis/markdown-mark/master/png/208x128.png)\n 때론 ``코드 내부에 ` 문자``를 사용하기도 한다.",
        tag: [
          "프론트개발",
          "자바스크립트",
          "리액트",
          "프론트개발",
          "자바스크립트"
        ],
        likes: 10
      },
      {
        title: "이것저것 요것저것",
        writer: "황윤지",
        wrDate: "2019-01-02",
        upDate: "2019-01-02",
        contents:
          "# 이런글 저런글 제목 \n  이것저것\n 요것저것 \n 열심히 공부해보자.\n 이러쿵 저러쿵",
        tag: ["백엔드개발", "자바스크립트", "노드"],
        likes: 24
      },
      {
        title: "post header 만들기",
        writer: "김철수",
        wrDate: "2019-01-01",
        upDate: "2019-01-01",
        contents:
          '# 작성자 정보 와 작성 시간 컴포넌트  \n```jsx\n<div className="postInfo">\n <span>\n  <Avatar style={{ backgroundColor: "#130", marginRight: 10 }}>\n   {postData.writer.substring(1)}\n  </Avatar>\n  <span>\n    BY. {postData.writer}\n  </span>\n </span>\n <span className="postDate">\n  {moment(postData.wrDate).format("MMM Do YY")}\n </span>\n</div>\n```',
        tag: ["프론트개발", "자바스크립트", "리액트"],
        likes: 9
      }
    ];
  }

  let postList = postDatas.map((postData, index) => {
    return (
      <Col xs={24} md={24} lg={24} xl={12} key={index}>
        <PostItem postData={postData} />
      </Col>
    );
  });

  return (
    <Row type="flex" justify="space-between" gutter={32} className="posthWrap">
      {postList.length > 0 ? postList : <None dataTitle="포스트" />}
    </Row>
  );
};

export default Post;
