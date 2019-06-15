import React, { PureComponent, Fragment } from "react";
import Router from "next/router";
import { WriteProvider, WriteConsumer } from "../contexts/writeContext";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteConatiner from "../containers/write/WriteConatiner";
import LoadingBar from "../components/common/LoadingBar";

interface Props {
  mode: string;
  pno: number;
}
interface State {
  loading: boolean;
}
class Write extends PureComponent<Props, {}> {
  static async getInitialProps({ query }: any) {
    return { mode: query.mode, pno: query.pno };
  }
  state: State = {
    loading: false
  };

  componentDidMount() {
    // 로그인 없이 접근시 메인 화면으로 이동
    if (!localStorage.getItem("loginId")) {
      alert("해당페이지의 권한이 없습니다");
      Router.replace("/");
      return false;
    }
  }
  setLoading = () => {
    this.setState({ loading: !this.state.loading });
  };
  render() {
    const { mode, pno } = this.props;
    return (
      <WriteProvider mode={mode} pno={pno} setLoading={this.setLoading}>
        <WriteConsumer>
          {({ state, actions }: any) => (
            <Fragment>
              {state.isLoading ? <LoadingBar /> : null}
              <HeaderContainer state={state} actions={actions} />
              <WriteConatiner state={state} actions={actions} />
            </Fragment>
          )}
        </WriteConsumer>
      </WriteProvider>
    );
  }
}

export default Write;
