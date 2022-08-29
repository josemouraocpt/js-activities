const futureDate = new Date(2022, 11, 31, 23, 59, 59, 59);

function getDateUntilNewEve(){
    const currentDate = new Date();
    const months =  Math.abs(futureDate.getMonth() - currentDate.getMonth());
    const days =  Math.abs(futureDate.getDay() - currentDate.getDay());
    const hours =  Math.abs(futureDate.getHours() - currentDate.getHours());
    const minutes =  Math.abs(futureDate.getMinutes() - currentDate.getMinutes());
    const seconds =  Math.abs(futureDate.getSeconds() - currentDate.getSeconds());
    return {months, days, hours, minutes, seconds};
}

function displayCountDown(){
    const currentDate = getDateUntilNewEve();
    document.querySelector('.countdown-months').innerHTML = `<span>${currentDate.months}</span> months`
    document.querySelector('.countdown-days').innerHTML = `<span>${currentDate.days}</span> days`
    document.querySelector('.countdown-hours').innerHTML = `<span>${currentDate.hours}</span> hours`
    document.querySelector('.countdown-minutes').innerHTML = `<span>${currentDate.minutes}</span> minutes`
    document.querySelector('.countdown-seconds').innerHTML = `<span>${currentDate.seconds}</span> seconds`
}

setInterval(displayCountDown, 1000);
