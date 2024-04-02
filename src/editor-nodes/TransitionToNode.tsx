import {Handle, NodeProps, Position} from "reactflow";
import {useState} from "react";
import {TextField} from "@mui/material";

export type TransitionToData = {
    workflowName?: string
};

export default function TransitionToNode(props: NodeProps<TransitionToData>) {
    const [workflowName, setWorkflowName] = useState(props.data?.workflowName ?? '');

    return (
        <div style={{ width: "200px", height: "125px" }}>
            <Handle type="target" position={Position.Top}/>
            <TextField label="Workflow Name" value={workflowName}
                       onChange={(event)=>setWorkflowName(event.target.value)}/>
        </div>
    )
}