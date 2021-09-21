const tasks = document.querySelector('.list-pendings');

if(tasks){
    tasks.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            const icon = e.target;
            const idTask = icon.parentElement.parentElement.dataset.task;
        }
    })
}

export default tasks;