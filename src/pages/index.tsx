import React, { Component, Fragment } from "react";
import axios from "axios";
import { KAKAO_API_KEY } from "../key/API_KEY";
import { withRouter } from "next/router";

// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import PostContainer from "../containers/post/PostContainer";
import { LoginModal } from "../components/common/Modal";

interface State {
  isOpen: boolean;
}

class Index extends Component<{}, State> {
  // static async getInitialProps(ctx) {
  //   console.log(ctx);
  //   return { ctx };
  // }
  state: State = {
    isOpen: false
  };

  componentDidMount() {
    window.Kakao.init(KAKAO_API_KEY);
    window.Kakao.Auth.createLoginButton({
      container: ".kakao-login-btn",
      success: authObj => {
        // console.log(JSON.stringify(authObj.access_token));
        axios
          .post("https://mad-server.herokuapp.com/kakaologin", {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            Authorization: `Bearer ${authObj.access_token}`
          })
          .then(res => {
            localStorage.setItem(
              "loginUser",
              res.data.response.properties.nickname
            );
            localStorage.setItem(
              "loginEmail",
              res.data.response.kakao_account.email
            );
            localStorage.setItem("loginId", res.data.response.id);
          })
          .catch(err => console.log(err));
      },
      fail: err => {
        console.log(err);
      }
    });
  }

  _onModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onLogOut = () => {
    window.Kakao.Auth.logout();
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("loginId");
  };

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <HeaderContainer
          type="common"
          onModal={this._onModal}
          onLogOut={this.onLogOut}
        />
        <PostContainer />
        <LoginModal isOpen={isOpen} onModal={this._onModal} />
      </Fragment>
    );
  }
}

export default Index;
