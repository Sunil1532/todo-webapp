const form = document.getElementById("todo-form");
const titleInput = document.getElementById("title");
const list = document.getElementById("todo-list");
const searchInput = document.getElementById("search");
const sortBtn = document.getElementById("sort-btn");
const emptyMsg = document.getElementById("empty-message");

let todos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return alert("Title cannot be empty!");
  
  todos.push({
    title: title,
    date: new Date().toLocaleDateString(),
  });

  titleInput.value = "";
  renderList();
});

function renderList(filtered = todos) {
  list.innerHTML = "";

  if (filtered.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${todo.title}</strong><br/>
      <small>${todo.date}</small>
      <button onclick="deleteTodo(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderList();
}

sortBtn.addEventListener("click", () => {
  todos.sort((a, b) => a.title.localeCompare(b.title));
  renderList();
});

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = todos.filter(todo =>
    todo.title.toLowerCase().includes(keyword)
  );
  renderList(filtered);
});
