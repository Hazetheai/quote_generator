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
      name: "Ron Swanson",
      timeTrav: []
    };
  }

  // newQuote(url) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       url.toString().match(/swanson/i)
  //         ? this.setState({
  //             quote: data,
  //             name: "Ron Swanson"
  //           })
  //         : url.toString().match(/chucknorris/i)
  //         ? this.setState({
  //             quote: data.value,
  //             name: "Chuck Norris"
  //           })
  //         : this.setState({
  //             quote: data.quote,
  //             name: "Kanye"
  //           });
  //     });
  // }

  //Outputs the quote to the DOM
  echoData(url, data) {
    url.toString().match(/swanson/i)
      ? this.setState({
          quote: data[0],
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
  }
  //GETs new quote json, places the url + data in the timeTrav state and calls echoData
  newQuote(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          timeTrav: this.state.timeTrav.concat([{ url: url, data: data }])
        });
        this.echoData(url, data);
      });
  }

  // calls newQuote with different url, depending on current url
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

  //Calls echoData with second last quote url + data in the array
  prevQuote() {
    let i = 2;
    if (this.state.timeTrav.length > 1) {
      this.echoData(
        this.state.timeTrav[this.state.timeTrav.length - i].url,
        this.state.timeTrav[this.state.timeTrav.length - i].data
      );
      this.setState(prevState => {
        return {
          timeTrav: prevState.timeTrav.slice(0, prevState.timeTrav.length - 1)
        };
      });
    }
  }

  //if quote is the last in the array --> i === 2
  // if quote is not last --> i =

  render() {
    // Need to find a way to move backwards from current quote
    //And Jump to final quote and move backwards from there too
    const { name, quote } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="author">{this.state.name} says:</div>
          <Quotebox quote={this.state.quote} />
          <SubmitButton parentMethod={() => this.newQuote(this.state.url)} />
          <TweetButton author={name} quote={quote} />
        </header>
        <NewAuthor
          parentMethod={() => this.newAuthor()}
          name={this.state.name}
        />
        {/* <SpeakCheck />*/}
        <Ron
          identity={this.state.name}
          parentMethod={() =>
            this.newQuote("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
          }
        />
        <Chuck
          identity={this.state.name}
          parentMethod={() =>
            this.newQuote("https://api.chucknorris.io/jokes/random")
          }
        />
        <Kanye
          identity={this.state.name}
          parentMethod={() =>
            this.newQuote(
              "https://cors-anywhere.herokuapp.com/https://api.kanye.rest"
            )
          }
        />
        <PrevQuote parentMethod={() => this.prevQuote()} />
      </div>
    );
  }
}

//Component displays quote

function Quotebox({ quote }) {
  return <div className="quoteBox">"{quote}"</div>;
}

//button to display previous quote

class PrevQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "none"
    };
  }

  click = () => {
    this.props.parentMethod();
  };

  render() {
    return (
      <button className="talkBtn btn" onClick={this.click}>
        Previous Quote
      </button>
    );
  }
}

class TweetButton extends Component {
  render() {
    return (
      <a
        href={`https://twitter.com/intent/tweet?text= ${this.props.quote} - ${
          this.props.author
        }`}
        id="tweet-quote"
        rel="noopener noreferrer"
        target="_blank"
        title="Post this quote on twitter!"
      >
        <button className="tweetBtn btn tweetBlue">
          <span>
            <i className="fab fa-twitter" />
          </span>
        </button>
      </a>
    );
  }
}

//checkbox can activate Speaker component

// function SpeakCheck() {
//   return (
//     <div>
//       <h3>Talk to me, Ron</h3>
//       <div className="checkboxThree">
//         <input type="checkbox" value="1" id="checkboxThreeInput" name="" />
//         <label htmlFor="checkboxThreeInput" />
//       </div>
//     </div>
//   );
// }

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
    // this.props.changeQuote();
  };

  render() {
    return (
      <div>
        {/* Need to add function to remove second name */}
        <h3>You're boring me {this.props.name.slice(0, 5)}</h3> {}
        <button className="newAuthor btn" onClick={this.click}>
          New Author
        </button>
      </div>
    );
  }
}

class Ron extends Component {
  click = () => {
    this.props.parentMethod();
  };
  render() {
    return this.props.identity.toString().match(/swanson/i) ? null : (
      <button className="btn" onClick={this.click}>
        Ron Swanson
      </button>
    );
  }
}

class Chuck extends Component {
  click = () => {
    this.props.parentMethod();
  };
  render() {
    return this.props.identity.toString().match(/chuck/i) ? null : (
      <button className="btn" onClick={this.click}>
        Chuck Norris
      </button>
    );
  }
}

class Kanye extends Component {
  click = () => {
    this.props.parentMethod();
  };
  render() {
    return this.props.identity.toString().match(/kanye/i) ? null : (
      <button className="btn" onClick={this.click}>
        Kanye West
      </button>
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
      <button className="submitBtn btn" onClick={this.click}>
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
