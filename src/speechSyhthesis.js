import React, { Component } from "react";

class TalkBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speaking: true
    };
  }
  //place functions here
  logger() {
    console.log("This");
  }

  render() {
    const voiceinator = document.querySelector(".voiceinator");
    //call functions with this. here
    this.logger();
    console.log(voiceinator);

    return (
      <div className="voiceinator">
        <h1>TalkBox</h1>

        <select name="voice" id="voices">
          <option value="">Select A Voice</option>
        </select>

        <label htmlFor="rate">Rate:</label>
        <input
          name="rate"
          type="range"
          min="0"
          max="3"
          defaultValue="1"
          step="0.1"
        />

        <label htmlFor="pitch">Pitch:</label>

        <input name="pitch" type="range" min="0" max="2" step="0.1" />
        <textarea name="text" defaultValue="Hello! I love JavaScript 👍" />
        <button id="stop">Stop!</button>
        <button id="speak">Speak</button>
      </div>
    );
  }
}

export default TalkBox;
