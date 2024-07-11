import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data }) => {
  return (
    <div className="">
      <div className="p-5 rounded-[50%] border border-black">
        <div className="">{data.label}</div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="p-2 rounded-[50%] !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="p-2 rounded-[50%] !bg-teal-500"
      />
    </div>
  );
};

export default memo(CustomNode);
