var names = [];
const list = document.getElementById("list");
var input = document.getElementById("inputitem");
var currentEditIndex = -1;
var addButton = document.getElementById("add-button");

// better way
function clearAll(){
    names = []
    render();
}

function load() {
  let storeObject = JSON.parse(localStorage.getItem("namelist"));
  names = storeObject?.names || [];
  render();
}

function store() {
  let storeObject = {
    names: names,
  };
  localStorage.setItem("namelist", JSON.stringify(storeObject));
}

function add() {
  if (currentEditIndex === -1) {
    names.push(input.value);
  } else {
    names[currentEditIndex] = input.value;
    currentEditIndex = -1;
    addButton.innerText = "Add";
  }
  render();
}

function remove(idx) {
  names = names.filter((value, index) => {
    return index != idx;
  });
  render();
}

function render() {
  store();
  // to remove all existing elements before re-render
  list.innerHTML = "";
  // put all the names in list
  names.forEach((name, index) => {
    var listItem = document.createElement("li");
    var textnode = document.createTextNode(name);
    // create button
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute('class','btn btn-danger mx-2')

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute('class','btn btn-info mx-2')

    deleteButton.addEventListener("click", () => {
      remove(index);
    });

    editButton.addEventListener("click", () => {
      input.value = name;
      currentEditIndex = index;
      addButton.innerText = "Edit";
    });

    listItem.appendChild(textnode);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.setAttribute('class', 'p-2')
    list.appendChild(listItem);
  });
}

load();
