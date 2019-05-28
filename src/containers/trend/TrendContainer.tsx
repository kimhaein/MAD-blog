import React, { PureComponent } from "react";
import Trend from "../../components/trend";
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

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 10000);
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
                <Trend trendDatas={trendDatas} onClick={this.onClick} />
              </div>
            </Col>
            <Col span={8}>
              <h2>TOP 10 POST</h2>
              <div className="box hotPostBox">
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.hotPostDatas}
                  renderItem={item => (
                    <List.Item
                      className="listWrap"
                      onClick={() => {
                        alert(item.title);
                      }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.thumbnail_image} />}
                        title={item.title}
                        description={`${item.nickname} (${moment(
                          item.wrDate
                        ).format("YYYY-MM-DD")})`}
                      />
                      <span>{item.likeCnt}</span>
                      <span
                        className="hotChart"
                        style={{
                          width: `${item.likeCnt}%`
                        }}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TrendContainer;
