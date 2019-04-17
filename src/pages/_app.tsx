import React, { Component } from "react";
import { Container } from "next/app";
import axios from "axios";
import { KAKAO_API_KEY } from "../key/API_KEY";
// css
import "antd/dist/antd.css";
import "../static/style/common.css";

interface Props {
  Component: any;
  pageProps: any;
}

export default class MyApp extends Component<Props> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    window.Kakao.init(KAKAO_API_KEY);
    window.Kakao.Auth.createLoginButton({
      container: ".kakao-login-btn",
      success: function(authObj) {
        // console.log(JSON.stringify(authObj.access_token));
        axios
          .post("https://mad-server.herokuapp.com/kakaologin", {
            headers: { "Content-type": "application/x-www-form-urlencoded" },
            access_token: authObj.access_token
          })
          .then(function(response) {
            console.log(11, response);
          });
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
