import Swal from "sweetalert2";
import axios from "axios";

const btnDelete = document.querySelector("#delete-project");

if (btnDelete) {
  btnDelete.addEventListener("click", () => {
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
        Swal.fire("Deleted!", "Your project has been deleted.", "success");
      }
    });

    // redirect to projects page
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  });
}

export default btnDelete;
