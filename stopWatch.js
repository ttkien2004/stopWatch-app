let timeID;

let minAndSec = JSON.parse(localStorage.getItem('time')) ||
{
    minute: 20,
    second: 0
};

displayTime();

function displayTime(){    
    const sec = document.querySelector('.seconds');
    const min = document.querySelector('.minutes');

    const minutes = minAndSec.minute;
    const seconds = minAndSec.second;

    if(minutes >= 0 && minutes <= 9){
        min.innerHTML = `0${minutes}`;
    }else{
        min.innerHTML = `${minutes}`;
    }   

    if(seconds >= 0 && seconds <= 9){
        sec.innerHTML = `0${seconds}`;    
    }else {
        sec.innerHTML = `${seconds}`;
    }
}
function runTime(){
    const sec = document.querySelector('.seconds');
    const min = document.querySelector('.minutes');       
    
    timeID = setInterval(() => {       
        if(minAndSec.second < 0) {
            minAndSec.second = 59;
            minAndSec.minute--;
            if(minAndSec.minute >= 0 && minAndSec.minute <= 9){
                min.innerHTML = `0${minAndSec.minute}`;
            }else{
                min.innerHTML = `${minAndSec.minute}`;
            }                        
        }
        if(minAndSec.second === 0 && minAndSec.minute === 0){
            stopWatch();
            exitApp();
            return;
        }
        if(minAndSec.second >= 0 && minAndSec.second <= 9){
            sec.innerHTML = `0${minAndSec.second}`;    
        }else {
            sec.innerHTML = `${minAndSec.second}`;
        }        
        localStorage.setItem('time', JSON.stringify(minAndSec));
        minAndSec.second--;
                
    }, 1000);
}
function stopWatch(){
    clearInterval(timeID);    
}

function exitApp(){
    minAndSec.minute = 20;
    minAndSec.second = 0;
    localStorage.removeItem('time');
    displayTime();
}

document.querySelector('.start').addEventListener('click',
() => {
    const check = document.querySelector('.start');
    if(check.innerText === 'Start'){
        check.innerHTML = 'Stop';
        check.classList.add('changeToStop');
        runTime();
    }else{
        check.innerHTML = 'Start';
        check.classList.remove('changeToStop');
        stopWatch();
    }    
});
document.querySelector('.stop').addEventListener('click',
() => {
    exitApp();
});




