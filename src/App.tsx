import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./components/CustomNode";
const nodeTypes = {
  custom: CustomNode,
};
type node = {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  type?: string;
};
const initialNodes = [
  {
    id: "1",
    data: { label: "1" },
    type: "custom",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "2" },
    position: { x: 100, y: 100 },
    type: "custom",
  },
];
let id: number = 2;
const initialEdges = [{ id: "1-2", source: "1", target: "2" }];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const yPos = useRef(0);
  const addNode = useCallback(() => {
    yPos.current += 50;
    setNodes((els) => {
      console.log(els);
      id += 1;
      return [
        ...els,
        {
          id: id.toString(),
          position: { x: 100, y: yPos.current },
          data: { label: id },
          type: "custom",
        },
      ];
    });
  }, []);
  const addEdge = useCallback(({ source, target }) => {
    setEdges((els) => {
      console.log(source, target);
      return [
        ...els,
        {
          id: Math.random(),
          source,
          target,
        },
      ];
    });
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <>
      <div className="h-screen w-screen">
        <button onClick={addNode}>add Node</button>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          fitView
          nodeTypes={nodeTypes}
          onConnect={addEdge}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}

export default Flow;
