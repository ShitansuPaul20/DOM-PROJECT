let h = document.querySelector(".h");
let m = document.querySelector(".m");
let s = document.querySelector(".s");

setInterval(function(){
    let time = new Date();
    h.innerHTML = (time.getHours()<10?"0":"")+time.getHours();
    m.innerHTML = (time.getMinutes()<10?"0":"")+time.getMinutes();
    s.innerHTML = (time.getSeconds()<10?"0":"")+time.getSeconds();
},1000)

