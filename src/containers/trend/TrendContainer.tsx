import React, { Component } from "react";
import axios from "axios";
import TagCloud from "react-tag-cloud";
import randomcolor from "randomcolor";

interface State {
  trendDatas: object[];
}
class TrendContainer extends Component<{}, State> {
  state: State = {
    trendDatas: []
  };

  componentWillMount() {
    this.renderTag();
  }

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 10000);
  }

  renderTag = async () => {
    const trendDatas = await this.callTrendDatasApi();
    if (!trendDatas) return false;
    this.setState({
      trendDatas: trendDatas.chartHash
    });
  };

  callTrendDatasApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/chart-hash", {
        headers: { "Content-type": "application/x-www-form-urlencoded" }
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => console.log(err));
  };

  click = hashTag => {
    alert(hashTag + " Click");
  };

  renderWords = () => {
    const { trendDatas } = this.state;
    const result = trendDatas.map((v: object, i) => {
      const fontSize = v.cnt <= 1 ? 20 : v.cnt * 20;
      return (
        <div
          key={i}
          onClick={() => this.click(v.hashTag)}
          style={{
            fontSize
          }}
        >
          {v.hashTag}
        </div>
      );
    });

    return (
      <TagCloud
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontStyle: "italic",
          padding: 10,
          width: "100%",
          height: "100%",
          color: () => randomcolor({ hue: "blue" })
        }}
      >
        {result}
      </TagCloud>
    );
  };

  render() {
    return (
      <div className="contentsWrap trendWrap">
        <div className="app-outer">
          <div className="app-inner">{this.renderWords()}</div>
        </div>
      </div>
    );
  }
}

export default TrendContainer;
