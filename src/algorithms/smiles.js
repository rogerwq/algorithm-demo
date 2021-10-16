import React from "react";
import {
  HorizontalLayout,
  Panel,
  VerticalLayout,
  Separator
} from "nice-react-layout";
// import { CopyBlock, dracula } from "react-code-blocks";
import Molecule from "../components/molecule";

const atom_color = "rgba(0, 255, 0, 0.5)";
const neighbour_color = "rgba(0, 255, 255, 0.5)";
const all_data_get_closure = [
  {
    title: "get_closure(0, None)",
    desc: [
      "start from Atom 0, run the function get_closure(0, None)",
      "push Atom 0 in ancestors and visted",
      "find the neighbour Atom 1"
    ],
    ancestor: "[0]",
    visited: "[0]",
    nbors: "[1]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 0: atom_color, 1: neighbour_color }
  },
  {
    title: "get_closure(0, None) -> get_closure(1, 0)",
    desc: [
      "Continue on neighbouring Atom 1, run get_closure(1, 0)",
      "push Atom 1 in ancestors and visted",
      "find the neighbours Atom 2 and Atom 9"
    ],
    ancestor: "[0, 1]",
    visited: "[0, 1]",
    nbors: "[2, 9]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 1: atom_color, 2: neighbour_color, 9: neighbour_color }
  },
  {
    title: "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1)",
    desc: [
      "Continue on neighbouring Atom 2, run get_closure(2, 1)",
      "push Atom 2 in ancestors and visted",
      "find the neighbour Atom 3"
    ],
    ancestor: "[0, 1, 2]",
    visited: "[0, 1, 2]",
    nbors: "[3]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 2: atom_color, 3: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2)",
    desc: [
      "Continue on neighbouring Atom 3, run get_closure(3, 2)",
      "push Atom 3 in ancestors and visted",
      "find the neighbour Atom 4"
    ],
    ancestor: "[0, 1, 2, 3]",
    visited: "[0, 1, 2, 3]",
    nbors: "[4]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 3: atom_color, 4: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3)",
    desc: [
      "Continue on neighbouring Atom 4, run get_closure(4, 3)",
      "push Atom 4 in ancestors and visted",
      "find the neighbour Atom 5"
    ],
    ancestor: "[0, 1, 2, 3, 4]",
    visited: "[0, 1, 2, 3, 4]",
    nbors: "[5]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 4: atom_color, 5: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4)",
    desc: [
      "Continue on neighbouring Atom 5, run get_closure(5, 4)",
      "push Atom 5 in ancestors and visted",
      "find the neighbours Atom 6 and Atom 9"
    ],
    ancestor: "[0, 1, 2, 3, 4, 5]",
    visited: "[0, 1, 2, 3, 4, 5]",
    nbors: "[6, 9]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 5: atom_color, 6: neighbour_color, 9: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5)",
    desc: [
      "Continue on neighbouring Atom 6, run get_closure(6, 5)",
      "push Atom 6 in ancestors and visted",
      "find the neighbour Atom 7"
    ],
    ancestor: "[0, 1, 2, 3, 4, 5, 6]",
    visited: "[0, 1, 2, 3, 4, 5, 6]",
    nbors: "[7]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 6: atom_color, 7: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6)",
    desc: [
      "Continue on neighbouring Atom 7, run get_closure(7, 6)",
      "push Atom 7 in ancestors and visted",
      "find the neighbour Atom 8"
    ],
    ancestor: "[0, 1, 2, 3, 4, 5, 6, 7]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7]",
    nbors: "[8]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 7: atom_color, 8: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6) -> get_closure(8, 7)",
    desc: [
      "Continue on neighbouring Atom 8, run get_closure(8, 7)",
      "push Atom 8 in ancestors and visted",
      "find the neighbour Atom 9"
    ],
    ancestor: "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
    nbors: "[9]",
    openingClosures: "{}",
    closingClosures: "[]",
    highlights: { 8: atom_color, 9: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6) -> get_closure(8, 7) -> get_closure(9, 8)",
    desc: [
      "continue on neighbouring Atom 9, run get_closure(9, 8)",
      "push Atom 9 in ancestors and visted",
      "find the neighbours Atom 1 and Atom 5",
      "neighbouring Atom 1 found in ancestors,  add (1: [9]) in openingClosures",
      "neighbouring Atom 5 found in ancestors,  add (5: [9]) in openingClosures",
      "remove Atom 9 from ancestors"
    ],
    ancestor: "[0, 1, 2, 3, 4, 5, 6, 7, 8]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[1, 5]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 9: atom_color, 1: neighbour_color, 5: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6) -> get_closure(8, 7)",
    desc: ["return back to get_closure(8, 7)", "remove Atom 8 from ancestors"],
    ancestor: "[0, 1, 2, 3, 4, 5, 6, 7]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 8: atom_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5) -> get_closure(7, 6)",
    desc: ["return back to get_closure(7, 6)", "remove Atom 7 from ancestors"],
    ancestor: "[0, 1, 2, 3, 4, 5, 6]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 7: atom_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4) -> get_clossure(6, 5)",
    desc: ["return back to get_closure(6, 5)", "remove Atom 6 from ancestors"],
    ancestor: "[0, 1, 2, 3, 4, 5]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 6: atom_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3) -> get_closure(5, 4)",
    desc: [
      "return back to get_closure(5, 4)",
      "continue on neighbouring Atom 9, found in visited",
      "remove Atom 5 from ancestors"
    ],
    ancestor: "[0, 1, 2, 3, 4]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[9]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 5: atom_color, 9: neighbour_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2) -> get_closure(4, 3)",
    desc: ["return back to get_closure(4, 3)", "remove Atom 4 from ancestors"],
    ancestor: "[0, 1, 2, 3]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 4: atom_color }
  },
  {
    title:
      "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1) -> get_closure(3, 2)",
    desc: ["return back to get_closure(3, 2)", "remove Atom 3 from ancestors"],
    ancestor: "[0, 1, 2]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 3: atom_color }
  },
  {
    title: "get_closure(0, None) -> get_closure(1, 0) -> get_closure(2, 1)",
    desc: ["return back to get_closure(2, 1)", "remove Atom 2 from ancestors"],
    ancestor: "[0, 1]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 2: atom_color }
  },
  {
    title: "get_closure(0, None) -> get_closure(1, 0)",
    desc: [
      "return back to get_closure(1, 0)",
      "continue on neighbouring Atom 9, found in visited",
      "remove Atom 1 from ancestors"
    ],
    ancestor: "[0]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[9]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 1: atom_color, 9: neighbour_color }
  },
  {
    title: "get_closure(0, None)",
    desc: [
      "return back to get_closure(0, None)",
      "remove Atom 0 from ancestors",
      "the whole process completes"
    ],
    ancestor: "[]",
    visited: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
    nbors: "[]",
    openingClosures: "{1: [9], 5: [9]}",
    closingClosures: "[]",
    highlights: { 0: atom_color }
  }
];
const all_data_build_smiles = [
  {
    title: "build_smiles(0, None)",
    desc: [
      "start from Atom 0, push Atom 0 in visited",
      "add atom symbol to seq",
      "closingClosures[0] is empty",
      "openingClosures[0] is empty",
      "neighbouring Atom 1 found"
    ],
    visited: "[0]",
    digit_heap: "[]",
    seq: "C",
    closingClosures: "{}",
    nbors: "[1]",
    branches: "[]",
    highlights: { 0: atom_color, 1: neighbour_color }
  },
  {
    title: "build_smiles(0, None) -> build_smiles(1, 0)",
    desc: [
      "continue on neighbouring Atom 1, push Atom 1 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[1] is empty",
      "openingClosures[1] is [9]: for Atom 9, get digit 1 from digit heap, append digit '1' to seq, append bond symbol with digit '1' to closingClosure[9]",
      "neighbouring Atom 2 and Atom 9 found"
    ],
    visited: "[0,1]",
    digit_heap: "[1]",
    seq: "c1",
    closingClosures: "{9: ['1']}",
    nbors: "[2, 9]",
    branches: "[]",
    highlights: { 1: atom_color, 2: neighbour_color, 9: neighbour_color }
  },
  {
    title: "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1)",
    desc: [
      "continue on neighbouring Atom 2, push Atom 2 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[2] is empty",
      "openingClosures[2] is empty",
      "neighbouring Atom 3 found"
    ],
    visited: "[0,1,2]",
    digit_heap: "[1]",
    seq: "c",
    closingClosures: "{9: ['1']}",
    nbors: "[3]",
    branches: "[]",
    highlights: { 2: atom_color, 3: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2)",
    desc: [
      "continue on neighbouring Atom 3, push Atom 3 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[3] is empty",
      "openingClosures[3] is empty",
      "neighbouring Atom 4 found"
    ],
    visited: "[0,1,2,3]",
    digit_heap: "[1]",
    seq: "c",
    closingClosures: "{9: ['1']}",
    nbors: "[3]",
    branches: "[]",
    highlights: { 3: atom_color, 4: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3)",
    desc: [
      "continue on neighbouring Atom 4, push Atom 4 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[4] is empty",
      "openingClosures[4] is empty",
      "neighbouring Atom 5 found"
    ],
    visited: "[0,1,2,3,4]",
    digit_heap: "[1]",
    seq: "c",
    closingClosures: "{9: ['1']}",
    nbors: "[5]",
    branches: "[]",
    highlights: { 4: atom_color, 5: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4)",
    desc: [
      "continue on neighbouring Atom 5, push Atom 5 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[5] is empty",
      "openingClosures[5] is [9]: for Atom 9, get digit 2 from digit heap, append digit '2' to seq, append bond symbol with digit '2' to closingClosure[9]",
      "neighbouring Atom 5 found"
    ],
    visited: "[0,1,2,3,4,5]",
    digit_heap: "[1,2]",
    seq: "c2",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[6, 9]",
    branches: "[]",
    highlights: { 5: atom_color, 6: neighbour_color, 9: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4) -> build_smiles(6, 5)",
    desc: [
      "continue on neighbouring Atom 6, push Atom 6 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[6] is empty",
      "openingClosures[6] is empty",
      "neighbouring Atom 7 found"
    ],
    visited: "[0,1,2,3,4,5,6]",
    digit_heap: "[1,2]",
    seq: "C",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[7]",
    branches: "[]",
    highlights: { 6: atom_color, 7: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4) -> build_smiles(6, 5) -> build_smiles(7, 6)",
    desc: [
      "continue on neighbouring Atom 7, push Atom 7 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[7] is empty",
      "openingClosures[7] is empty",
      "neighbouring Atom 8 found"
    ],
    visited: "[0,1,2,3,4,5,6,7]",
    digit_heap: "[1,2]",
    seq: "C",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[8]",
    branches: "[]",
    highlights: { 7: atom_color, 8: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4) -> build_smiles(6, 5) -> build_smiles(7, 6) -> build_smiles(8, 7)",
    desc: [
      "continue on neighbouring Atom 8, push Atom 8 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[8] is empty",
      "openingClosures[8] is empty",
      "neighbouring Atom 9 found"
    ],
    visited: "[0,1,2,3,4,5,6,7,8]",
    digit_heap: "[1,2]",
    seq: "=C",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[9]",
    branches: "[]",
    highlights: { 8: atom_color, 9: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4) -> build_smiles(6, 5) -> build_smiles(7, 6) -> build_smiles(8, 7) -> build_smiles(9, 8)",
    desc: [
      "continue on neighbouring Atom 9, push Atom 9 in visited",
      "add bond symbol and atom symbol to seq",
      "closingClosures[9] is ['1', '2']: add '1' to seq, remove digit 1 from digit heap; add '2' to seq; remove digit 2 from digit heap",
      "openingClosures[9] is empty",
      "neighbouring Atom 1 and Atom 5 found, both are visited",
      "return seq 'c12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "c12",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[1,5]",
    branches: "[]",
    highlights: { 9: atom_color, 1: neighbour_color, 5: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4) -> build_smiles(6, 5) -> build_smiles(7, 6) -> build_smiles(8, 7)",
    desc: [
      "return back to build_smiles(8, 7)",
      "add branches to seq, return seq '=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "=C",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['c12']",
    highlights: { 8: atom_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4) -> build_smiles(6, 5) -> build_smiles(7, 6)",
    desc: [
      "return back to build_smiles(7, 6)",
      "add branches to seq, return seq 'C=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "C",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['=Cc12']",
    highlights: { 7: atom_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4) -> build_smiles(6, 5)",
    desc: [
      "return back to build_smiles(6, 5)",
      "add branches to seq, return seq 'CC=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "C",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['C=Cc12']",
    highlights: { 6: atom_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3) -> build_smiles(5, 4)",
    desc: [
      "return back to build_smiles(5, 4)",
      "neighbouring Atom 9 is visited",
      "add branches to seq, return seq 'c2CC=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "c2",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['CC=Cc12']",
    highlights: { 5: atom_color, 9: neighbour_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2) -> build_smiles(4, 3)",
    desc: [
      "return back to build_smiles(4, 3)",
      "add branches to seq, return seq 'cc2CC=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "c",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['c2CC=Cc12']",
    highlights: { 4: atom_color }
  },
  {
    title:
      "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1) -> build_smiles(3, 2)",
    desc: [
      "return back to build_smiles(3, 2)",
      "add branches to seq, return seq 'ccc2CC=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "c",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['cc2CC=Cc12']",
    highlights: { 3: atom_color }
  },
  {
    title: "build_smiles(0, None) -> build_smiles(1, 0) -> build_smiles(2, 1)",
    desc: [
      "return back to build_smiles(2, 1)",
      "add branches to seq, return seq 'cccc2CC=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "c",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['ccc2CC=Cc12']",
    highlights: { 2: atom_color }
  },
  {
    title: "build_smiles(0, None) -> build_smiles(1, 0)",
    desc: [
      "return back to build_smiles(1, 0)",
      "add branches to seq, return seq 'c1cccc2CC=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "c1",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['cccc2CC=Cc12']",
    highlights: { 1: atom_color }
  },
  {
    title: "build_smiles(0, None)",
    desc: [
      "return back to build_smiles(0, None)",
      "add branches to seq, return seq 'Cc1cccc2CC=Cc12'",
      "the whole process completes, we get the result 'Cc1cccc2CC=Cc12'"
    ],
    visited: "[0,1,2,3,4,5,6,7,8,9]",
    digit_heap: "[]",
    seq: "c1",
    closingClosures: "{9: ['1', '2']}",
    nbors: "[]",
    branches: "['c1cccc2CC=Cc12']",
    highlights: { 0: atom_color }
  }
];

function CellGetClosure(props) {
  const { data, step } = props;
  const numbering = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbering_directions = {
    "1": "E",
    "3": "N",
    "4": "N",
    "5": "NW",
    "6": "NW",
    "7": "W"
  };
  const desc = (data.desc ? data.desc : []).map((d) => <li>{d}</li>);
  return (
    <div>
      <HorizontalLayout mockup>
        <Panel>
          <h3>
            Step {step} {data.title}
          </h3>
          <ul>{desc}</ul>
        </Panel>
        <Panel>
          <Molecule
            smiles="Cc1cccc2CC=Cc12"
            numbering={numbering}
            numbering_directions={numbering_directions}
            highlights={data.highlights}
          />
        </Panel>
        <Panel>
          <table>
            <tbody>
              <tr>
                <td>ancestors</td>
                <td>{data.ancestor}</td>
              </tr>
              <tr>
                <td>visited</td>
                <td>{data.visited}</td>
              </tr>
              {/* <tr style={{ color: "rgb(0, 255, 255)" }}> */}
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
            </tbody>
          </table>
        </Panel>
      </HorizontalLayout>
      <Separator />
    </div>
  );
}

function CellBuildSMILES(props) {
  const { data, step } = props;
  const numbering = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbering_directions = {
    "1": "E",
    "3": "N",
    "4": "N",
    "5": "NW",
    "6": "NW",
    "7": "W"
  };
  const desc = (data.desc ? data.desc : []).map((d) => <li>{d}</li>);
  return (
    <div>
      <HorizontalLayout mockup>
        <Panel>
          <h3>
            Step {step} {data.title}
          </h3>
          <ul>{desc}</ul>
        </Panel>
        <Panel>
          <Molecule
            smiles="Cc1cccc2CC=Cc12"
            numbering={numbering}
            numbering_directions={numbering_directions}
            highlights={data.highlights}
          />
        </Panel>
        <Panel>
          <table>
            <tbody>
              <tr>
                <td>visited</td>
                <td>{data.visited}</td>
              </tr>
              <tr>
                <td>digit heap</td>
                <td>{data.digit_heap}</td>
              </tr>

              <tr>
                <td>seq</td>
                <td>{data.seq}</td>
              </tr>

              <tr>
                <td>closingClosures</td>
                <td>{data.closingClosures}</td>
              </tr>
              <tr>
                <td>openingClosures</td>
                <td>{"{1: [9], 5: [9]}"}</td>
              </tr>
              {/* <tr style={{ color: "rgb(0, 255, 255)" }}> */}
              <tr>
                <td>nbors</td>
                <td>{data.nbors}</td>
              </tr>
              <tr>
                <td>branches</td>
                <td>{data.branches}</td>
              </tr>
            </tbody>
          </table>
        </Panel>
      </HorizontalLayout>
      <Separator />
    </div>
  );
}

export default function Smiles() {
  const [showGetClosure, setShowGetClosure] = React.useState(true);
  const onClickShowGetClosure = () => setShowGetClosure(!showGetClosure);
  const all_cells_get_closure = all_data_get_closure.map((data, idx) => (
    <CellGetClosure key={idx + 1} data={data} step={idx + 1} />
  ));
  const [showBuildSMILES, setShowBuildSMILES] = React.useState(true);
  const onClickShowBuildSMILES = () => setShowBuildSMILES(!showBuildSMILES);
  const all_cells_build_smiles = all_data_build_smiles.map((data, idx) => (
    <CellBuildSMILES key={idx + 1} data={data} step={idx + 1} />
  ));

  return (
    <div>
      <h1>A Two Pass Algorithm of Building SMILES for Molecular Structures</h1>
      <h2>The Recursive Process of "Get Closure"</h2>
      <button
        onClick={onClickShowGetClosure}
        title="click to show/hide content"
      >
        get_closure(current_atom, parent_atom)
      </button>
      {showGetClosure ? (
        <VerticalLayout>{all_cells_get_closure}</VerticalLayout>
      ) : null}
      <h2>The Recursive Process of "Build SMILES"</h2>
      <button
        onClick={onClickShowBuildSMILES}
        title="click to show/hide content"
      >
        build_smiles(current_atom, parent_atom)
      </button>
      {showBuildSMILES ? (
        <VerticalLayout>{all_cells_build_smiles}</VerticalLayout>
      ) : null}
    </div>
  );
}

// class SmilesBackup extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       getClosureIndex: 0
//     };
//   }

//   render() {
//     const atom_color = "rgba(0, 255, 0, 0.5)";
//     const neighbour_color = "rgba(0, 255, 255, 0.5)";

//     // const all_cells = all_data.map((data) => <Cell data={data} />);

//     return (
//       <div>
//         <h1>Building Smiles</h1>
//         <CopyBlock
//           language="rust"
//           text={code_blocks.get_closures}
//           showLineNumbers={false}
//           theme={dracula}
//           wrapLines
//         />
//         <button
//           onClick={() =>
//             this.setState({
//               getClosureIndex:
//                 this.state.getClosureIndex - 1 < 0
//                   ? this.state.getClosureIndex - 1 + all_data.length
//                   : this.state.getClosureIndex - 1
//             })
//           }
//         >
//           Prev
//         </button>
//         <button
//           onClick={() =>
//             this.setState({
//               getClosureIndex:
//                 (this.state.getClosureIndex + 1) % all_data.length
//             })
//           }
//         >
//           Next
//         </button>
//         <Cell
//           data={all_data[this.state.getClosureIndex]}
//           index={this.state.getClosureIndex + 1}
//         />
//       </div>
//     );
//   }
// }
