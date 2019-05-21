import React, { Component } from "react";
import Trend from "../../components/trend";
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

  onClick = (hashTag: string) => {
    alert(hashTag + " Click");
  };

  render() {
    const { trendDatas } = this.state;
    return (
      <div className="contentsWrap trendWrap">
        <div className="app-outer">
          <div className="app-inner">
            <Trend trendDatas={trendDatas} onClick={this.onClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default TrendContainer;
