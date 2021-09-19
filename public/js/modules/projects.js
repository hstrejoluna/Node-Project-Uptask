import Swal from "sweetalert2";
import axios from "axios";

const btnDelete = document.querySelector("#delete-project");

if (btnDelete) {
  btnDelete
    .addEventListener("click", (e) => {
      const urlProject = e.target.dataset.projectUrl;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          // Send request to axios
          const url = `${location.origin}/projects/${urlProject}`;
          axios
            .delete(url, { params: { urlProject } })
            .then(function (response) {
              Swal.fire("Deleted!", response.data, "success");
            });
        }
      });

      // redirect to projects page
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    })
    .catch(() => {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong, please try again.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
}

export default btnDelete;
