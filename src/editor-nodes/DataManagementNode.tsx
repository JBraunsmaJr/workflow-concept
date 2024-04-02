import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";
import {Handle, Position} from "reactflow";
import LockIcon from '@mui/icons-material/Lock';


const PaperNode = styled(Paper)(({theme}) => ({
    width: "fit-content",
    height: "fit-content",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: "#282828",
    color: "white"
}));


export default function DataManagementNode() {
    return (
        <>
            <PaperNode elevation={2}>
                <LockIcon/>
                <Handle type="target" position={Position.Top}/>

                <Handle type="source" position={Position.Bottom}/>
            </PaperNode>
        </>
    )
}