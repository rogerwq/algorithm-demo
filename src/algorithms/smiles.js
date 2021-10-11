import React from "react";
import SmilesDrawer from "smiles-drawer-fork-continue";
import Flex from "@react-css/flex";
import { CopyBlock, dracula } from "react-code-blocks";

let code_blocks = {
  get_closures: `
  fn get_closures(atom_current: usize, atom_parent: usize, ranking: &Vec<usize>, ancestor: &mut Vec<usize>, visited: &mut Vec<usize>, opening_closures: &mut std::collections::HashMap<usize, Vec<usize>>) {
    ancestor.push(atom_current);
    visited.push(atom_current);
    let mut nbors: Vec<usize> = get_neighbours_excluding_parent(atom_current, atom_parent);
    nbors.sort_by_key(|&idx| ranking[idx]);
    for nb in nbors.iter() {
        if ancestor.contains(nb) { if let Some(oc) = opening_closures.get_mut(nb) { oc.push(atom_current); } }
        else {
            if !visited.contains(nb) { get_closures(*nb, atom_current, ranking, ancestor, visited, opening_closures); }
        }
    }
    ancestor.remove(atom_current);
}
  `
};

function Cell(props) {
  const data = props.data;
  return (
    <div
      style={{
        backgroundColor: "white"
      }}
    >
      <h3>{data.title}</h3>
      <Flex flexDirection="row">
        <canvas
          id="example-canvas"
          data-smiles="Cc1cccc2CC=Cc12"
          data-numbering="[0,1,2,3,4,5,6,7,8,9]"
          data-numbering-directions='{"1":"E", "3":"N", "4":"N", "5":"NW","6":"NW","7":"W"}'
        ></canvas>
        <div>
          <table>
            <tr>
              <td>ancestor</td>
              <td>{data.ancestor}</td>
            </tr>
            <tr>
              <td>visited</td>
              <td>{data.visited}</td>
            </tr>
            <tr>
              <td>nbors</td>
              <td>{data.nbors}</td>
            </tr>
            <tr>
              <td>openingClosures</td>
              <td>{data.openingClosures}</td>
            </tr>
            <tr>
              <td>closingClosures</td>
              <td>{data.closingClosures}</td>
            </tr>
          </table>
        </div>
        <div />
        <div></div>
      </Flex>
    </div>
  );
}

export default class Smiles extends React.Component {
  componentDidMount() {
    let options = { width: 300, height: 300 };
    SmilesDrawer.apply(options);
  }

  render() {
    let all_data = [
      {
        title: "get_closure(0, None)",
        ancestor: "[0]",
        visited: "[0]",
        nbors: "[1]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title: "get_closure(0, None) -> get_closure(1, 0)",
        ancestor: "[0, 1]",
        visited: "[0, 1]",
        nbors: "[2, 9]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title: "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1)",
        ancestor: "[0, 1, 2]",
        visited: "[0, 1, 2]",
        nbors: "[3]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2)",
        ancestor: "[0, 1, 2, 3]",
        visited: "[0, 1, 2, 3]",
        nbors: "[4]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3)",
        ancestor: "[0, 1, 2, 3, 4]",
        visited: "[0, 1, 2, 3, 4]",
        nbors: "[5]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4)",
        ancestor: "[0, 1, 2, 3, 4, 5]",
        visited: "[0, 1, 2, 3, 4, 5]",
        nbors: "[6, 9]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5)",
        ancestor: "[0, 1, 2, 3, 4, 5, 6]",
        visited: "[0, 1, 2, 3, 4, 5, 6]",
        nbors: "[7]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6)",
        ancestor: "[0, 1, 2, 3, 4, 5, 6, 7]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7]",
        nbors: "[8]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6) -> get_closure(8, 7)",
        ancestor: "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
        nbors: "[9]",
        openingClosures: "{}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6) -> get_closure(8, 7) -> get_closure(9, 8)",
        ancestor: "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[1, 5]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6) -> get_closure(8, 7)",
        ancestor: "[0, 1, 2, 3, 4, 5, 6, 7]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[9]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6)",
        ancestor: "[0, 1, 2, 3, 4, 5, 6]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[8]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5)",
        ancestor: "[0, 1, 2, 3, 4, 5]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[7]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4)",
        ancestor: "[0, 1, 2, 3, 4]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[6]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3)",
        ancestor: "[0, 1, 2, 3]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[5]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title:
          "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2)",
        ancestor: "[0, 1, 2]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[4]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title: "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1)",
        ancestor: "[0, 1]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[3]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title: "get_closure(0, None) -> get_closure(1, 0)",
        ancestor: "[0]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[2, 9]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      },
      {
        title: "get_closure(0, None)",
        ancestor: "[]",
        visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        nbors: "[1]",
        openingClosures: "{1: [9], 5: [9]}",
        closingClosures: "[]"
      }
    ];
    const all_cells = all_data.map((data) => <Cell data={data} />);

    return (
      <div>
        <h1>Building Smiles</h1>
        <CopyBlock
          language="rust"
          text={code_blocks.get_closures}
          showLineNumbers={false}
          theme={dracula}
          wrapLines
        />
        <div>{all_cells}</div>
      </div>
    );
  }
}
