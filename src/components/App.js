/*global chrome*/
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [downloadItems, setDownloadItems] = useState([]);

  // Similar to componentDidMount
  useEffect(() => {
    chrome.downloads.search({ exists: true, state: "complete", orderBy: ['-startTime'] }, function (res) {
      setDownloadItems([...res]);
    });
  });

  const openFile = (e, downloadId) => {
    e.preventDefault();
    chrome.downloads.open(downloadId);
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
                    <th style={{ width: '100px' }}></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <div className="list-main-content d-flex justify-content-between">
                        <div>
                          <h6 className="m-0">
                            <a href={item.url}
                              onClick={e => openFile(e, item.id)}>{item.filename.replace(/^.*[\\\/]/, '')}</a>
                          </h6>
                          <p className="smallp mb-1">{item.filename}</p>
                        </div>
                        <div class="btn-group dropleft btn-menu">
                          <button type="button btn-sm" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">menu</button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Action</a>
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
