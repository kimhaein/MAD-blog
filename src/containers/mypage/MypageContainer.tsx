import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";
import { Tabs, Avatar } from "antd";
import moment from "moment";
import { Tab } from "../../components/common/Tab";
import { PostModal } from "../../components/common/Modal";

interface Props {
  isLogin: boolean;
  userId: string;
  onLoading(state: boolean): void;
}

interface State {
  userId: string;
  activeKey: string;
  userInfo: {
    thumbnail_image: string;
    nickname: string;
    update_day: string;
  };
  myPageContentList: object[];
  isOpen: boolean;
  postDatas: object[];
}

class MypageContainer extends Component<Props, State> {
  state: State = {
    userId: "",
    activeKey: "1",
    userInfo: {
      thumbnail_image: "",
      nickname: "",
      update_day: ""
    },
    myPageContentList: [],
    isOpen: false,
    postDatas: []
  };

  componentWillReceiveProps(nextProps: Props) {
    const { isLogin, userId } = nextProps;
    if (this.props.isLogin !== nextProps.isLogin) {
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
        this.props.onLoading(false);
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
        this.props.onLoading(false);
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

  tabHandleChange = (activeKey: string) => {
    // case 문으로 activeKey가 어떤 것이느냐에 따라서 api 콜
    // console.log("tab", activeKey);
    this.props.onLoading(true);
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

  // 모달 이벤트
  openModal = async (pno?: number, userId?: number) => {
    await this.setState({
      isOpen: !this.state.isOpen
    });
    if (!this.state.isOpen || !pno) return false;
    const postDatas = await this.callPostDetailApi(pno, userId);
    this.setState({
      postDatas
    });
  };

  //글 상세 정보 불러오기
  callPostDetailApi = (pno: number, userId?: number) => {
    this.props.onLoading(true);
    return axios
      .post("https://mad-server.herokuapp.com/api/post/contents", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        pno,
        userId
      })
      .then(({ data }) => {
        this.props.onLoading(false);
        return data.getContent;
      })
      .catch(err => console.log(err));
  };

  render() {
    const { postDatas, isOpen, userInfo, activeKey, myPageContentList } = this.state;

    return (
      <div className="contentsWrap postWrap myPage">
        <div className="mypage_wrap">
          <div className="mypage_content">
            <div className="mypage_content_header">
              <div className="mypage_profile">
                <Avatar src={userInfo.thumbnail_image} size={88} style={{ backgroundColor: "#000" }} />
              </div>
              <div className="mypage_title">
                <h1>{userInfo.nickname}님의 마이페이지</h1>
                <div className="user_status">
                  <span>
                    최근 방문일&nbsp;&nbsp;|&nbsp;&nbsp;
                    {moment(userInfo.update_day).format("YYYY년 M월 DD일 (H시 MM분)")}
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
                <Tabs type="card" onChange={this.tabHandleChange} activeKey={activeKey}>
                  <Tab tab={"내가 쓴 글"} key={"1"} openModal={this.openModal} dataSource={myPageContentList} />
                  <Tab tab={"내가 좋아한 글"} key={"2"} openModal={this.openModal} dataSource={myPageContentList} />
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <PostModal title="글 상세 보기" postDatas={postDatas} openModal={this.openModal} isOpen={isOpen} />
      </div>
    );
  }
}

export default MypageContainer;
