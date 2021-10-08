import React, { FC, useEffect, useState } from "react";
import Browser, { Downloads } from "webextension-polyfill";
import { Download } from "@src/components";
import { enterKeyFilter } from "@src/utils";

import "./download-list.css";

const DownloadList: FC = () => {
  const [stateDownloads, setStateDownloads] =
    useState<Array<Downloads.DownloadItem>>();

  useEffect(() => {
    async function init() {
      await getDownloads();
    }

    init();
  }, []);

  // Load downloads from browser.
  // Only completed downloads will be retrieved.
  const getDownloads = async () => {
    const downloads = await Browser.downloads.search({
      exists: true,
      state: "complete",
      orderBy: ["-startTime"],
    });

    if (downloads) {
      setStateDownloads(downloads);
    }
  };

  const removeDownload = (id: number) => {
    Browser.downloads
      .erase({ id: id })
      .then(() => setStateDownloads(stateDownloads.filter((v) => v.id !== id)));
  };

  const removeAllDownloads = () => {
    Browser.downloads
      .erase({ state: "complete" })
      .then(() => setStateDownloads([]));
  };

  const openDownloadFolder = (id: number) => {
    Browser.downloads.show(id);
  };

  const downloads = stateDownloads?.map((download) => (
    <Download
      key={download.id}
      {...download}
      remove={removeDownload}
      show={openDownloadFolder}
    />
  ));

  return (
    <div className="download-list">
      {!downloads?.length && (
        <div id="no-downloads">
          <span>Empty</span>
        </div>
      )}

      <div id="downloads">{downloads}</div>

      {downloads?.length > 0 && (
        <div
          id="clr-button-wrapper"
          onClick={(e) => enterKeyFilter(e, () => removeAllDownloads())}
          onKeyDown={(e) => enterKeyFilter(e, () => removeAllDownloads())}
        >
          <button id="clr-button">Clear All</button>
        </div>
      )}
    </div>
  );
};

export default DownloadList;
