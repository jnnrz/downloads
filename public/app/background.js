/* global chrome */

function main() {
  /*chrome.runtime.onInstalled.addListener(function () {
    chrome.bookmarks.search("Bookmark for Later", function (res) {
      if (!(res.length > 0)) {
        // If main folder doesn't exist, create it
        chrome.bookmarks.create({ parentId: "2", title: "Bookmark for Later" }, function (res) {
          console.log(res.id);
          chrome.storage.local.set({ "bfl_folder_id": res.id }, function () {
            if (chrome.runtime.lastError) {
              alert("Oops... " + chrome.runtime.lastError.message);
            }
          })
        });
      } else {
        chrome.storage.local.set({ "bfl_folder_id": res[0].id });
      }
    });
  });

  // Create context menu
  chrome.contextMenus.create(
    {
      id: "bflcm",
      title: "Bookmark this site"
    },
    function () {
      if (chrome.runtime.lastError) {
        console.warn("Oops... " + chrome.runtime.lastError.message);
      }
    }
  )

  chrome.contextMenus.onClicked.addListener(function (info) {
    if (info.menuItemId === "bflcm") {
      chrome.tabs.getSelected(function (tab) {
        chrome.storage.local.get("bfl_folder_id", (data) => {
          chrome.bookmarks.create({
            parentId: data.bfl_folder_id,
            title: tab.title,
            url: tab.url
          });
        });
      });
    }
  });*/
}

main();