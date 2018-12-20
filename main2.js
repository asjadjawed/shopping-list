// Simple Logic without persistent storage

const userInput = document.getElementById("userInput");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");

const addDeleteParentButton = () => {
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&otimes;";
  deleteButton.addEventListener("click", () => {
    deleteButton.parentElement.parentElement.removeChild(
      deleteButton.parentElement
    );
  });
  return deleteButton;
};

const addItem = () => {
  if (userInput.value) {
    let newItem = document.createElement("li");
    newItem.appendChild(addDeleteParentButton());
    newItem.appendChild(document.createTextNode(userInput.value));
    newItem.addEventListener("click", () => {
      newItem.classList.toggle("done");
    });
    shoppingList.appendChild(newItem);
    userInput.value = "";
  }
};

addButton.addEventListener("click", addItem);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addItem();
  }
});

userInput.value = "Top Hat";
addItem();
userInput.value = "Walking Stick";
addItem();
userInput.value = "Cards";
addItem();

userInput.focus();
