import React from "react";
import Tappable from "react-tappable";

export class Square extends React.Component {
  render() {
    let squareClass = "square";
    squareClass += this.props.active ? " active" : "";
    squareClass += this.props.solved ? " solved" : "";

    return (
      <button
        className={squareClass}
        position={this.props.position}
        onClick={this.props.onClick}
        onKeyDown={this.props.onKeyDown}
        onKeyPress={this.props.onKeyPress}
      >
        {this.props.value}
      </button>
    );
  }
}

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
        style={this.props.style || {}}
        onTap={() => this.props.onClick(this.props.command)}
      >
        {this.props.value}
      </Tappable>
    );
  }
}
