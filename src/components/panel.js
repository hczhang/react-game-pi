import React from "react";
import { Holder, Control } from "./control";

export const ControlPanel = () => (
  <div className="game-control">
    <div>
      <Holder />
      {/* smile &#128522; pi &#960; &#120529; */}
      <Control cmd="hint" />
      <Control cmd={7} />
      <Control cmd={8} />
      <Control cmd={9} />
      <Holder />
      {/* backspace, unicode character &#9003; &#128281; &#9224; */}
      <Control cmd="backspace" />
      {/* delete, unicode character &#9249; */}
      <Control cmd="del" />
      {/* clear, unicode character &#128259; &#9114; &#9100; &#9009; */}
      <Control cmd="clear" />
      <Holder />
    </div>
    <div>
      <Holder />
      {/* pause, unicode character &#10073;&#10073; */}
      <Control cmd="pause" />
      <Control cmd={4} />
      <Control cmd={5} />
      <Control cmd={6} />
      <Holder />
      {/* undo, unicode character &#8630; */}
      <Control cmd="undo" />
      {/* up arrow, unicode character &#8679; */}
      <Control cmd="up" />
      {/* redo, unicode character &#8631; */}
      <Control cmd="redo" />
      {/* downwards, unicode character &#8631; &#8595; */}
      <Control cmd="downwards" />
    </div>
    <div>
      <Holder />
      <Control cmd={0} />
      <Control cmd={1} />
      <Control cmd={2} />
      <Control cmd={3} />
      <Holder />
      {/* left arrow, unicode character &#8678; */}
      <Control cmd="left" />
      {/* down arrow, unicode character &#8681; */}
      <Control cmd="down" />
      {/* right arrow, unicode character &#8680; */}
      <Control cmd="right" />
      {/* rightwards, unicode character &#8594; */}
      <Control cmd="rightwards" />
    </div>
  </div>
);
