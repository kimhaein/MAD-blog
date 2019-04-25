import React, { Component } from "react";
import { AuthConsumer } from "../../contexts/authContext";
import Search from "../../components/common/Search";
import Post from "../../components/post";

interface State {
  imgUrl: string;
}

class PostContainer extends Component<{}, State> {
  state: State = {
    imgUrl: "bg01"
  };
  _onChange = () => {
    console.log("onChange");
  };

  render() {
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };
    return (
      <AuthConsumer>
        {({ state, actions }: any) => (
          <div className="contentsWrap postWrap" style={style}>
            <Search onChange={this._onChange} />
            <Post
              postDatas={state.postDatas}
              onRemove={actions.onRemove}
              onEdit={actions.onEdit}
            />
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default PostContainer;
