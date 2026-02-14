import React from 'react';
import ReactFlow, { Background, Controls, Edge, Handle, MarkerType, Node, Position } from 'reactflow';
import 'reactflow/dist/style.css';

type NodeKind = 'organization' | 'bot' | 'proposal';

type GraphNodeData = {
  kind: NodeKind;
  label: string;
  owner?: string;
  goal?: string;
  summary?: string;
};

const kindStyles: Record<NodeKind, string> = {
  organization: 'bg-gradient-to-br from-[#123B7A] to-[#0F2A56] border-[#5E8FE8] text-white rounded-2xl',
  bot: 'bg-gradient-to-br from-[#145B66] to-[#0F3B47] border-[#33E0DB] text-white rounded-xl',
  proposal: 'bg-gradient-to-br from-[#F7FAFF] to-[#EAF2FF] border-[#5E8FE8] text-[#102A52] rounded-xl',
};

const kindTitles: Record<NodeKind, string> = {
  organization: 'Organization',
  bot: 'Bot',
  proposal: 'Proposal',
};

const GraphNode: React.FC<{ data: GraphNodeData }> = ({ data }) => {
  const hoverText =
    data.kind === 'organization'
      ? `Organization: ${data.label}`
      : data.kind === 'bot'
        ? `Owner: ${data.owner}\nGoal: ${data.goal}`
        : `Proposal: ${data.label}\nSummary: ${data.summary}`;

  return (
    <div
      title={hoverText}
      className={`w-[230px] border-2 px-4 py-3 shadow-[0_10px_30px_rgba(7,16,38,0.3)] backdrop-blur-sm ${kindStyles[data.kind]}`}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-[#9CC0FF]" />
      <p className="text-[10px] uppercase tracking-[0.14em] opacity-80">{kindTitles[data.kind]}</p>
      <p className="text-sm font-semibold mt-1 leading-tight">{data.label}</p>
      {data.kind === 'bot' && data.owner && <p className="text-xs mt-1 opacity-90">Owner: {data.owner}</p>}
      {data.kind === 'proposal' && data.summary && <p className="text-xs mt-1 line-clamp-2">{data.summary}</p>}
      {data.kind === 'bot' ? (
        <>
          <Handle id="left" type="source" position={Position.Left} className="!w-2 !h-2 !bg-[#9CC0FF]" />
          <Handle id="right" type="source" position={Position.Right} className="!w-2 !h-2 !bg-[#9CC0FF]" />
          <Handle id="bottom" type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-[#9CC0FF]" />
        </>
      ) : (
        <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-[#9CC0FF]" />
      )}
    </div>
  );
};

const nodeTypes = {
  organization: GraphNode,
  bot: GraphNode,
  proposal: GraphNode,
};

const nodes: Node<GraphNodeData>[] = [
  { id: 'org-usgov', type: 'organization', position: { x: 110, y: 30 }, data: { kind: 'organization', label: 'US Government' } },
  { id: 'org-palantir', type: 'organization', position: { x: 430, y: 30 }, data: { kind: 'organization', label: 'Palantir' } },
  { id: 'org-anduril', type: 'organization', position: { x: 750, y: 30 }, data: { kind: 'organization', label: 'Anduril' } },

  { id: 'bot-usgov', type: 'bot', position: { x: 110, y: 250 }, data: { kind: 'bot', label: 'Mission Procurement', owner: 'Avery Johnson', goal: 'Find trusted mission-ready suppliers faster.' } },
  { id: 'bot-palantir', type: 'bot', position: { x: 430, y: 250 }, data: { kind: 'bot', label: 'Secure Integration', owner: 'Daniel Lee', goal: 'Match with agencies needing secure data integrations.' } },
  { id: 'bot-anduril', type: 'bot', position: { x: 750, y: 250 }, data: { kind: 'bot', label: 'Autonomy Alliance', owner: 'Sofia Patel', goal: 'Identify strategic collaborations for autonomous systems.' } },

  { id: 'proposal-data-pilot', type: 'proposal', position: { x: 250, y: 500 }, data: { kind: 'proposal', label: 'Secure Data Pilot', summary: 'Federal-ready integration pilot for intelligence workflows.' } },
  { id: 'proposal-autonomy', type: 'proposal', position: { x: 610, y: 500 }, data: { kind: 'proposal', label: 'Autonomy Collaboration', summary: 'Joint mission-evaluation proposal with phased deployment steps.' } },
];

const edgeBase = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed, color: '#79A7FF' },
  style: { stroke: '#79A7FF', strokeWidth: 2.2 },
};

const edges: Edge[] = [
  { id: 'e1', source: 'org-usgov', target: 'bot-usgov', ...edgeBase },
  { id: 'e2', source: 'org-palantir', target: 'bot-palantir', ...edgeBase },
  { id: 'e3', source: 'org-anduril', target: 'bot-anduril', ...edgeBase },

  { id: 'e4', source: 'bot-usgov', sourceHandle: 'right', target: 'proposal-data-pilot', ...edgeBase },
  { id: 'e5', source: 'bot-palantir', sourceHandle: 'left', target: 'proposal-data-pilot', ...edgeBase },

  { id: 'e6', source: 'bot-palantir', sourceHandle: 'right', target: 'proposal-autonomy', ...edgeBase },
  { id: 'e7', source: 'bot-anduril', target: 'proposal-autonomy', ...edgeBase },
];

const BotNetworkGraph: React.FC = () => {
  return (
    <div className="h-[680px] w-full rounded-2xl border border-[#2D4575] bg-[radial-gradient(circle_at_top,#183A74_0%,#0F2247_45%,#0C1B38_100%)] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        zoomOnScroll={false}
        panOnDrag={true}
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#3A5F99" gap={20} size={1} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
};

export default BotNetworkGraph;
