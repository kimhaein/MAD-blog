import React, { Component } from "react";
import TagCloud from "react-tag-cloud";
import randomcolor from "randomcolor";
import Router from "next/router";
import "./hashList.css";

interface Props {
  trendDatas: object[];
}

class HashList extends Component<Props> {
  renderWords = () => {
    const { trendDatas } = this.props;
    const result = trendDatas.map((v, i) => {
      const { cnt, hashTag }: any = v;
      const fontSize = cnt <= 1 ? 20 : cnt * 20;
      return (
        <div
          key={i}
          onClick={() => {
            Router.push(`/?keyword=${hashTag}`);
          }}
          style={{ fontSize }}
        >
          {hashTag}
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
