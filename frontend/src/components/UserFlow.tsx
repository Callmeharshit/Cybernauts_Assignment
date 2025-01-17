import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Edge,
  Node,
  Connection,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import axios from 'axios';

interface UserNodeData {
  label: string;
}

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const UserFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    axios
      .get<User[]>('http://localhost:5000/api/users')
      .then((response) => {
        const users = response.data;
        const userNodes = users.map((user, index) => ({
          id: user.id,
          position: { x: 100 * index, y: 100 },
          data: { label: `${user.username} (Age: ${user.age})` },
          type: 'default',
        }));

        setNodes(userNodes);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [setNodes]);

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      console.log('Node drag stopped:', node);
    },
    []
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const hobby = event.dataTransfer.getData('hobby');
      const nodeId = event.dataTransfer.getData('nodeId');
      if (!hobby || !nodeId) return;

      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: `${node.data.label}, Hobby: ${hobby}`,
                },
              }
            : node
        )
      );
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div
      style={{ width: '100%', height: '100vh' }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        fitView
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default UserFlow;
