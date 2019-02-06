import React, { Component } from "react";
import "../../App.css";
import DropDown from "./DropDown";
import Search from "./Search";
import { Consumer } from "./../../Context";

class SearchTypeThree extends Component {
  render() {
    const spanStyle = {
      margin: "0 3px 0 10px",
      fontSize: "12px",
      lineHeight: "27px",
      textAlign: "right"
    };
    return (
      <Consumer>
        {value => {
          const { news, firstDropDowns, secondDropDowns } = value;
          return (
            <div className="container">
              <Search tag="&tags=comment" searchMode="search" />
              <div className="input-group">
                <span className="input-group-prepend" style={spanStyle}>
                  Search
                </span>
                <DropDown myDropDowns={firstDropDowns} caret="Comment" />
                <span style={spanStyle}> by</span>
                <DropDown myDropDowns={secondDropDowns} caret="Popularity" />
              </div>
              <div>
                {news.map(item => (
                  <div>{item.comment_text}</div>
                ))}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SearchTypeThree;
