let date = document.querySelector(".date");
let day = document.querySelector(".day");
let month = document.querySelector(".month");
let year = document.querySelector(".year");

const today = new Date();

let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

date.innerHTML = (today.getDate()<10?"0":"")+today.getDate();
day.innerHTML = days[today.getDay()];
month.innerHTML = months[today.getMonth()];
year.innerHTML = today.getFullYear();