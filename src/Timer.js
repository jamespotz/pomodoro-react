/* jshint esversion: 6 */
import React, { Component } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faSync } from "@fortawesome/free-solid-svg-icons";
import { resolve } from "url";

const DEFAULT_MINUTES = 25;
const DEFAULT_SECONDS = 0;
const messages = {
  initial: "Let the countdown begin!!",
  stop: "Never quit, keep going!! 👊🏼👊🏼👊🏼",
  start: "Greatness is within sight!! 🏅🏅🏅"
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: DEFAULT_MINUTES,
      seconds: DEFAULT_SECONDS,
      ticker: null,
      started: false,
      text: messages.initial,
      short_break: { minutes: 5, seconds: 0 },
      long_break: { minutes: 15, seconds: 0 },
      counter: 0,
      completed: 0
    };
  }

  componentDidMount() {
    if ("Notification" in window) {
      var permission = Notification.permission;

      if (permission === "denied" || permission === "granted") {
        return;
      }

      Notification.requestPermission();
    }
  }

  addPadding(num) {
    return num < 10 ? `0${num}` : num;
  }

  timer() {
    const self = this;
    this.setState({ started: true, counter: this.state.counter + 1 });
    return new Promise((resolve, reject) => {
      self.setState({
        ticker: setInterval(function() {
          let { minutes, seconds } = self.state;
          if (self.state.minutes === 0 && self.state.seconds === 0) {
            resolve(true);
            return;
          }

          if (self.state.seconds === 0) {
            self.setState({ minutes: minutes - 1, seconds: 59 });
          } else {
            self.setState({ seconds: seconds - 1 });
          }
        }, 1000)
      });
    });
  }

  startTimer() {
    if (this.state.started) return;
    const self = this;
    this.setState({ text: messages.start });
    this.timer().then(result => {
      if (!result) return;
      clearInterval(self.state.ticker);
      new Notification("Break time!!! 🎉🎉🎉");
      self.setState({
        text: "Great, Start a new one 🎉🎉🎉",
        started: false,
        ticker: null,
        completed: self.state.counter
      });
      self.startBreak();
    });
  }

  startBreak() {
    if (this.state.started) return;
    const { counter, short_break, long_break } = this.state;
    let { minutes, seconds } = counter % 4 === 0 ? long_break : short_break;
    new Notification(
      `Break time for ${this.addPadding(minutes)}:${this.addPadding(seconds)}`
    );
    this.setState({ minutes: minutes, seconds: seconds });
    const self = this;
    this.timer().then(result => {
      clearInterval(self.state.ticker);
      new Notification("Time to work for greatness!!! 🎉🎉🎉");
      self.setState({
        text: messages.start,
        started: false,
        ticker: null,
        minutes: DEFAULT_MINUTES,
        seconds: DEFAULT_SECONDS
      });
      self.startTimer();
    });
  }

  stopTimer() {
    if (!this.state.started) return;
    clearInterval(this.state.ticker);
    this.setState({ started: false, text: messages.stop });
  }

  resetTimer() {
    clearInterval(this.state.ticker);
    this.setState({
      minutes: DEFAULT_MINUTES,
      seconds: DEFAULT_SECONDS,
      ticker: null,
      started: false,
      text: messages.initial
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-grey-lightest">{this.state.text}</h2>
        <h1
          className="text-grey-lightest font-mono tracking-wide"
          style={{ fontSize: `200px` }}
        >
          {this.addPadding(this.state.minutes)}:{this.addPadding(
            this.state.seconds
          )}
        </h1>
        <div class="text-white tracking-wide mb-4"># of pomodoro completed: {this.state.completed}</div>
        <Button
          icon={<FontAwesomeIcon icon={faPlay} />}
          name="start"
          onClick={this.startTimer.bind(this)}
        />
        <Button
          icon={<FontAwesomeIcon icon={faStop} />}
          name="stop"
          onClick={this.stopTimer.bind(this)}
        />
        <Button
          icon={<FontAwesomeIcon icon={faSync} />}
          name="reset"
          onClick={this.resetTimer.bind(this)}
        />
      </div>
    );
  }
}

export default Timer;
