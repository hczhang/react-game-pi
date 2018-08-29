import React from "react";
import ReactDOM from "react-dom";
import { Square } from "./square";
import { connect } from "react-redux";

class BoardComp extends React.Component {
  constructor(props) {
    super(props);
    this.comps = Array(100);
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.comps[this.props.state.active]).focus();
  }

  render() {
    // const ranges = [...Array(10)].map((e, i) => i);
    const ranges = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="game-board">
        {ranges.map(row => (
          <div key={"row" + row} className="board-row">
            {ranges.map(col => {
              let i = row * 10 + col;
              return <Square ref={comp => (this.comps[i] = comp)} key={i} position={i} />;
            })}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ state: state.board.present });
const mapDispatchToProps = dispatch => ({});

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardComp);
