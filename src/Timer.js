import React, { Component } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faSync } from '@fortawesome/free-solid-svg-icons';


const DEFAULT_MINUTES = 0;
const DEFAULT_SECONDS = 5;
const messages = {
  initial: 'Let the countdown begin!!',
  stop: 'Never quit, keep going!! 👊🏼👊🏼👊🏼',
  start: 'Greatness is within sight!! 🏅🏅🏅'
}

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: DEFAULT_MINUTES,
      seconds: DEFAULT_SECONDS,
      ticker: null,
      started: false,
      text: messages.initial
    };
  }

  componentDidMount() {
    if ("Notification" in window) {
      var permission = Notification.permission;
  
      if (permission === "denied" || permission === "granted") {
        return;
      }
  
      Notification.requestPermission()
    }
  }

  addPadding(num) {
    return num < 10 ? `0${num}`: num
  }

  startTimer() {
    if (this.state.started) return;
    const self = this;
    this.setState({started: true, text: messages.start });
    this.setState({ticker: setInterval(function() {
        let { minutes, seconds } = self.state;
        if (self.state.minutes === 0 && self.state.seconds === 0) {
          clearInterval(self.state.ticker);
          new Notification("Time is up!!! 🎉🎉🎉");
          self.setState({text: 'Great 🎉🎉🎉🎉'})
          return;
        }

        if (self.state.seconds === 0) {
          self.setState({minutes: minutes - 1, seconds: 59});
        } else {
          self.setState({seconds: seconds - 1});
        }
      }, 1000)
    });
  }

  stopTimer() {
    if (!this.state.started) return;
    clearInterval(this.state.ticker);
    this.setState({started: false, text: messages.stop });
  }

  resetTimer() {
    clearInterval(this.state.ticker)
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
        <h1 className="text-grey-lightest font-mono tracking-wide" style={{fontSize: `200px`}}>{this.addPadding(this.state.minutes)}:{this.addPadding(this.state.seconds)}</h1>
        <Button name={<FontAwesomeIcon icon={faPlay} />} onClick={this.startTimer.bind(this)} />
        <Button name={<FontAwesomeIcon icon={faStop} />} onClick={this.stopTimer.bind(this)} />
        <Button name={<FontAwesomeIcon icon={faSync} />} onClick={this.resetTimer.bind(this)} />
      </div>
    )
  }
}


export default Timer;