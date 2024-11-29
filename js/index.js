var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkURL");
var siteList = [];
var localStorgeName = "siteList";

if (localStorage.getItem(localStorgeName) !== null) {
  siteList = JSON.parse(localStorage.getItem(localStorgeName));
  display(siteList);
}

function clearinputs() {
  siteName.value = null;
  siteUrl.value = null;
  bookmarkName.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-valid");
  bookmarkName.classList.remove("is-invalid");
  bookmarkURL.classList.remove("is-invalid");
}
function closeBoxRules() {
  boxRules.classList.add("d-none");
}
function addSite() {
  if (validateBookmark(siteName) && validateBookmark(siteUrl)) {
    var site = {
      id: siteList.length,
      name: siteName.value,
      url: siteUrl.value,
    };
    siteList.push(site);
    updateLocalStorge();
    display(siteList);
    clearinputs();
  } else {
    boxRules.classList.remove("d-none");
  }
}

function updateLocalStorge() {
  localStorage.setItem(localStorgeName, JSON.stringify(siteList));
}
function display(list) {
  var box = ``;
  for (var i = 0; i < list.length; i++) {
    box += `<tr>
                <td>${list[i].id} </td>
                <td>${list[i].name}</td>
                <td>
                  <!-- <a href="${list[i].url}" target="_blank"> --> 
                  <button class="btn btn-visit" onclick="visitSite('${list[i].url}')" data-index="0">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" onclick="deleteSite(${list[i].id})" data-index="0">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
              </tr>`;
  }
  document.getElementById("tableContent").innerHTML = box;
}

function visitSite(url) {
  if (url) {
    window.open(url, "_blank");
  } else {
    console.error("URL is invalid or missing.");
  }
}

function deleteSite(id) {
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].id == id) {
      siteList.splice(i, 1);
    }
  }
  updateLocalStorge();
  display(siteList);
}

function validateBookmark(element) {
  var regex = {
    bookmarkName: /^\w{3,}(\s+\w+)*$/,
    bookmarkURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };

  var isValid = true;

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    isValid = false;
  }

  if (element.id === "bookmarkName") {
    for (var i = 0; i < siteList.length; i++) {
      if (siteList[i].name.toLowerCase() === element.value.toLowerCase()) {
        isValid = false;

        break;
      }
    }
  }

  return isValid;
}
