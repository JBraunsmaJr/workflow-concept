import React, {useCallback, useMemo, useRef} from 'react';
import ReactFlow, {
    addEdge,
    Background,
    BackgroundVariant,
    ConnectionLineType,
    Controls, ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import MiniDrawer, { EditorNodeButton } from "./SideNav"

import 'reactflow/dist/style.css';
import StartNode from "./editor-nodes/StartNode";
import TransitionToNode from "./editor-nodes/TransitionToNode";
import DataManagementNode from "./editor-nodes/DataManagementNode"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StartIcon from '@mui/icons-material/Start';
import LockIcon from '@mui/icons-material/Lock';


const initialNodes = [
    {
      id: '1',
      position: { x: 100, y: 100 },
      type: "startNode",
      data: {}
    }
];

export function generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const navButtons: EditorNodeButton[] = [
    {
        name: "Start",
        nodeId: "startNode",
        icon: <PlayArrowIcon/>,
        defaultData: { label: "" },
        onClick: (flow) =>{
            const viewport = flow.getViewport();
            flow.addNodes([
                {
                    id: generateGUID(),
                    position: { x: viewport.x, y: viewport.y},
                    type: "startNode",
                    data: { label: "" }
                }
            ]);
        }
    },
    {
        name: "Transition",
        nodeId: "transitionTo",
        icon: <StartIcon/>,
        defaultData: { workflowName: "" },
        onClick: (flow) => {
            const viewport = flow.getViewport();
            flow.addNodes([
                {
                    id: generateGUID(),
                    position: {x: viewport.x, y: viewport.y },
                    type: "transitionTo",
                    data: { label: "", workflowName: "" }
                }
            ])
        }
    },
    {
        name: "Data Management",
        nodeId: "dataManagement",
        icon: <LockIcon/>,
        defaultData: { label: "" }
    }
]


export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const reactFlowWrapper = useRef(null);
    const nodeTypes = useMemo(() => (
        {
            startNode: StartNode,
            transitionTo: TransitionToNode,
            dataManagement: DataManagementNode
        }
    ), []);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowProvider>
                <MiniDrawer nodeButtons={navButtons}/>
                    <ReactFlow
                        style={{
                            background: "#121212"
                        }}
                        connectionLineType={ConnectionLineType.Step}
                        nodeTypes={nodeTypes}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                    >
                        <Controls />
                        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                    </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}