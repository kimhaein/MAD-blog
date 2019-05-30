import React, { Component } from "react";
import TagCloud from "react-tag-cloud";
import randomcolor from "randomcolor";
import "./hashList.css";

interface Props {
  trendDatas: object[];
  onSearch: () => void;
}
interface trendDatas {
  cnt: number;
  hashTag: string;
}

class HashList extends Component<Props, {}> {
  renderWords = () => {
    const { trendDatas, onSearch } = this.props;
    const result = trendDatas.map((v: trendDatas, i: number) => {
      const fontSize = v.cnt <= 1 ? 20 : v.cnt * 20;
      return (
        <div key={i} onClick={onSearch} style={{ fontSize }}>
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

export default HashList;
