import React from "react";
import ReactDOM from "react-dom";
import {Clock, Timer} from "./components/clock";
import {Control, Holder} from "./components/squares";
import {createStore} from "redux";

import "./index.css";

const pi = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
const pi2 = "8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196";

class Square extends React.Component {
	render() {
		let squareClass = "square";
		squareClass += this.props.active ? " active" : "";
		squareClass += this.props.solved ? " solved" : "";

		return (
			<button
				ref={this.props.focusRef}
				className={squareClass}
				position={this.props.position}
				onClick={this.props.onClick}
				onKeyDown={this.props.onKeyDown}
				onKeyPress={this.props.onKeyPress}>
				{this.props.value}
			</button>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.blueprint = pi.split("");
		this.activeSquare = null;
		this.isStarted = false;
		this.state = {squares: Array(100).fill(""), active: 0};
	}

	changeState(state) {
		if (!this.isStarted && state.squares) {
			this.props.onStart(Date.now());
			this.isStarted = true;
		}
		this.setState(state);
	}

	renderSquare(i) {
		const isActive = this.state.active === i;
		const isSolved = this.state.squares[i] === +this.blueprint[i];
		return (
			<Square
				focusRef={el => this.focusSquare(el, i)}
				key={i}
				position={i}
				active={isActive}
				solved={isSolved}
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
				onKeyDown={e => this.handleKeyDown(e, i)}
				onKeyPress={e => this.handleKeyPress(e, i)}
			/>
		);
	}

	focusSquare(el, i) {
		if (this.state.active === i) {
			this.activeSquare = el;
		}
	}

	componentDidUpdate() {
		if (this.activeSquare) {
			this.activeSquare.focus();
		}
	}

	handleClick(i) {
		this.changeState({active: i});
		this.props.onStop();
	}

	handleKeyDown(e, i) {
		let squares = this.state.squares.slice();
		let next = i;
		switch (e.keyCode) {
			case 37:
				next--;
				break;
			case 38:
				next -= 10;
				break;
			case 9:
			case 39:
				next++;
				break;
			case 40:
				next += 10;
				break;
			case 8:
				for (; next > 0 && !squares[next]; next--);
				squares[next] = "";
				this.changeState({squares: squares, active: next});
				return;
			case 46:
				squares[i] = "";
				this.changeState({squares: squares});
				return;
		}

		if (next !== i && next >= 0 && next <= 99) {
			e.preventDefault();
			this.changeState({active: next});
		}
	}

	handleKeyPress(e, i) {
		let squares = this.state.squares.slice();
		if (e.charCode >= 48 && e.charCode <= 57) {
			squares[i] = e.charCode - 48;
			this.changeState({squares: squares});
			if (squares[i] === +this.blueprint[i]) {
				this.changeState({active: i + 1});
			}
		}
	}

	handleControl(command) {
		let squares = this.state.squares.slice();
		let i = this.state.active;
		if (command >= 0 && command <= 9) {
			squares[i] = command;
			this.changeState({squares: squares});
			if (squares[i] === +this.blueprint[i]) {
				this.changeState({active: i + 1});
			}
			return;
		}

		if (command >= 37 && command <= 40) {
			let next = i;
			switch (command) {
				case 37:
					next--;
					break;
				case 38:
					next -= 10;
					break;
				case 39:
					next++;
					break;
				case 40:
					next += 10;
					break;
			}

			if (next !== i && next >= 0 && next <= 99) {
				this.changeState({active: next});
			}
			return;
		}

		if (command === 11) {
			for (; i > 0 && !squares[i]; i--);
			squares[i] = "";
			this.changeState({squares: squares, active: i});
		} else if (command === 12) {
			squares[i] = "";
			this.changeState({squares: squares});
		} else if (command === 13) {
			this.changeState({squares: Array(100).fill(""), active: 0});
		} else if (command === 14) {
		} else if (command === 15) {
		}
	}

	handleMouse(isDown) {
		if (isDown && !this.backup) {
			this.backup = this.state.squares.slice();
			this.changeState({squares: this.blueprint.slice()});
		} else if (this.backup) {
			this.changeState({squares: this.backup.slice()});
			this.backup = null;
		}
	}

	render() {
		return (
			<div>
				{"0123456789".split("").map(row => (
					<div key={"row" + row} className="board-row">
						{"0123456789".split("").map(col => this.renderSquare(+row * 10 + +col))}
					</div>
				))}
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.board = React.createRef();
		this.timer = React.createRef();
		this.handleControl = this.handleControl.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
	}

	handleControl(command) {
		this.board.current.handleControl(command);
	}

	handleMouse(isDown) {
		this.board.current.handleMouse(isDown);
	}

	startTimer(time) {
		this.timer.current.start(time);
	}

	stopTimer() {
		this.timer.current.stop();
	}

	resetTimer() {
		this.timer.current.reset();
	}

	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Clock />
					<Timer ref={this.timer} />
					<Board ref={this.board} onStart={time => this.startTimer(time)} onStop={this.stopTimer} />
					<div className="game-control">
						<div>
							<Holder />
							<button className="control" onMouseDown={() => this.handleMouse(1)} onMouseUp={() => this.handleMouse(0)}>
								<span role="img" aria-label="">
									&#128522;
								</span>
							</button>
							{/* smile */}
							<Control value="7" command={7} onClick={this.handleControl} />
							<Control value="8" command={8} onClick={this.handleControl} />
							<Control value="9" command={9} onClick={this.handleControl} />
							<Holder />
							<Control value="&#9003;" command={11} onClick={this.handleControl} /> {/* backspace */}
							<Control value="&#9249;" command={12} onClick={this.handleControl} /> {/* delete */}
							<Control value="&#128259;" command={13} onClick={this.handleControl} /> {/* refresh */}
							<Holder />
						</div>
						<div>
							<Holder />
							<button className="control" />
							<Control value="4" command={4} onClick={this.handleControl} />
							<Control value="5" command={5} onClick={this.handleControl} />
							<Control value="6" command={6} onClick={this.handleControl} />
							<Holder />
							<Control value="&#8630;" command={14} onClick={this.handleControl} /> {/* undo */}
							<Control value="&#8679;" command={38} onClick={this.handleControl} /> {/* up arrow */}
							<Control value="&#8631;" command={15} onClick={this.handleControl} /> {/* redo */}
							<Holder />
						</div>
						<div>
							<Holder />
							<Control value="0" command={0} onClick={this.handleControl} />
							<Control value="1" command={1} onClick={this.handleControl} />
							<Control value="2" command={2} onClick={this.handleControl} />
							<Control value="3" command={3} onClick={this.handleControl} />
							<Holder />
							<Control value="&#8678;" command={37} onClick={this.handleControl} /> {/* left arrow */}
							<Control value="&#8681;" command={40} onClick={this.handleControl} /> {/* down arrow */}
							<Control value="&#8680;" command={39} onClick={this.handleControl} /> {/* right arrow */}
							<Holder />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById("root"));
