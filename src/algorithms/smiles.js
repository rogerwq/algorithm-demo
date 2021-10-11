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
      <h3>get_closure(1, None)</h3>
      <Flex flexDirection="row">
        <canvas
          id="example-canvas"
          data-smiles="Cc1cccc2CC=Cc12"
          data-numbering="[1,2,3,4,5,6,7,8,9,10]"
        ></canvas>
        <div>
          <table>
            <tr>
              <td>ancestor</td>
              <td>{data.ancestor}</td>
            </tr>
            <tr>
              <td>visited</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>openingClosures</td>
              <td>[]</td>
            </tr>
            <tr>
              <td>closingClosures</td>
              <td>[]</td>
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
    let all_data = [{ ancestor: "[1, 2, 3]" }, { ancestor: "[1, 2, 3]" }];
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
