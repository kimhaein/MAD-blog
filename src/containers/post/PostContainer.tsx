import React, { Component } from "react";
import Search from "../../components/common/Search";
import Post from "../../components/post";

interface Props {
  postDatas: Array<object>;
}

interface State {
  imgUrl: string;
}

class PostContainer extends Component<Props, State> {
  state: State = {
    imgUrl: "bg01"
  };

  _onChange = e => {
    // console.log(e);
  };

  render() {
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };
    const { postDatas } = this.props;
    return (
      <div className="contentsWrap postWrap" style={style}>
        <Search onChange={this._onChange} />
        <Post postDatas={postDatas} />
      </div>
    );
  }
}

export default PostContainer;
