/*global chrome*/
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [downloadItems, setDownloadItems] = useState([]);

  // Similar to componentDidMount
  useEffect(() => {
    chrome.downloads.search({ exists: true, state: "complete", orderBy: ['-startTime'] }, function (res) {
      for (let i = 0; i < res.length; i++) {
        (function (index, download) {
          chrome.downloads.getFileIcon(index, function (iconURL) {
            setDownloadItems(state => [...state, { ...download, icon: iconURL }]);
          });
        })(res[i].id, res[i])
      }
    });
  }, []);

  function openFile(e, downloadId) {
    e.preventDefault();
    chrome.downloads.open(downloadId);
  }

  function removeDownload(e, downloadId) {
    e.preventDefault();
    chrome.downloads.erase({ id: downloadId }, function (erasedId) {
      let d = downloadItems.filter((value, index) => value.id !== downloadId);
      setDownloadItems([...d]);
    });
  }

  function showFileFolder(e, download) {
    e.preventDefault();
    chrome.downloads.show(download);
  }

  return (
    <div className="App">
      {downloadItems.length > 0 ? (
        <ul className="nice-list p-0">
          {downloadItems.map((item) => {
            return (
              <li className="nice-list-item">
                <table>
                  <tr>
                    <th style={{ width: '40px' }}></th>
                    <th></th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <img src={item.icon} alt="" />
                    </td>
                    <td>
                      <div className="list-main-content d-flex justify-content-between">
                        <div className="list-content">
                          <h6 className="m-0">
                            <a href={item.url} className="truncate"
                              onClick={e => openFile(e, item.id)}>{item.filename.replace(/^.*[\\\/]/, '')}</a>
                          </h6>
                          <p className="truncate smallp mb-1">{item.filename}</p>
                        </div>
                      </div>
                      <div>
                        <p className="smallp mb-1">{item.fileSize / 1000} KB</p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column align-items-center justify-content-between">
                        <button type="button" className="btn btn-small-custom" onClick={e => showFileFolder(e, item.id)} title="Show on folder">
                          <span role="img" aria-label="Show">👁</span>
                        </button>
                        <button type="button" className="btn btn-small-custom" onClick={e => removeDownload(e, item.id)} title="Remove">
                          <span role="img" aria-label="Remove">❌</span>
                        </button>  
                      </div>                  
                    </td>
                  </tr>
                </table>
              </li>
            );
          })}
        </ul>
      ) : (<h3>There are no downloads.</h3>)}
    </div>
  );
}

export default App;
