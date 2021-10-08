import React, { FC } from "react";
import { DownloadList } from "@src/components";

import "./popup.css";

const Popup: FC = () => {
  return (
    <div id="popup">
      <DownloadList />
    </div>
  );
};

export default Popup;
