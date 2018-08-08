import React from "react";
import Tappable from "react-tappable";

class Holder extends React.Component {
  render() {
    return <button className="holder" />;
  }
}

class Control extends React.Component {
  /*render() {
		return (
			<button className="control" onClick={() => this.props.onClick(this.props.cmd)}>
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
        onTap={() => this.props.onClick({ type: "control", cmd: this.props.cmd })}
      >
        {this.props.value}
      </Tappable>
    );
  }
}

export class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.props.handler;
  }

  render() {
    return (
      <div className="game-control">
        <div>
          <Holder />
          {/* smile &#128522; pi &#960; &#120529; */}
          <Control
            value="&#120529;"
            cmd="hint"
            onClick={this.handler}
            style={{ fontFamily: "Times New Roman" }}
          />
          <Control value="7" cmd={7} onClick={this.handler} />
          <Control value="8" cmd={8} onClick={this.handler} />
          <Control value="9" cmd={9} onClick={this.handler} />
          <Holder />
          {/* backspace &#9003; &#128281; */}
          <Control value="&#9224;" cmd="backspace" onClick={this.handler} />
          {/* delete */}
          <Control value="&#9249;" cmd="del" onClick={this.handler} />
          {/* clear &#128259; &#9114; &#9100; &#9009; */}
          <Control value="&#9009;" cmd="clear" onClick={this.handler} />
          <Holder />
        </div>
        <div>
          <Holder />
          {/* pause */}
          <Control value="&#10073;&#10073;" cmd="pause" onClick={this.handler} />
          <Control value="4" cmd={4} onClick={this.handler} />
          <Control value="5" cmd={5} onClick={this.handler} />
          <Control value="6" cmd={6} onClick={this.handler} />
          <Holder />
          {/* undo */}
          <Control value="&#8630;" cmd="undo" onClick={this.handler} />
          {/* up arrow */}
          <Control value="&#8679;" cmd="up" onClick={this.handler} />
          {/* redo */}
          <Control value="&#8631;" cmd="redo" onClick={this.handler} />
          <Holder />
        </div>
        <div>
          <Holder />
          <Control value="0" cmd={0} onClick={this.handler} />
          <Control value="1" cmd={1} onClick={this.handler} />
          <Control value="2" cmd={2} onClick={this.handler} />
          <Control value="3" cmd={3} onClick={this.handler} />
          <Holder />
          {/* left arrow */}
          <Control value="&#8678;" cmd="left" onClick={this.handler} />
          {/* down arrow */}
          <Control value="&#8681;" cmd="down" onClick={this.handler} />
          {/* right arrow */}
          <Control value="&#8680;" cmd="right" onClick={this.handler} />
          <Holder />
        </div>
      </div>
    );
  }
}
