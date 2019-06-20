import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";
import { Tabs } from "antd";
import { Tab } from "../../components/common/Tab";
import "./mypage.css";
import { PostModal } from "../../components/common/PostModal";
import { PostConsumer } from "../../contexts/postContext";
import moment from "moment";

interface Props {
  isLogin: boolean;
  userId: string;
}
interface State {
  userId: string;
  activeKey: string;
  userInfo: object[];
  myPageContentList: object[];
  isOpen: boolean;
  postDatas: object[];
}

class MypageContainer extends Component<Props, State> {
  state: State = {
    userId: "",
    activeKey: "1",
    userInfo: [],
    myPageContentList: [],
    isOpen: false,
    postDatas: []
  };

  componentWillReceiveProps(nextProps: Props) {
    const { isLogin, userId } = nextProps;
    if (!isLogin) {
      alert("해당페이지의 권한이 없습니다");
      Router.replace("/");
      return false;
    }
    this.setState({ userId }, () => {
      this.callUserDataApi();
      this.callUserPostList();
    });
  }

  componentWillMount() {
    console.log(1);
  }

  // 작성한 글
  callUserPostList = () => {
    axios
      .post("https://mad-server.herokuapp.com/api/user-writed", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        userId: this.state.userId
      })
      .then(({ data }) => {
        this.setState({
          myPageContentList: data.writedList
        });
      })
      .catch(err => console.log("userPostList", err));
  };

  callUserPostLike = () => {
    axios
      .post("https://mad-server.herokuapp.com/api/user-like", {
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        userId: this.state.userId
      })
      .then(({ data }) => {
        this.setState({
          myPageContentList: data.likeList
        });
      })
      .catch(err => console.log("userPostLike", err));
  };
  // 유저 정보
  callUserDataApi = () => {
    return axios
      .post("https://mad-server.herokuapp.com/api/user", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        userId: this.state.userId
      })
      .then(({ data }) => {
        this.setState({
          userInfo: data.userInfo[0]
        });
      })
      .catch(err => console.log(err));
  };

  //글 상세 정보 불러오기
  callPostDetailApi = pno => {
    axios
      .post("https://mad-server.herokuapp.com/api/post/contents", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        pno,
        userId: this.state.userId
      })
      .then(({ data }) => {
        console.log();
        // this.setState({
        //   postDatas: data
        // });
      })
      .catch(err => console.log(err));
  };

  tabHandleChange = activeKey => {
    // case 문으로 activeKey가 어떤 것이느냐에 따라서 api 콜
    // console.log("tab", activeKey);
    switch (activeKey) {
      case "1":
        this.callUserPostList();
        break;

      case "2":
        this.callUserPostLike();
        break;
    }
    this.setState({
      activeKey
    });
  };

  getPnoFromChild = pno => {
    console.log(pno, "CLICKED!!");
    let findValue = this.callPostDetailApi(pno);
  };

  closeTheModalByBtn = fromChild => {
    console.log("lets close", fromChild);
    this.setState({
      modalIsOpen: fromChild
    });
  };

  // 모달 이벤트
  openModal = async (pno?: number, userId?: string) => {
    await this.setState({
      isOpen: !this.state.isOpen
    });
    if (!this.state.isOpen) return false;
    const postDatas = await this.callPostDetailApi(pno, userId);
    // this.setState({
    //   postDatas: postDatas.getContent
    // });
  };

  render() {
    const {
      postDatas,
      isOpen,
      userInfo,
      activeKey,
      myPageContentList
    } = this.state;
    console.log(myPageContentList);

    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };
    return (
      <div className="contentsWrap postWrap myPage" style={style}>
        <div className="mypage_wrap">
          <div className="mypage_content">
            <div className="mypage_content_header">
              <div className="mypage_profile">
                <img src={userInfo.thumbnail_image} alt="유저 프로필" />
              </div>
              <div className="mypage_title">
                <h1>{userInfo.nickname}님의 마이페이지</h1>
                <div className="user_status">
                  <span>
                    최근 방문일&nbsp;&nbsp;|&nbsp;&nbsp;
                    {moment(userInfo.update_day).format(
                      "YYYY년 M월 DD일 (H시 MM분)"
                    )}
                  </span>
                </div>
                <div className="user_status">
                  <span>
                    작성된 글 <strong>{myPageContentList.length}</strong>개
                  </span>
                </div>
              </div>
            </div>
            <div className="mypage_content_body">
              <div className="card-container">
                <Tabs
                  type="card"
                  onChange={this.tabHandleChange}
                  activeKey={activeKey}
                >
                  {/* my_prop =>  tab 내부 컨텐츠*/}
                  <Tab
                    tab={"내가 쓴 글"}
                    key={"1"}
                    my_prop={this.getPnoFromChild}
                    userFavoriteList={myPageContentList}
                  />
                  <Tab
                    tab={"내가 좋아한 글"}
                    key={"2"}
                    my_prop={this.getPnoFromChild}
                    userFavoriteList={myPageContentList}
                  />
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        {/* <PostModal
          title="LIKE TOP 10 상세"
          postDatas={postDatas}
          openModal={this.openModal}
          isOpen={isOpen}
        /> */}
      </div>
    );
  }
}

export default MypageContainer;
