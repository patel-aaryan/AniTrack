"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

// Dynamically import the ForceGraph component to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
})

function getOrdinalSuffix(num: number): string {
  const j = num % 10
  const k = num % 100

  if (j === 1 && k !== 11) {
    return num + "st"
  }
  if (j === 2 && k !== 12) {
    return num + "nd"
  }
  if (j === 3 && k !== 13) {
    return num + "rd"
  }
  return num + "th"
}

// Function specifically for "degree" format
function toDegreeString(num: number): string {
  return getOrdinalSuffix(num) + " degree"
}

// Define types for the graph data
interface GraphNode {
  id: string
  name: string
  color: string
  degree: number
  size: number
}

interface GraphLink {
  source: string
  target: string
  value: number
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

// Define the ForceGraphNode type based on the library's expected interface
interface ForceGraphNode {
  id?: string | number
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number
  fy?: number
  // Replace [key: string]: any with specific properties we need
  name?: string
  color?: string
  degree?: number
  size?: number
}

export function FriendGraph({
  friendDistances,
  rawConnections,
  userId,
  userName,
}: {
  friendDistances: { id: string; name: string; degree: number }[]
  rawConnections: { user_id1: string; user_id2: string }[]
  userId: string
  userName: string
}) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 300 })
  const [processedData, setProcessedData] = useState<GraphData>({
    nodes: [],
    links: [],
  })

  // Process raw connection data into graph format
  useEffect(() => {
    if (!rawConnections?.length || !friendDistances?.length) {
      setProcessedData({ nodes: [], links: [] })
      return
    }

    const nodeMap = new Map<string, GraphNode>()
    const links: GraphLink[] = []

    // Add current user - ensure ID is string
    const userIdStr = String(userId)

    // Add current user
    nodeMap.set(userIdStr, {
      id: userIdStr,
      name: userName,
      color: "#f44336", // Red for current user
      degree: 0,
      size: 4, // Current user is larger
    })

    // Add all users from friend distances
    friendDistances.forEach((friend) => {
      const friendIdStr = String(friend.id)
      if (!nodeMap.has(friendIdStr)) {
        nodeMap.set(friendIdStr, {
          id: friendIdStr,
          name: friend.name,
          color: "#607d8b",
          degree: friend.degree,
          size: 2,
        })
      }
    })

    // Process each connection for links
    rawConnections.forEach((conn) => {
      const id1Str = String(conn.user_id1)
      const id2Str = String(conn.user_id2)

      // Only add links where we have both nodes
      if (nodeMap.has(id1Str) && nodeMap.has(id2Str)) {
        const node1 = nodeMap.get(id1Str)!
        const node2 = nodeMap.get(id2Str)!

        // Calculate link strength based on the degree
        // Use the minimum degree of the two nodes for the link value
        const minDegree = Math.min(node1.degree, node2.degree)
        const linkValue = Math.max(1, 5 - minDegree)

        links.push({
          source: id1Str,
          target: id2Str,
          value: linkValue,
        })
      }
    })

    setProcessedData({
      nodes: Array.from(nodeMap.values()),
      links,
    })
  }, [rawConnections, friendDistances, userId, userName])

  // Resize effect
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: 300,
      })
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: 300,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update your handleNodeClick function to remove unused parameter
  const handleNodeClick = (node: ForceGraphNode) => {
    // Don't navigate if clicking the current user
    if (node.id !== userId) {
      router.push(`/user/${node.id}`)
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      {dimensions.width > 0 && processedData.nodes.length > 0 ? (
        <ForceGraph2D
          graphData={processedData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel={(node) => node.name + " - " + toDegreeString(node.degree)}
          nodeRelSize={6}
          nodeVal={(node) => node.size}
          nodeColor={(node) => node.color}
          linkWidth={(link) => link.value * 0.5}
          linkColor={() => "#999"}
          onNodeClick={handleNodeClick}
          cooldownTicks={100}
          onEngineStop={() => {
            /* Fixed position after simulation */
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          {!rawConnections?.length || !friendDistances?.length ? (
            <p>No friend connections found</p>
          ) : (
            <p>Loading friend graph...</p>
          )}
        </div>
      )}
    </div>
  )
}
