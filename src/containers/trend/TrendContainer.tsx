import React, { Component } from "react";
import Trend from "../../components/trend";
import axios from "axios";
import { Row, Col } from "antd";
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
      <div className="ontentsWrap trendWrap">
        <h2>MAD TREND</h2>
        <div className="totalChart">
          <Row gutter={24}>
            <Col span={6}>
              <div className="trendBox">col-6</div>
            </Col>
            <Col span={6}>
              <div className="trendBox">col-6</div>
            </Col>
            <Col span={6}>
              <div className="trendBox">col-6</div>
            </Col>
            <Col span={6}>
              <div className="trendBox">col-6</div>
            </Col>
          </Row>
        </div>
        <div className="tagChart">
          <Row gutter={24}>
            <Col span={18}>
              <div className="trendBox">
                <h3>Hash Chart</h3>
                <Trend trendDatas={trendDatas} onClick={this.onClick} />
              </div>
            </Col>
            <Col span={6}>
              <div className="trendBox">
                <h3>인기 게시글</h3>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TrendContainer;
