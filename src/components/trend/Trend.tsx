import React, { Component } from "react";
import TagCloud from "react-tag-cloud";
import randomcolor from "randomcolor";
import "./trend.css";

interface Props {
  trendDatas: object[];
  onClick: (hashTag: string) => void;
}
interface trendDatas {
  cnt: number;
  hashTag: string;
}

class Trend extends Component<Props, {}> {
  renderWords = () => {
    const { trendDatas, onClick } = this.props;
    const result = trendDatas.map((v: trendDatas, i: number) => {
      const fontSize = v.cnt <= 1 ? 20 : v.cnt * 20;
      return (
        <div key={i} onClick={() => onClick(v.hashTag)} style={{ fontSize }}>
          {v.hashTag}
        </div>
      );
    });
    return result;
  };

  render() {
    return (
      <TagCloud
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontStyle: "italic",
          padding: 10,
          height: "calc(100% - 40px)",
          color: () => randomcolor({ luminosity: "light", hue: "blue" })
        }}
      >
        {this.renderWords()}
      </TagCloud>
    );
  }
}

export default Trend;
