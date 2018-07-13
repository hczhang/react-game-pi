import React from "react";
import Tappable from "react-tappable";

export class Holder extends React.Component {
	render() {
		return <button className="holder" />;
	}
}

export class Control extends React.Component {
	/*render() {
		return (
			<button className="control" onClick={() => this.props.onClick(this.props.command)}>
				{this.props.value}
			</button>
		);
	}*/

	render() {
		return (
			<Tappable
				component="button"
				preventDefault
				stopPropagation
				className="control"
				onTap={() => this.props.onClick(this.props.command)}>
				{this.props.value}
			</Tappable>
		);
	}
}
