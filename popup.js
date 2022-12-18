var currentTransElem = document.querySelector(".current-trans");
chrome.storage.local.get(["trans_val"], (value) => {
  if (value.trans_val != undefined) {
    currentTransElem.textContent = value.trans_val;
  }
});
chrome.storage.local.get(["trans_sharp"], (value) => {
  if (value.trans_sharp != undefined) {
    if (value.trans_sharp) {
      document.querySelector(".btn-yes").classList.add("btn-selected");
    } else {
      document.querySelector(".btn-no").classList.add("btn-selected");
    }
  } else {
    chrome.storage.local.set({ trans_sharp: true });
    document.querySelector(".btn-yes").classList.add("btn-selected");
  }
});
document.querySelector(".btn-plus").addEventListener("click", () => {
  if (parseInt(currentTransElem.textContent) < 11) {
    var temp = parseInt(currentTransElem.textContent);
    var val = parseInt(temp + 1);
    currentTransElem.textContent = val;
    chrome.storage.local.set({ trans_val: val });
  }
});
document.querySelector(".btn-minus").addEventListener("click", () => {
  if (parseInt(currentTransElem.textContent) > -11) {
    var temp = parseInt(currentTransElem.textContent);
    var val = parseInt(temp - 1);
    currentTransElem.textContent = val;
    chrome.storage.local.set({ trans_val: val });
  }
});
document.querySelector(".btn-yes").addEventListener("click", () => {
  chrome.storage.local.set({ trans_sharp: true });
  if (document.querySelector(".btn-no").classList.contains("btn-selected")) {
    document.querySelector(".btn-no").classList.remove("btn-selected");
  }
  if (!document.querySelector(".btn-yes").classList.contains("btn-selected")) {
    document.querySelector(".btn-yes").classList.add("btn-selected");
  }
});
document.querySelector(".btn-no").addEventListener("click", () => {
  chrome.storage.local.set({ trans_sharp: false });
  if (document.querySelector(".btn-yes").classList.contains("btn-selected")) {
    document.querySelector(".btn-yes").classList.remove("btn-selected");
  }
  if (!document.querySelector(".btn-no").classList.contains("btn-selected")) {
    document.querySelector(".btn-no").classList.add("btn-selected");
  }
});
