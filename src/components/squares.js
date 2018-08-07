import React from "react";

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
