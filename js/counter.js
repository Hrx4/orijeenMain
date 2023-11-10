var project = setInterval(projectDone, 10)
var project1 = setInterval(projectDone1, 10)
var project2 = setInterval(projectDone2, 10)


let counter1=1;
let counter2=1;
let counter3=1;


function projectDone(){
    counter1++;
    document.querySelector("#number1").innerHTML=counter1+"+";
    if(counter1 == 1000){
        clearInterval(project)
    }
}
function projectDone1(){
    counter2++;
    document.querySelector("#number2").innerHTML=counter2+"+";
    if(counter1 == 10){
        clearInterval(project1)
    }
}
function projectDone2(){
    counter3++;
    document.querySelector("#number3").innerHTML=counter3+"+";
    if(counter1 == 6){
        clearInterval(project2)
    }
}