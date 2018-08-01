import sunny from '../images/sunny.jpg'
import rain from '../images/rain.jpg'
import dayStorm from '../images/daystorm.jpg'
import snow from '../images/snow.jpg'
import mist from '../images/mist.jpg'
import broken from '../images/brokenclouds.jpg'
import fewClouds from '../images/fewclouds.jpg'
import scattered from '../images/scattered.jpg'
import clearNight from '../images/clearnight.jpg'
import nightRain from '../images/nightrain.jpg'
import nightCloud from '../images/nightcloud.jpg'
import storm from '../images/storm.jpg'

//change temp to celsius
export const toCelsius = (f) => (f -32) * 5/9;

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const isNight = (formatted, ) => {
    if (formatted !== undefined) {
        //get the current hour:
        const timeArray = formatted.split(" ");
        const splitByColons = timeArray[1].split(":");
        let hour = Number(splitByColons[0]);
        return (hour < 6 || hour > 18) ? true : false;
    }
};

// get image for weather conditions
// get night image
export const getNightImage = (conditions) => {
    if (conditions.includes('clear')) {
        return clearNight;
    } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
        return nightRain;
    } else if (conditions.includes('cloud')) {
        return nightCloud;
    } else if (conditions.includes('thunderstorm')) {
        return storm;
    }
    return clearNight;
};

export const getImage = (conditions) => {
    if (conditions.includes('clear')) {
        return sunny;
    } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
        return rain;
    } else if (conditions === 'few clouds') {
        return fewClouds;
    } else if (conditions === 'scattered clouds') {
        return scattered;
    } else if (conditions === 'broken clouds') {
        return broken;
    } else if (conditions.includes('overcast')) {
        return broken;
    } else if(conditions.includes('thunderstorm')) {
        return dayStorm;
    } else if(conditions.includes('snow')) {
        return snow;
    } else if(conditions === 'mist' || conditions.includes('fog')) {
        return mist
    } 
    return sunny;
};

export const getTagline = (conditions) => {
    if (conditions.includes('clear')) {
        return "IT'S A BEAUTIFUL DAY!";
    } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
        return "IT'S A LITTLE WET OUT THERE!";
    } else if (conditions.includes('clouds')) {
        return "IT'S A LITTLE CLOUDY";
    } else if (conditions.includes('overcast')) {
        return "IT'S QUITE CLOUDY TODAY";
    } else if(conditions.includes('thunderstorm')) {
        return "TAKE COVER!";
    } else if(conditions.includes('snow')) {
        return "BE CAREFUL DRIVING!";
    } else if(conditions === 'mist' || conditions.includes('fog')) {
        return "VISIBILITY MAY BE LOW"
    } 
    return "SEEMS LIKE A NICE DAY";
}

export const getNightTag = (conditions) => {
    if (conditions.includes('clear')) {
        return "IT'S A STARRY NIGHT!";
    } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
        return "IT'S A LITTLE WET OUT THERE!";
    } else if (conditions.includes('clouds')) {
        return "MIGHT NOT SEE ANY STARS";
    } else if(conditions.includes('thunderstorm')) {
        return "TAKE COVER!";
    } else if(conditions.includes('snow')) {
        return "TRY TO STAY INSIDE TONIGHT";
    } else if(conditions === 'mist' || conditions.includes('fog')) {
        return "VISIBILITY MAY BE LOW"
    } 
    return "SEEMS LIKE A NICE EVENING";
}

//get Am or Pm
export const getAmOrPm = timeString => {
    if (timeString !== undefined) {
        const timeArray = timeString.split(" ");
        const splitByColons = timeArray[1].split(":");
        if(splitByColons[0] < 12) {
            return 'am'
        } else {
            return 'pm'
        }
    }
}

//get sunrise
export const getSunrise = (ms) => {
    const sunRiseTime = new Date(ms);
    let hours = sunRiseTime.getHours();
    let min = sunRiseTime.getMinutes();
    if (min < 10){
        min = `0${min}`;
    } 
    return `${hours}:${min} am`;
}


//get current hour:
export const getLocalHours = timeString => {
    if (timeString !== undefined) {
        const timeArray = timeString.split(" ");
        const splitByColons = timeArray[1].split(":");
        const hour = Number(splitByColons[0]);
        if (hour > 12) {
            return hour - 12;
        } else if (hour === 0) {
            return 12
        } else {
            return hour
        }
    }
}

// get wind 
export const getWind = (speed, deg) => {
    let windSpeed = Math.floor(speed);
    let direction;
    if (deg >= 340 && deg <= 360) {
        direction = "North";
    } else if (deg <= 20) {
        direction = "North";
    } else if (deg > 20 && deg < 70) {
        direction = "Northeast";
    } else if (deg >= 70 && deg < 120) {
        direction = "East";
    } else if (deg >= 120 && deg < 160) {
        direction = "Southeast";
    } else if (deg >= 160 && deg < 210) {
        direction = "South";
    } else if (deg >= 210 && deg < 250) {
        direction = "Southwest";
    } else if (deg >= 250 && deg < 290) {
        direction = "West";
    } else direction =  "Northwest";
    return `${windSpeed} mph from the ${direction}`;
}
