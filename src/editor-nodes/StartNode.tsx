import {Handle, Position} from "reactflow"
import {Paper} from "@mui/material";
import { styled } from "@mui/material/styles"

const PaperNode = styled(Paper)(({theme}) => ({
    width: 120,
    height: "fit-content",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: "#282828",
    color: "white"
}));

export default function StartNode() {
    return (
        <>
            <PaperNode elevation={2}>
                <label>Start</label>
                <Handle type="source" position={Position.Bottom} id="start"/>
            </PaperNode>
        </>
    )
}