// Getting DOM elements
let flags = document.querySelectorAll('img');
let name = document.querySelectorAll('h1');
let time = document.querySelectorAll('h3');

// fetch url for all countries
const url = 'https://restcountries.eu/rest/v2/all';


fetch(url)
    .then((response) => {
        if (response.status === 100) {
            throw 'The API key passed was not valid or has expired';
        } else if (response.status === 105) {
            throw 'The requested service is temporarily unavailable'
        } else if (response.status === 106) {
            throw 'The requested operation failed due to a temporary issue.'
        } else if (response.status === 111) {
            throw 'The requested response format was not found'
        } else if (response.status === 112) {
            throw 'The requested method was not found'
        } else if (response.status === 114) {
            throw 'The SOAP envelope send in the request could not be parsed.'
        } else if (response.status === 115) {
            throw 'The XML-RPC request document could not be parsed.'
        } else if (response.status === 116) {
            throw 'One or more arguments contained a URL that has been used for absure on Flickr.'
        } else if (response.status >= 200 && response.status <= 299) {
            return response.json();

        };
    })
    .then((data) => {

        // creating an array to add objects  
        let countriesArr = [];

        // Randomize the countries and push them into the array
        for (let i = 0; i < 3; i++) {
            let randomNum = Math.floor(Math.random() * data.length);
            countriesArr.push(new Country(data[randomNum].name, data[randomNum].flag, data[randomNum].timezones[0]));
        }

        // looping through all values and add them to the DOM
        for (let i = 0; i < 3; i++) {
            name[i].innerText = `${countriesArr[i].name}`;
            flags[i].src = countriesArr[i].flag;
            time[i].innerText = `Current time: ${countriesArr[i].getTime()}`;
        }
    })
    .catch((error) => {
        alert(error);
    })



function Country(_name, _flag, _timeZone) {
    this.name = _name;
    this.flag = _flag;
    this.timeZone = _timeZone;
}

// Prototype to calculate the local time
Country.prototype.getTime = function() {

    let timeDifference;
    if (this.timeZone.length < 4) {
        timeDifference = '+00'
    } else {
        timeDifference = this.timeZone.substr(3, 3);
    }

    let timeToNum = parseInt(timeDifference);

    let date = new Date();
    let hour = date.getUTCHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let localHour = `${hour + timeToNum}`
    if (localHour < 0) {
        localHour = Math.abs(localHour);
    }
    let localTime = `${localHour}.${minutes}`;
    if (localTime < 10) {
        return `0${localHour}.${minutes}`;
    } else {
        return localTime;
    }
}