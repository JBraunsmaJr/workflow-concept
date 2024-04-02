import {Handle, NodeProps, Position} from "reactflow";
import {useState} from "react";
import {Divider, Paper, Stack, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

export type TransitionToData = {
    workflowName?: string
};

const PaperNode = styled(Paper)(({theme}) => ({
    width: "fit-content",
    height: "fit-content",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: "#282828",
    color: "white"
}));

export default function TransitionToNode(props: NodeProps<TransitionToData>) {
    const [workflowName, setWorkflowName] = useState(props.data?.workflowName ?? '');

    return (
        <>
            <PaperNode elevation={2}>
                <Handle type="target" position={Position.Top}/>
                <Stack>
                    <Typography color="primary" variant="h5">
                        Transition To
                    </Typography>
                    <Divider style={{ marginBottom: "12px" }}/>
                    <TextField label="Workflow Name" value={workflowName}
                               color={"primary"}
                               onChange={(event) => setWorkflowName(event.target.value)}/>
                </Stack>
            </PaperNode>
        </>
    )
}