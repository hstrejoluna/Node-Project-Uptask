import Swal from "sweetalert2";
import axios from "axios";

const btnDelete = document.querySelector("#delete-project");

if (btnDelete) {
  btnDelete.addEventListener("click", (e) => {
    const urlProject = e.target.dataset.projectUrl;
    const idProject = e.target.dataset.projectId;

    // console.log(urlProject);
    Swal.fire({
      title: "Do you want to delete this project?",
      text: "A deleted project can't be recovered",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.value) {
        // enviar petición a axios
        const url = `${location.origin}/projects/${urlProject}/${idProject}`;

        axios
          .delete(url, { params: { urlProject, idProject } })
          .then(function (response) {
            console.log(response);

            Swal.fire("Project Deleted", response.data, "success");

            // redireccionar al inicio
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Something happens in background :c",
              text: "Project can't be deleted",
            });
          });
      }
    });
  });
}
export default btnDelete;
