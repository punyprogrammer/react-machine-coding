import React, { useState } from "react";
import "./styles.css";

export default function FileExplorer({ data }) {
  const [explorerState, setExplorerState] = useState({ data });
  const [inputValue, setInputValue] = useState("");

  const handleOnExpand = (path) => {
    const exploredStateClone = structuredClone(explorerState);
    const toggleExpand = (nodes, currentPath) => {
      for (let node of nodes) {
        const nodePath = `${currentPath}/${node.name}`;
        if (nodePath === path) {
          node.isExpanded = !node.isExpanded;
          return;
        }
        if (node.children) {
          toggleExpand(node.children, nodePath);
        }
      }
    };
    toggleExpand(exploredStateClone.data, "");
    setExplorerState(exploredStateClone);
  };

  const handleAddNewNode = (path, nodeType) => {
    const exploredStateClone = structuredClone(explorerState);
    const addNode = (nodes, currentPath) => {
      for (let node of nodes) {
        const nodePath = `${currentPath}/${node.name}`;
        if (nodePath === path) {
          node.isExpanded = true;
          node.children = node.children || [];
          node.children = [
            {
              id: Date.now().toString(),
              name: "",
              type: "input",
              nodeType: nodeType,
            },
            ...node.children,
          ];
          return;
        }
        if (node.children) {
          addNode(node.children, nodePath);
        }
      }
    };
    addNode(exploredStateClone.data, "");
    setExplorerState(exploredStateClone);
  };

  const handleDeleteNode = (path) => {
    const exploredStateClone = structuredClone(explorerState);
    const deleteNode = (nodes, currentPath) => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nodePath = `${currentPath}/${node.name}`;
        if (nodePath === path) {
          nodes.splice(i, 1); // delete this node
          return true;
        }
        if (node.children) {
          const deleted = deleteNode(node.children, nodePath);
          if (deleted) return true;
        }
      }
      return false;
    };
    deleteNode(exploredStateClone.data, "");
    setExplorerState(exploredStateClone);
  };

  const handleInputSubmit = (item, parentPath) => {
    if (!inputValue.trim()) return;

    const exploredStateClone = structuredClone(explorerState);
    const updateNodeName = (nodes, currentPath) => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nodePath = `${currentPath}/${node.name}`;
        if (node.type === "input" && node.id === item.id) {
          nodes[i] = {
            id: Date.now().toString(),
            name: inputValue,
            type: item.nodeType,
            children: item.nodeType === "folder" ? [] : undefined,
          };
          return;
        }
        if (node.children) {
          updateNodeName(node.children, nodePath);
        }
      }
    };

    updateNodeName(exploredStateClone.data, "");
    setExplorerState(exploredStateClone);
    setInputValue("");
  };

  return (
    <div className="explorer">
      <TreeNode
        data={explorerState.data}
        path=""
        handleOnExpand={handleOnExpand}
        handleAddNewNode={handleAddNewNode}
        handleDeleteNode={handleDeleteNode}
        handleInputSubmit={handleInputSubmit}
        setInputValue={setInputValue}
        inputValue={inputValue}
      />
    </div>
  );
}

function TreeNode({
  data,
  path,
  handleOnExpand,
  handleAddNewNode,
  handleDeleteNode,
  handleInputSubmit,
  setInputValue,
  inputValue,
}) {
  return (
    <div>
      {data?.map((item) => {
        const localPath = path + `/${item.name}`;
        const isFolder = item.type === "folder";
        const isInput = item.type === "input";

        return (
          <div key={item.id} className="file-item">
            {!isInput ? (
              <>
                <div
                  className="file-header"
                  onClick={() => isFolder && handleOnExpand(localPath)}
                >
                  <span className="file-icon">{isFolder ? "📁" : "📄"}</span>
                  <span className="file-name">{item.name}</span>
                  <span
                    className="file-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(localPath);
                    }}
                  >
                    🗑️
                  </span>
                  {isFolder && (
                    <span className="folder-control">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddNewNode(localPath, "file");
                        }}
                      >
                        📄➕
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddNewNode(localPath, "folder");
                        }}
                      >
                        📂➕
                      </span>
                    </span>
                  )}
                </div>
                {item.isExpanded && item.children && (
                  <div style={{ paddingLeft: 20 }}>
                    <TreeNode
                      data={item.children}
                      path={localPath}
                      handleOnExpand={handleOnExpand}
                      handleAddNewNode={handleAddNewNode}
                      handleDeleteNode={handleDeleteNode}
                      handleInputSubmit={handleInputSubmit}
                      setInputValue={setInputValue}
                      inputValue={inputValue}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="file-input">
                <input
                  type="text"
                  placeholder={`Enter ${item.nodeType} name`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={() => handleInputSubmit(item, path)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputSubmit(item, path);
                  }}
                  autoFocus
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
