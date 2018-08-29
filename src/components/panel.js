import React from "react";
import { Holder, Control } from "./control";

export const ControlPanel = () => (
  <div className="game-control">
    <div>
      <Holder />
      {/* smile &#128522; pi &#960; &#120529; */}
      <Control value="&#120529;" cmd="hint" style={{ fontFamily: "Times New Roman" }} />
      <Control value="7" cmd={7} />
      <Control value="8" cmd={8} />
      <Control value="9" cmd={9} />
      <Holder />
      {/* backspace &#9003; &#128281; */}
      <Control value="&#9224;" cmd="backspace" />
      {/* delete */}
      <Control value="&#9249;" cmd="del" />
      {/* clear &#128259; &#9114; &#9100; &#9009; */}
      <Control value="&#9009;" cmd="clear" />
      <Holder />
    </div>
    <div>
      <Holder />
      {/* pause */}
      <Control value="&#10073;&#10073;" cmd="pause" />
      <Control value="4" cmd={4} />
      <Control value="5" cmd={5} />
      <Control value="6" cmd={6} />
      <Holder />
      {/* undo */}
      <Control value="&#8630;" cmd="undo" className="undo" />
      {/* up arrow */}
      <Control value="&#8679;" cmd="up" />
      {/* redo */}
      <Control value="&#8631;" cmd="redo" />
      <Control value="&#8595;" cmd="downwards" />
    </div>
    <div>
      <Holder />
      <Control value="0" cmd={0} />
      <Control value="1" cmd={1} />
      <Control value="2" cmd={2} />
      <Control value="3" cmd={3} />
      <Holder />
      {/* left arrow */}
      <Control value="&#8678;" cmd="left" />
      {/* down arrow */}
      <Control value="&#8681;" cmd="down" />
      {/* right arrow */}
      <Control value="&#8680;" cmd="right" />
      <Control value="&#8594;" cmd="rightwards" />
    </div>
  </div>
);
