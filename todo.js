let circle = document.querySelector(".ri-circle-line");
let right = document.querySelector(".ri-close-large-line");
let taskname = document.getElementById("input-box");
let tasklist = document.querySelector("ul");
let add = document.querySelector("button");

function addTask(){
    if(taskname.value === ''){
        alert("You didn't enter any task");
    }
    else{
       
        let oop = document.createElement("div");
        let li = document.createElement("li");
        li.classList.add("uff")
        tasklist.appendChild(li);
        oop.classList.add("oops");
        li.appendChild(oop);
        let mark = document.createElement("div");
        mark.classList.add("marked");
        oop.appendChild(mark)
        li.innerHTML =`<div class="oops" onclick = "done(this)"><div class= "marked"></div><i class="ri-circle-line"></i><span class="task-text">${taskname.value}</span></div><i class="ri-close-large-line" onclick = "cancelTask(this)"></i>`;

        let trackerData = JSON.parse(localStorage.getItem("appProgressData")) || { totalMinutes: 0, daily: {}, tasks: [] };
        
        trackerData.tasks.push({
            id: Date.now(),
            name: taskname.value, // Yahan task ka actual naam save hoga
            timeSpent: 0
        });
        
        localStorage.setItem("appProgressData", JSON.stringify(trackerData));
    }
    taskname.value = "";
    saveData()
}
function done(hulu){
    hulu.classList.toggle('checked'); 
    saveData()
}

function cancelTask(mau){
    let listItem = mau.closest('li');
    if (listItem) {
        listItem.remove();
    }
    saveData();
}

function saveData(){
    localStorage.setItem("data",tasklist.innerHTML)
}

function showList(){ 
    tasklist.innerHTML = localStorage.getItem("data")
}

window.addEventListener('DOMContentLoaded', function() {
    showList()
});