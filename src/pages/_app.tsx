import React, { Component } from "react";
import { Container } from "next/app";
// Container
import HeaderContainer from "../containers/common/HeaderContainer";
import FooterContainer from "../containers/common/FooterContainer";
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

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <HeaderContainer />
        <Component {...pageProps} />
        <FooterContainer />
      </Container>
    );
  }
}
