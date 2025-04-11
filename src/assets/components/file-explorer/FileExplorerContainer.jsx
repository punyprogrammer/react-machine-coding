import React from "react";
import FileExplorer from "./FileExplorer";
import { folderData } from "./data";

export default function FileExplorerContainer() {
  return (
    <div>
      <FileExplorer data={folderData} />
    </div>
  );
}
