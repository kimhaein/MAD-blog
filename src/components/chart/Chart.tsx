import React, { Component } from "react";
import { Row, Col } from "antd";
import "./chart.css";

interface Props {}
interface State {}

class Chart extends Component<Props, State> {
  render() {
    return (
      <div className="gutter-example contentsWrap chartWrap">
        <h2>MAD TREND</h2>
        <div className="totalChart">
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
          </Row>
        </div>
        <div className="tagChart">
          <Row gutter={24}>
            <Col className="gutter-row" span={18}>
              <div className="gutter-box">
                <h3>해시차트</h3>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                <h3>인기 게시글</h3>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Chart;
