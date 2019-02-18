import React, { Component } from "react";
import { Consumer } from "../../Context";
import axios from "axios";
import DropDowns from "./dropDowns";
import Pagination from "./pagination";
import Result from "./result";
import Header from "./header";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      caretOne: "All",
      caretTwo: "Popularity",
      sortOne: "story",
      sortTwo: "search",
      currentPage: "0"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickName = this.handleClickName.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  async handleClickPage(dispatch, pageNumber) {
    const { keyword, sortOne, sortTwo } = this.state;
    if (this.state.caretOne === "All") {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${keyword}&page=${pageNumber}`
      );
      dispatch({ type: "SELECT_COMMENT", payload: false });
      dispatch({ type: "KEYWORD_CHANGE", payload: response.data.hits });
    } else {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/${sortTwo}?query=${keyword}&tags=${sortOne}&page=${pageNumber}`
      );
      if (sortOne === "comment") {
        dispatch({ type: "SELECT_COMMENT", payload: true });
      } else {
        dispatch({ type: "SELECT_COMMENT", payload: false });
      }
      dispatch({ type: "KEYWORD_CHANGE", payload: response.data.hits });
    }
  }

  handleClickName = nameValue => {
    if (
      nameValue === "All" ||
      nameValue === "Story" ||
      nameValue === "Comment"
    ) {
      this.setState({ caretOne: nameValue, sortOne: nameValue.toLowerCase() });
    } else if (nameValue === "Popularity") {
      this.setState({ caretTwo: nameValue, sortTwo: "search" });
    } else if (nameValue === "Date") {
      this.setState({ caretTwo: nameValue, sortTwo: "search_by_date" });
    }
  };

  async handleSubmit(dispatch, e) {
    e.preventDefault();
    const { keyword, sortOne, sortTwo } = this.state;
    if (this.state.caretOne === "All") {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${keyword}`
      );
      dispatch({ type: "SELECT_COMMENT", payload: false });
      dispatch({ type: "KEYWORD_CHANGE", payload: response.data.hits });
    } else {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/${sortTwo}?query=${keyword}&tags=${sortOne}`
      );
      if (sortOne === "comment") {
        dispatch({ type: "SELECT_COMMENT", payload: true });
      } else {
        dispatch({ type: "SELECT_COMMENT", payload: false });
      }
      dispatch({ type: "KEYWORD_CHANGE", payload: response.data.hits });
    }
  }

  render() {
    const { keyword } = this.state;

    return (
      <Consumer>
        {value => {
          const {
            dispatch,
            firstDropDowns,
            secondDropDowns,
            news,
            isComment
          } = value;
          return (
            <div>
              <Header
                submitClick={this.handleSubmit.bind(this, dispatch)}
                inputOnchange={this.handleInputChange}
                value={keyword}
              />

              <DropDowns
                firstDropDowns={firstDropDowns}
                secondDropDowns={secondDropDowns}
                passClickName={this.handleClickName}
                caretOne={this.state.caretOne}
                caretTwo={this.state.caretTwo}
              />
              <div>
                {!isComment
                  ? news.map(item =>
                      item.title != null &&
                      item.author != null &&
                      item.url !== "" ? (
                        <Result key={item.objectID} news={item} />
                      ) : null
                    )
                  : news.map(item =>
                      item.story_title != null ? (
                        <Result key={item.objectID} news={item} />
                      ) : null
                    )}
              </div>
              <div>
                <Pagination
                  onClickPage={this.handleClickPage.bind(this, dispatch)}
                />
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
