/*global chrome*/
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
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

  const openFile = (e, downloadId) => {
    e.preventDefault();
    chrome.downloads.open(downloadId);
  }

  const removeDownload = (e, downloadId) => {
    e.preventDefault();
    chrome.downloads.erase({ id: downloadId }, function (erasedId) {
      alert("Download #" + erasedId + " has been erased");
    });
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
                  </tr>
                  <tr>
                    <td className="p-2">
                      <img src={item.icon} />
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
                        <div class="btn-group dropleft btn-menu">
                          <button type="button btn-sm" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">menu</button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" onClick={e => removeDownload(e, item.id)}>Remove from list</a>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="smallp mb-1">{item.fileSize / 1000} KB</p>
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
