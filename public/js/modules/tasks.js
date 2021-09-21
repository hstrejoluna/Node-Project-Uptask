import axios from "axios";

const tasks = document.querySelector(".list-pendings");

if (tasks) {
  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icon = e.target;
      const idTask = icon.parentElement.parentElement.dataset.task;

      // request to /tasks/:id
      const url = `${location.origin}/tasks/${idTask}`;

      axios.patch(url, { idTask }).then(function (response) {
        console.log(response);
      });
    }
  });
}

export default tasks;
