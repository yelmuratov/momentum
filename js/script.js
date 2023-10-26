window.addEventListener('DOMContentLoaded', () => {

  // For change background Image
  function getTimeOfDay() {
    const date = new Date(),
      hours = date.getHours();
    if (hours >= 0 && hours < 6) {
      return 'night'
    } else if (hours >= 6 && hours < 12) {
      return 'morning'
    } else if (hours >= 12 && hours < 18) {
      return 'afternoon'
    } else if (hours >= 18 && hours < 24) {
      return 'evening'
    }
  }
  function getRandomNum() {
    const num = Math.floor(Math.random() * 20 + 1);
    return getZero(num);
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num;
    }
  }

  let bgNUm = getRandomNum();
  const timeOfDay = getTimeOfDay();
  
  function setBg(selector, num, timeOfDay) {
    const element = document.querySelector(selector);
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg`
      img.onload = () => {      
        element.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg)`
      }; 
  }

  // for set time
  function setTime() {
    const time = document.querySelector('time'),
      date = new Date(),
      hours = getZero(date.getHours()),
      minutes = getZero(date.getMinutes()),
      seconds = getZero(date.getSeconds());
    time.innerHTML = `${hours}:${minutes}:${seconds}`;
  }

  function setDate() {
    const dateContainer = document.querySelector('.date'),
      date = new Date(),
      daysInWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      day = date.getDay(),
      month = date.getMonth(),
      dateOfMonth = date.getDate();
    dateContainer.innerHTML = `${daysInWeek[day]}, ${months[month]} ${dateOfMonth}`
  }

  function setTimeOfDay() {
    const greeting = document.querySelector('.greeting');
    greeting.innerHTML = `Good ${timeOfDay}`
  }

  // for nameInput
  const nameInput = document.querySelector('.name')
  function setLocalstorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('city', City.value);
  }

  function getLocalstorage() {
    const nameFromLS = localStorage.getItem('name');
    if (nameFromLS != null) {
      nameInput.value = nameFromLS;
    }

    const CityFromLS = localStorage.getItem('city');
    if (CityFromLS != null) {
      City.value = CityFromLS;
      getWeather(City.value);
    }
  }

  window.addEventListener('beforeunload', setLocalstorage)
  window.addEventListener('load', getLocalstorage);
  
  
  // FOR SLIDER
  const slidePrev = document.querySelector('.slide-prev'),
  sliderNext = document.querySelector('.slide-next');
  
  function getSlidePrev() {
    bgNUm--;
    if (bgNUm <= 1) {
      bgNUm = 20;
    }
    setBg('body', getZero(bgNUm), timeOfDay);
  }
  
  function getSlideNext() {
    bgNUm++;
    if (bgNUm >= 20) {
      bgNUm = 1;
    }
    setBg('body', getZero(bgNUm), timeOfDay);
  }
  
  // FOR WEATHER INFORMATION
  const City = document.querySelector('.city'),
    weatherIcon = document.querySelector('.weather-icon');
    weatherError = document.querySelector('.weather-error');

  
  async function getWeather(cityName) {
    // Variables
    let weatherDescr = document.querySelector('.weather-description'),
      temp = document.querySelector('.temperature'),
      wind = document.querySelector('.wind'),
      humidity = document.querySelector('.humidity');

    const ApiURL = `https://api.openweathermap.org/data/2.5/weather?q=`,
      ApiKey = `08f2a575dda978b9c539199e54df03b0`;
    
    const res = await fetch(ApiURL + cityName + `&lang=eng&appid=` + ApiKey + `&units=metric`);

    if (res.status == 404) {
      weatherError.innerHTML = `Error! city not found for '${cityName}'!`
      weatherIcon.classList.add('hide');
      temp.classList.add('hide');
      wind.classList.add('hide');
      humidity.classList.add('hide');
      weatherDescr.innerHTML = '';
    } else if (res.status == 200) {
      weatherIcon.classList.remove('hide');
      temp.classList.remove('hide');
      wind.classList.remove('hide');
      humidity.classList.remove('hide')
      weatherError.innerHTML = '';
    }

    const data = await res.json();

    weatherDescr.innerHTML = data.weather[0].description;
    temp.innerHTML = Math.round(data.main.temp)+'°C';
    wind.innerHTML = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);

    // Error
  }
  
  City.addEventListener('focusout', () => {
    getWeather(City.value);
  })

  City.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      getWeather(City.value)
    }
  })


  // to write a quote
  const changeQuote = document.querySelector('.change-quote');
  async function setQuote() {
    let quote = document.querySelector('.quote'),
      author = document.querySelector('.author');
    const API = 'https://type.fit/api/quotes'

    const response = await fetch(API);
    const data = await response.json();

    const getRandomNum = () => {
      const randomNum = Math.floor(Math.random() * 1600);
      return randomNum;
    }

    const randomNum = getRandomNum();
    quote.innerHTML = `${data[randomNum].text}`
    if (data[randomNum].author != null) {
      author.innerHTML = `${data[randomNum].author}` 
    }
  }

  changeQuote.addEventListener('click', setQuote);

  setQuote();


  // AudioPlayer
  const ListMusic = document.querySelector('.play-list'),
    playPrev = document.querySelector('.play-prev'),
    play = document.querySelector('.play'),
    playNext = document.querySelector('.play-next'),
    playList = [
    {
      title: 'Aqua Caelestis',
      src: '../assets/sounds/Aqua Caelestis.mp3',
      duration: '00:58',
    },
    {
      title: 'River Flows In You',
      src: '../assets/sounds/River Flows In You.mp3',
      duration: '03:50',
    },
    {
      title: 'Ennio Morricone',
      src: '../assets/sounds/Ennio Morricone.mp3',
      duration: '01:37',
    },
    {
      title: 'Summer Wind',
      src: '../assets/sounds/Summer Wind.mp3',
      duration: '01:50',
    }
    ] 
    const Lists = [];
  let MusicNumber = 0;
  
  function setMusicList() {
    playList.forEach(item => {
      let playlistItem = document.createElement('li');
      Lists.push(playlistItem);
      playlistItem.textContent = item.title;
      playlistItem.classList.add('play-item');
      ListMusic.append(playlistItem);
    })
  }

  setMusicList();
  let isPlay = false;

  const audio = new Audio();

  function playAudio(num) {
    audio.src = playList[num].src;
    Lists[num].classList.add('item-active');
    audio.currentTime = 0;
    audio.play();
  };

  function playNextAudio() {
    Lists[MusicNumber].classList.remove('item-active');
    MusicNumber++;
    if (MusicNumber >3) {
      MusicNumber = 0
    }
    playAudio(MusicNumber);
    if (isPlay == false) {
      isPlay = true;
      toggleBtn();
    }
  }

  function playPrevAudio() {
    Lists[MusicNumber].classList.remove('item-active');
    MusicNumber--;
    if (MusicNumber < 0) {
      MusicNumber = 3;
    }
    playAudio(MusicNumber);
    if (isPlay == false) {
      isPlay = true
      toggleBtn()
    }
  }

  playPrev.addEventListener('click', playPrevAudio);
  playNext.addEventListener('click', playNextAudio);

  function toggleBtn() {
    play.classList.toggle('pause');
  }

  function pauseAudio() {
    audio.pause();
  }

  play.addEventListener('click', () => {
    if (!isPlay) {
      playAudio(MusicNumber);
      isPlay = true
    } else {
      pauseAudio();
      isPlay = false
    }
    toggleBtn();
  })
  
  // Functions
  slidePrev.addEventListener('click', getSlidePrev);
  sliderNext.addEventListener('click', getSlideNext);
  setBg('body',bgNUm,timeOfDay);
  setInterval(setTime, 1000);
  setDate();
  setTimeOfDay();
})