const userInput = document.getElementById("userInput");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");

class MainList {
  constructor() {
    this.content = [];
  }

  addItem(task) {
    this.content.push(task);
    this.taskSave();

    if (task.done) {
      task.listItem.className = "done";
    }

    task.listItem.addEventListener("click", () => {
      task.done = !task.done;
      task.listItem.classList.toggle("done");
      this.taskSave();
    });

    task.deleteListItem.addEventListener("click", e => {
      e.stopPropagation();
      task.deleteListItem.parentElement.parentElement.removeChild(
        task.deleteListItem.parentElement
      );
      this.content = this.content.filter(t => t !== task);
      this.taskSave();
    });

    shoppingList.appendChild(task.listItem);
    userInput.value = "";
    userInput.focus();
  }

  taskSave() {
    localStorage.setItem("content", JSON.stringify(this.content));
  }
}

class Task {
  constructor(value, done = false) {
    this.value = value;
    this.done = done;
    this.listItem = document.createElement("li");
    this.deleteListItem = document.createElement("button");
    this.listItemTextNode = document.createTextNode(this.value);

    this.deleteListItem.innerHTML = "&otimes;";
    this.listItem.appendChild(this.deleteListItem);
    this.listItem.appendChild(this.listItemTextNode);
  }
}

const mainList = new MainList();

if (!localStorage.getItem("content")) {
  mainList.taskSave();
}

if (mainList.content) {
  const data = JSON.parse(localStorage.getItem("content"));
  data.forEach(t => {
    mainList.addItem(new Task(t.value, t.done.valueOf()));
  });
}

addButton.addEventListener("click", () => {
  if (userInput.value) {
    mainList.addItem(new Task(userInput.value));
  }
});

userInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && userInput.value) {
    mainList.addItem(new Task(userInput.value));
  }
});

userInput.focus();

if (localStorage.getItem("content").length === 2) {
  mainList.addItem(new Task("Cards"));
  mainList.addItem(new Task("Top Hat", true));
  mainList.addItem(new Task("Bunny"));
}
