import axios from "axios";

const tasks = document.querySelector(".list-pending");

if (tasks) {
  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icon = e.target;
      const idTask = icon.parentElement.parentElement.dataset.task;

      // request to /tasks/:id
      const url = `${location.origin}/tasks/${idTask}`;

      axios.patch(url, { idTask }).then(function (response) {
        if (response.status === 200) {
          icon.classList.toggle("complete");
        }
      });
    }
  });
}

export default tasks;
