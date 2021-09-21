export const updateAdvance = () => {
  // Selects existing tasks
  const tasks = document.querySelectorAll("li.task");

  if (tasks.length) {
    // selects all completed tasks
    const completedTasks = document.querySelectorAll("i.complete");

    // calculate advance
    const advance = Math.round((completedTasks.length / tasks.length) * 100);

    // show the advance
    const percentage = document.querySelector("#percentage");
    percentage.style.width = advance + "%";
  }
};
