import React, { Component } from "react";
import moment from "moment";
import { List, Avatar } from "antd";
import "./hotPost.css";

interface Props {
  dataSource: object[];
  onSearch: (hashTag: string) => void;
}

class HotPost extends Component<Props, {}> {
  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.dataSource}
        renderItem={item => (
          <List.Item
            className="listWrap"
            onClick={() => {
              this.props.onSearch(item.title);
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.thumbnail_image} />}
              title={item.title}
              description={`${item.nickname} (${moment(item.wrDate).format(
                "YYYY-MM-DD"
              )})`}
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
    );
  }
}

export default HotPost;
