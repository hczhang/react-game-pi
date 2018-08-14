import React from "react";
import { TIMER } from "./const";

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    // set initial time:
    this.state = { time: Date.now() };
  }

  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render() {
    let time = new Date(this.state.time).toLocaleTimeString();
    return (
      <div className="clock">
        <span>{time}</span>
      </div>
    );
  }
}

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.startTime = null;
    this.state = { chrono: 0 };
  }

  componentWillUnmount() {
    this.pause();
  }

  start() {
    this.startTime = Date.now() - this.state.chrono;
    this.timer = setInterval(() => {
      this.setState({ chrono: Date.now() - this.startTime });
    }, 100);
  }

  pause() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  getTimerString(time) {
    time = new Date(time);
    return (
      ("0" + time.getUTCHours()).slice(-2) +
      ":" +
      ("0" + time.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + time.getUTCSeconds()).slice(-2) +
      "." +
      ("00" + time.getUTCMilliseconds()).slice(-3)
    );
  }

  render() {
    const status = this.props.state.status;
    if (status === TIMER.INITIAL && this.state.chrono) {
      this.pause();
      this.setState({ chrono: 0 });
    } else if (status === TIMER.STARTED && !this.timer) {
      this.start();
    } else if (status === TIMER.PAUSED) {
      this.pause();
    }

    return (
      <div className="clock">
        <span>{this.getTimerString(this.state.chrono)}</span>
      </div>
    );
  }
}
