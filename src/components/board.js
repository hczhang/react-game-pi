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
    return (
      <div>
        {"0123456789".split("").map(row => (
          <div key={"row" + row} className="board-row">
            {"0123456789".split("").map(col => {
              let i = +row * 10 + +col;
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
