import React from "react";
import { Holder, Control } from "./squares";

export class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.props.clickHander;
  }

  render() {
    return (
      <div className="game-control">
        <div>
          <Holder />
          {/* smile &#128522; pi &#960; &#120529;*/}
          <Control
            value="&#120529;"
            command={20}
            onClick={this.clickHandler}
            style={{ fontFamily: "Times New Roman" }}
          />
          <Control value="7" command={7} onClick={this.clickHandler} />
          <Control value="8" command={8} onClick={this.clickHandler} />
          <Control value="9" command={9} onClick={this.clickHandler} />
          <Holder />
          {/* backspace &#9003; &#128281; */}
          <Control value="&#9224;" command={11} onClick={this.clickHandler} />
          {/* delete */}
          <Control value="&#9249;" command={12} onClick={this.clickHandler} />
          {/* refresh &#128259; &#9114; &#9100; &#9009; */}
          <Control value="&#9009;" command={13} onClick={this.clickHandler} />
          <Holder />
        </div>
        <div>
          <Holder />
          {/* pause */}
          <Control value="&#10073;&#10073;" command={21} onClick={this.clickHandler} />
          <Control value="4" command={4} onClick={this.clickHandler} />
          <Control value="5" command={5} onClick={this.clickHandler} />
          <Control value="6" command={6} onClick={this.clickHandler} />
          <Holder />
          {/* undo */}
          <Control value="&#8630;" command={14} onClick={this.clickHandler} />
          {/* up arrow */}
          <Control value="&#8679;" command={38} onClick={this.clickHandler} />
          {/* redo */}
          <Control value="&#8631;" command={15} onClick={this.clickHandler} />
          <Holder />
        </div>
        <div>
          <Holder />
          <Control value="0" command={0} onClick={this.clickHandler} />
          <Control value="1" command={1} onClick={this.clickHandler} />
          <Control value="2" command={2} onClick={this.clickHandler} />
          <Control value="3" command={3} onClick={this.clickHandler} />
          <Holder />
          {/* left arrow */}
          <Control value="&#8678;" command={37} onClick={this.clickHandler} />
          {/* down arrow */}
          <Control value="&#8681;" command={40} onClick={this.clickHandler} />
          {/* right arrow */}
          <Control value="&#8680;" command={39} onClick={this.clickHandler} />
          <Holder />
        </div>
      </div>
    );
  }
}
