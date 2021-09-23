import axios from "axios";
import Swal from "sweetalert2";
import { updateAdvance } from "../functions/advance";

const tasks = document.querySelector(".list-pending");

if (tasks) {
  // if cursor is over the check icon

  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icon = e.target;
      const idTask = icon.parentElement.parentElement.dataset.task;

      // request to /tasks/:id
      const url = `${location.origin}/tasks/${idTask}`;

      axios.patch(url, { idTask }).then(function (response) {
        if (response.status === 200) {
          icon.classList.toggle("complete");
          updateAdvance();
        }
      });
    }

    ////////////////////////////////////////////////////////////////
    // if cursor is over trash icon

    if (e.target.classList.contains("fa-trash")) {
      const taskHTML = e.target.parentElement.parentElement,
        idTask = taskHTML.dataset.task;

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.value) {
          const url = `${location.origin}/tasks/${idTask}`;

          // send delete from axios
          axios.delete(url, { params: { idTask } }).then(function (response) {
            if (response.status === 200) {
              taskHTML.parentElement.removeChild(taskHTML);

              Swal.fire(
                "Deleted!",
                response.data,
                "Your task has been deleted.",
                "success"
              );
              updateAdvance();
            }
          });
        }
      });
    }
  });
}

export default tasks;
