import React from "react";

export class Clock extends React.Component {
	constructor(props) {
		super(props);
		// set initial time:
		this.state = {time: Date.now()};
	}

	componentDidMount() {
		// update time every second
		this.timer = setInterval(() => {
			this.setState({time: Date.now()});
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
		this.startTime = Date.now();
		this.state = { time: 0 };

		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentWillUnmount() {
		this.stop();
	}

	start(startTime) {
		this.startTime = startTime;
		this.timer = setInterval(() => {
			this.setState({ time: Date.now() - this.startTime });
		}, 100);
	}

	stop() {
		clearInterval(this.timer);
	}

	reset() {
		this.stop();
	}

	render() {
		let time = new Date(this.state.time);
		let timeString =
			("0" + time.getUTCHours()).slice(-2) +
			":" +
			("0" + time.getUTCMinutes()).slice(-2) +
			":" +
			("0" + time.getUTCSeconds()).slice(-2) +
			"." +
			("00" + time.getUTCMilliseconds()).slice(-3);
		return (
			<div className="clock">
				<span>{timeString}</span>
			</div>
		);
	}
}