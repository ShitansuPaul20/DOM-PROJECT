let [seconds , minutes , hours] = [0,0,0]
let dispalyTime = document.querySelector("h1")
let limit = document.querySelector(".limit")
let workSessionPopup = document.querySelector(".WorksessionPopup")
let timer = null


    function stopwatch(){

        seconds++;
        if(seconds==60){
            seconds = 0;
            minutes++;
            if(minutes==0){
                minutes = 0;
                hours++
            }
        }

        let h = hours<10?"0"+hours:hours;
        let m = minutes<10?"0"+minutes:minutes;
        let s = seconds<10?"0"+seconds:seconds;

        dispalyTime.innerHTML = h+' : '+m+' : '+s ; 

        if(m == Number(limit.value)){
            clearInterval(timer)
            workSessionPopup.style.display = "block";
            logSessionTime(Number(limit.value));
        }

    }


function watchstart(){
    if(limit.value>=1){
        if(timer!==null){
        clearInterval(timer);
    }
    
    timer = setInterval(stopwatch,1000);
    }
    else{
        alert("Select your work time to continue")
    }


    
}

function stopWatch(){
    clearInterval(timer)
}

function resetWatch(){
    clearInterval(timer);
    [seconds , minutes , hours] = [0,0,0];
    dispalyTime.innerHTML = "00 : 00 : 00";
}

function deletePopup(){
     workSessionPopup.style.display = "none";
     resetWatch()
}

function enforceMinMax(el) {
  if (el.value != "") {
    if (parseFloat(el.value) < parseFloat(el.min)) el.value = el.min;
    if (parseFloat(el.value) > parseFloat(el.max)) el.value = el.max;
  }
}

window.addEventListener('DOMContentLoaded', () => {
    let data = JSON.parse(localStorage.getItem("appProgressData"));

    let dataList = document.getElementById("taskList");
    
    if(data && data.tasks) {
        data.tasks.forEach(task => {
            let option = document.createElement('option');
            option.value = task.name; 
            dataList.appendChild(option);
        });
    }
});

function logSessionTime(minutesCompleted) {
    // 1. Task ka naam nikaalo
    let taskNameInput = document.getElementById("taskNameInput");
    
    // Check karo ki input tag actually exist karta hai ya nahi
    if(!taskNameInput) {
        console.error("Error: taskNameInput id wala tag HTML mein nahi mila!");
        return;
    }

    let taskNameFromInput = taskNameInput.value.trim();
    
    // Agar input khali tha, toh user ko WARNING do
    if(!taskNameFromInput) {
        alert("⚠️ Warning: Tumne Task ka naam nahi chuna tha, isliye time Progress Tracker mein save nahi hua!");
        return;
    }

    // 2. Local storage se data laao, ya fir naya blank data banao
    let data = JSON.parse(localStorage.getItem("appProgressData")) || { totalMinutes: 0, daily: {}, tasks: [] };

    let today = new Date().toISOString().split('T')[0];

    // 3. Time Add karo
    data.totalMinutes += minutesCompleted;
    data.daily[today] = (data.daily[today] || 0) + minutesCompleted;
    
    // 4. Check karo ki kya yeh task pehle se To-Do list mein tha?
    let taskIndex = data.tasks.findIndex(t => t.name.toLowerCase() === taskNameFromInput.toLowerCase());
    
    if(taskIndex !== -1) {
        // Purane task mein time jodo
        data.tasks[taskIndex].timeSpent += minutesCompleted;
    } else {
        // Naya task add kar do
        data.tasks.push({
            id: Date.now(),
            name: taskNameFromInput,
            timeSpent: minutesCompleted
        });
    }

    // 5. Save karo aur user ko SUCCESS msg do!
    localStorage.setItem("appProgressData", JSON.stringify(data));
    alert(`✅ Success! ${minutesCompleted} minute(s) successfully Progress Tracker mein save ho gaye!`);
}