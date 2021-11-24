import HomeComponent from "./views/Home.js";
import CreateList from "./views/CreateList.js";
import List from "./views/List.js";
import ListItems from "./components/ListItems.js";
import ListErrorComponent from "./components/ListError.js";
import RouteErrorComponent from "./components/RouteError.js";

var idInput = null;
var idInputValue = null;
var itemInput = null;
var itemInputValue = null;

const IdWarningText = "Please enter an id";
const ItemWarningText = "Please enter an item";

// Routes
const routes = [
  { path: "/", component: HomeComponent },
  { path: "/create-list", component: CreateList },
  { path: "/list", component: List },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || "/";

const findComponentByPath = (reqPath) => {
  return routes.find((r) => r.path === reqPath) || undefined;
};

const onAddItemClick = () => {
  if (itemInputValue) {
    var list = JSON.parse(localStorage.getItem("ToDoList"));
    list.push(itemInputValue);
    localStorage.setItem("ToDoList", JSON.stringify(list));
    document.querySelector(".list").innerHTML = ListItems(list);
    itemInputValue = null;
    document.querySelector("#item-input").value = "";
    document.querySelector(".item-empty-warning").textContent = "";
  } else {
    document.querySelector(".item-empty-warning").textContent = ItemWarningText;
  }
  window.location.reload();
};

const router = () => {
  // Find the component based on the current path
  let path = parseLocation();
  //   console.log(path);

  // If there's no matching route, get the "Error" component
  const { component = RouteErrorComponent } = findComponentByPath(path) || {};
  //   console.log(component);

  // Render the components a/c to path in the "root" placeholder
  document.getElementById("root").innerHTML = component.render();

  if (path === "/create-list") {
    idInput = document.querySelector("#id-input");
    idInput.addEventListener("change", (event) => {
      idInputValue = event.target.value;
    });
    document.querySelector(".create-button").onclick = function () {
      if (idInputValue) {
        localStorage.setItem("listId", idInputValue);
        document.querySelector(".create-button").href = "#/list";
        idInputValue = null;
      } else {
        document.querySelector(".id-empty-warning").textContent = IdWarningText;
      }
    };
  } else if (path === "/list") {
    // Check if list id is present in local storage
    if (!localStorage.getItem("listId")) {
      // if id not present in localStorage, then render error component
      document.getElementById("root").innerHTML = ListErrorComponent.render();
    } else {
      // Render list
      document.getElementById("root").innerHTML = List.render();

      // Select item input element
      itemInput = document.querySelector("#item-input");

      // Adding event listener for item input element
      itemInput.addEventListener("change", (event) => {
        itemInputValue = event.target.value;
      });

      // If list already present in local storage, then display items otherwise add it
      let list = JSON.parse(localStorage.getItem("ToDoList"));
      if (list) {
        document.querySelector(".list").innerHTML = ListItems(list);
      } else {
        localStorage.setItem("ToDoList", JSON.stringify([]));
      }

      // Event listener to handle onclick event of add item button
      document
        .querySelector(".add-button")
        .addEventListener("click", onAddItemClick);

      // event listener to handle click event of list items
      var listItems = document.querySelectorAll(".list-item-text");
      for (let listItem of listItems) {
        listItem.addEventListener("click", (event) => {
          //   console.log("Event : ", event);
          let index = event.target.id.split("-").at(-1);
          let text = document.querySelector(`#list-item-text-${index}`);
          if (text) {
            if (text.style.color === "red") {
              text.style.color = "#40B8AD";
              text.style.textDecoration = "none";
            } else {
              text.style.color = "red";
              text.style.textDecoration = "line-through";
            }
          }
        });
      }

      // event listener to handle click event of edit icon
      //   var editIcons = document.querySelectorAll(".edit-icon");
      //   console.log("Edit Icons: ", editIcons);
      //   for (let editIcon of editIcons) {
      //     editIcon.addEventListener("click", (event) => {
      //       console.log("Event : ", event);
      //       let index = event.target.id.split("-").at(-1);
      //       console.log("Index: ", index);
      // 	  let text = document.querySelector(`#list-item-text-${index}`);

      //     });
      //   }

      // event listener to handle click event of delete item button
      var deleteButtons = document.querySelectorAll(".delete-icon");
      //   console.log("Delete buttons: ", deleteButtons);
      for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          let index = event.target.id.split("-").at(-1);
          //   console.log("Index: ", index, event.target.id);
          let list = JSON.parse(localStorage.getItem("ToDoList"));
          //   console.log("Before Splice List: ", list);
          list = list.reverse();
          list.splice(index, 1);
          list = list.reverse();
          //   console.log("After splice List: ", list);
          localStorage.setItem("ToDoList", JSON.stringify(list));
          document.querySelector(".list").innerHTML = ListItems(list);
          window.location.reload();
        });
      }
    }
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
