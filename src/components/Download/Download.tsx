import React, { FC, ReactNode, useEffect, useState } from "react";
import Browser, { Downloads } from "webextension-polyfill";
import { enterKeyFilter, extractFileName, formatBytes } from "@src/utils";

import "./download.css";

import removeIcon from "@src/assets/images/remove.svg";
import folderIcon from "@src/assets/images/folder.svg";

interface Props extends Downloads.DownloadItem {
  children?: ReactNode;
  // finalUrl is not present in webextension-polyfill package
  // but it does exist on chromium's API.
  finalUrl?: string;
  remove: (id: number) => void;
  show: (id: number) => void;
}

const Download: FC<Props> = (props) => {
  const { filename, finalUrl, fileSize, id, remove, show } = props;
  const [fileIcon, setfileIcon] = useState<string>("");

  useEffect(() => {
    // Get the file icon for this download.
    async function getFileIcon() {
      const icon = await Browser.downloads.getFileIcon(id, { size: 32 });
      setfileIcon(icon);
    }
    getFileIcon();
  });

  const openFile = (id: number) => {
    Browser.downloads.open(id);
  };

  return (
    <div className="download">
      <div className="icon">
        <img src={fileIcon} />
      </div>
      <div className="main truncate">
        <div className="url truncate">
          <a className="truncate" href={finalUrl} onClick={() => openFile(id)}>
            {extractFileName(filename)}
          </a>
        </div>
        <div className="filename truncate">{filename}</div>
        <div className="size">{formatBytes(fileSize)}</div>
      </div>
      <div className="actions">
        <button
          tabIndex={0}
          onClick={(e) => enterKeyFilter(e, () => remove(id))}
          onKeyDown={(e) => enterKeyFilter(e, () => remove(id))}
        >
          <img src={removeIcon} alt="remove" />
        </button>
        <button
          tabIndex={0}
          onClick={(e) => enterKeyFilter(e, () => show(id))}
          onKeyDown={(e) => enterKeyFilter(e, () => show(id))}
        >
          <img src={folderIcon} alt="show" />
        </button>
      </div>
    </div>
  );
};

export default Download;
