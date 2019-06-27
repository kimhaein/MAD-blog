import React, { PureComponent, Fragment } from "react";
import { MainHeader, PostHeader } from "../../components/common/Header";
import Menu from "../../components/common/Menu";
import { isMobile } from "react-device-detect";

interface Props {
  type?: string;
  state: {
    isLogin: boolean;
    isMenu: boolean;
    userName: string;
    userImg: string;
    title: string;
    isEdit: Boolean;
  };
  actions: {
    onLogOut(): void;
    onModal(): void;
    onMenu(): void;
    setTitle(): void;
    onEdit(): void;
    onSubmitPost(): void;
  };
}
interface State {
  isMobile: boolean;
}
class HeaderContainer extends PureComponent<Props, State> {
  state: State = {
    isMobile: isMobile
  };
  render() {
    const { type, state, actions } = this.props;
    return type === "common" ? (
      <Fragment>
        <MainHeader
          isLogin={state.isLogin}
          isMobile={this.state.isMobile}
          onMenu={actions.onMenu}
          onLogOut={actions.onLogOut}
          onModal={actions.onModal}
        />
        <Menu isLogin={state.isLogin} isMenu={state.isMenu} userName={state.userName} userImg={state.userImg} onMenu={actions.onMenu} />
      </Fragment>
    ) : (
      <PostHeader title={state.title} isEdit={state.isEdit} setTitle={actions.setTitle} onEdit={actions.onEdit} onSubmitPost={actions.onSubmitPost} />
    );
  }
}

export default HeaderContainer;
