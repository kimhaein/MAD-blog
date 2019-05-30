import React, { Component, Fragment } from "react";

import { AuthProvider } from "../contexts/authContext";
import { MypageProvider } from "../contexts/mypageContext";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import MypageContainer from "../containers/mypage/MypageContainer";
import { LoginModal } from "../components/common/Modal";
import LoadingBar from "../components/common/LoadingBar";

interface State {
  postDatas: Array<object>;
  loading: boolean;
}

class mypage extends Component<{}, State> {
  state: State = {
    postDatas: [],
    loading: false
  };

  setPostDatas = postDatas => {
    this.setState({ postDatas });
  };

  setLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { loading, postDatas } = this.state;
    return (
      <Fragment>
        <AuthProvider
          setPostDatas={this.setPostDatas}
          setLoading={this.setLoading}
        >
          {loading ? <LoadingBar /> : null}
          <HeaderContainer type="common" />
          <LoginModal />
          <MypageProvider postDatas={postDatas} setLoading={this.setLoading}>
            <MypageContainer />
          </MypageProvider>
        </AuthProvider>
      </Fragment>
    );
  }
}

export default mypage;
