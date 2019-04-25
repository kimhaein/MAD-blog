import React, { Component, createContext } from "react";
import Router from "next/router";
import moment from "moment";
import axios from "axios";

const Context = createContext({}); // Context 를 만듭니다.
const { Provider, Consumer: WriteConsumer } = Context;

interface State {
  pno: string;
  isEdit: boolean;
  title: string;
  contents: string;
  hash: Array<string>;
}
interface Props {
  mode: string;
  pno: string;
}

class WriteProvider extends Component<Props, State> {
  state: State = {
    pno: "",
    isEdit: false,
    title: "",
    contents: "",
    hash: []
  };

  componentDidMount() {
    if (this.props.mode == "edit") {
      this.getPostData(this.props.pno);
      this.setState({
        pno: this.props.pno
      });
    }
  }

  actions = {
    setTitle: title => {
      this.setState({ title });
    },
    setContents: contents => {
      this.setState({ contents });
    },
    setHash: hash => {
      this.setState({ hash });
    },
    onSubmitPost: () => {
      if (this.state.title === "" || this.state.contents === "") {
        alert("title 혹은 contents를 작성해주세요");
        return false;
      }

      const hash = this.state.hash.join(",");

      //post 등록
      axios
        .post("https://mad-server.herokuapp.com/api/post", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          title: this.state.title,
          contents: this.state.contents,
          wrDate: moment().format("YYYY-MM-DD H:mm:ss"),
          writer: localStorage.getItem("loginId"),
          hash: hash
        })
        .then(res => {
          console.log("@onSubmitPost", res);
          Router.replace("/");
        });
    },
    onEdit: () => {
      console.log("@onEdit");
      axios
        .post("https://mad-server.herokuapp.com/api/post/edit", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          pno: this.state.pno,
          title: this.state.title,
          contents: this.state.contents,
          upDate: moment().format("YYYY-MM-DD H:mm:ss"),
          writer: localStorage.getItem("loginId")
        })
        .then(res => {
          console.log("@onEdit", res);
          Router.replace("/");
        });
    }
  };

  getPostData = pno => {
    console.log("@getPostData");
    axios
      .post("https://mad-server.herokuapp.com/api/post/contents", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        pno,
        userId: localStorage.getItem("loginId")
      })
      .then(res => {
        this.setState({
          isEdit: true,
          title: res.data.getContent[0].title,
          contents: res.data.getContent[0].contents
        });
      });
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

// 내보내줍니다.
export { WriteProvider, WriteConsumer };
