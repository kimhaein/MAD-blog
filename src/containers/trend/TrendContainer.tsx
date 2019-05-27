import React, { Component, Fragment } from "react";
import Trend from "../../components/trend";
import axios from "axios";
import { Row, Col, List, Avatar } from "antd";
import { Z_BLOCK } from "zlib";
import { relative } from "path";
import Index from "pages";
interface State {
  trendDatas: object[];
  hotPostDatas: object[];
}
class TrendContainer extends Component<{}, State> {
  state: State = {
    trendDatas: [],
    hotPostDatas: [
      {
        pno: 1,
        title: "Ant Design Title 1",
        likeCnt: 56,
        description: "작성자"
      },
      {
        pno: 2,
        title: "Ant Design Title 2",
        likeCnt: 18,
        description: "작성자"
      },
      {
        pno: 3,
        title: "Ant Design Title 3",
        likeCnt: 18,
        description: "작성자"
      },
      {
        pno: 4,
        title: "Ant Design Title 4",
        likeCnt: 17,
        description: "작성자"
      },
      {
        pno: 5,
        title: "Ant Design Title 5",
        likeCnt: 6,
        description: "작성자"
      },
      {
        pno: 6,
        title: "Ant Design Title 6",
        likeCnt: 6,
        description: "작성자"
      },
      {
        pno: 7,
        title: "Ant Design Title 7",
        likeCnt: 5,
        description: "작성자"
      },
      {
        pno: 8,
        title: "Ant Design Title 8",
        likeCnt: 3,
        description: "작성자"
      },
      {
        pno: 9,
        title: "Ant Design Title 9",
        likeCnt: 3,
        description: "작성자"
      },
      {
        pno: 10,
        title: "Ant Design Title 10",
        likeCnt: 1,
        description: "작성자"
      }
    ]
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
    const style = { backgroundImage: `url(/static/images/bg06.jpg)` };

    return (
      <div className="contentsWrap trendWrap" style={{ background: "#424242" }}>
        <div className="trendBox">
          <Row gutter={24}>
            <Col span={16}>
              <h2>Hash Chart</h2>
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
                      style={{
                        position: "relative"
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.description}
                      />
                      <div>{item.likeCnt}</div>
                      <span
                        style={{
                          position: "absolute",
                          display: "block",
                          background: "#fff",
                          width: `${item.likeCnt}%`,
                          height: "100%",
                          color: "#fff",
                          ZIndex: -1
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
