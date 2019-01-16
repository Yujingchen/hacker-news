import React, { Component } from "react";
const Context = React.createContext();

// const Recuder = {state,action} => {
//   switch(action.type){

//     case "Search":
//     return {

//       ...state,
//       show: "1"

//   }
// }

// }

export class Provider extends Component {
  state = {
    news: [],
    id: [1, 2, 3, 4, 5, 6, 7],
    show: ""
  };

  componentDidMount() {
    const { id } = this.state;
    console.log(id);
    id.map(eachId => {
      fetch(`http://hn.algolia.com/api/v1/items/${eachId}`)
        .then(response => response.json())
        .then(response => {
          this.setState({
            news: response
          });
          console.log(this.state);
        });
    });
  }

  //     contacts: [],
  //     dispatch: action => {

  //     }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
