import React, { Component } from "react";
// import TalkBox from "./speechSynthesis";
import "./App.css";
// import "./speechSynthesis.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      url: "https://ron-swanson-quotes.herokuapp.com/v2/quotes",
      name: "Ron Swanson"
    };
  }

  newQuote(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        url.toString().match(/swanson/i)
          ? this.setState({
              quote: data,
              name: "Ron Swanson"
            })
          : url.toString().match(/chucknorris/i)
          ? this.setState({
              quote: data.value,
              name: "Chuck Norris"
            })
          : this.setState({
              quote: data.quote,
              name: "Kanye"
            });
      });
  }

  newAuthor() {
    this.state.url.toString().match(/kanye/i)
      ? this.setState(
          {
            url: "https://api.chucknorris.io/jokes/random"
          },
          () => {
            this.newQuote(this.state.url);
          }
        )
      : this.state.url.toString().match(/chucknorris/i)
      ? this.setState(
          {
            url: "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
          },
          () => {
            this.newQuote(this.state.url);
          }
        )
      : this.state.url.toString().match(/swanson/i)
      ? this.setState(
          {
            url: "https://cors-anywhere.herokuapp.com/https://api.kanye.rest"
          },
          () => {
            this.newQuote(this.state.url);
          }
        )
      : this.setState(
          {
            url: "https://cors-anywhere.herokuapp.com/https://api.kanye.rest"
          },
          () => {
            this.newQuote(this.state.url);
          }
        );
  }

  componentDidMount() {
    this.newQuote(this.state.url);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="author">{this.state.name} says:</div>
          <Quotebox quote={this.state.quote} />
          <SubmitButton parentMethod={() => this.newQuote(this.state.url)} />
        </header>
        <NewAuthor
          parentMethod={() => this.newAuthor()}
          name={this.state.name}
        />
        {/* <SpeakCheck />
        <SayQuote /> */}
      </div>
    );
  }
}

//Component displays quote

function Quotebox({ quote }) {
  return <div className="quoteBox">"{quote}"</div>;
}

//button to say quote

function SayQuote() {
  return <button className="talkBtn">Say Again</button>;
}

//checkbox can activate Speaker component

function SpeakCheck() {
  return (
    <div>
      <h3>Talk to me, Ron</h3>
      <div className="checkboxThree">
        <input type="checkbox" value="1" id="checkboxThreeInput" name="" />
        <label htmlFor="checkboxThreeInput" />
      </div>
    </div>
  );
}

//Gets a new Author
class NewAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Ron"
    };
  }

  click = () => {
    this.props.parentMethod();
    this.props.changeQuote();
  };

  render() {
    return (
      <div>
        {/* Need to add function to remove second name */}
        <h3>You're boring me {this.props.name.slice(0, 5)}</h3> {}
        <button className="newAuthor" onClick={this.click}>
          New Author
        </button>
      </div>
    );
  }
}

//Gets new quote
class SubmitButton extends Component {
  click = () => {
    this.props.parentMethod();
  };

  render() {
    return (
      <button className="submitButton" onClick={this.click}>
        New Quote, my good man.
      </button>
    );
  }
}

//Says current quote

// class TalkBox extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       speaking: false
//     };
//   }

//   //Import speaker function here
//   //Pass in text content from quotebox

//   render() {
//     return <div className="talkBox" />;
//   }
// }

export default App;
