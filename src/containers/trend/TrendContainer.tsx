import React, { PureComponent } from "react";
import { PostConsumer } from "../../contexts/postContext";
import HashList from "../../components/HashList";
import HotPost from "../../components/HotPost";
import Post from "../../components/Post";
import axios from "axios";
import moment from "moment";
import { Row, Col, List, Avatar } from "antd";
interface State {
  trendDatas: object[];
  hotPostDatas: object[];
}
class TrendContainer extends PureComponent<{}, State> {
  state: State = {
    trendDatas: [],
    hotPostDatas: []
  };

  componentWillMount() {
    this.setDatas();
  }

  setDatas = async () => {
    const trendDatas = await this.callTrendDatasApi();
    const hotPostDatas = await this.callHotPostDatasApi();
    if (!trendDatas || !hotPostDatas) return false;
    this.setState({
      trendDatas: trendDatas.chartHash,
      hotPostDatas: hotPostDatas.chartLike
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

  callHotPostDatasApi = () => {
    return axios
      .get("https://mad-server.herokuapp.com/api/chart-like", {
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
      <div className="contentsWrap trendWrap" style={{ background: "#424242" }}>
        <div className="trendBox">
          <Row gutter={24}>
            <Col span={16}>
              <h2>HASH CLOUD</h2>
              <div className="box hashBox">
                <PostConsumer>
                  {({ actions }: any) => (
                    <HashList
                      trendDatas={trendDatas}
                      onSearch={actions.onSearch}
                    />
                  )}
                </PostConsumer>
              </div>
            </Col>
            <Col span={8}>
              <h2>TOP 10 POST</h2>
              <div className="box hotPostBox">
                <HotPost
                  dataSource={this.state.hotPostDatas}
                  onClick={this.onClick}
                />
              </div>
            </Col>
          </Row>
        </div>
        <PostConsumer>
          {({ state }: any) => <Post postDatas={state.postDatas} />}
        </PostConsumer>
      </div>
    );
  }
}

export default TrendContainer;
