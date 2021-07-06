import propsjs from '../src/index.js'

const container = document.getElementById('propsjs'),
    props = [
        './props/confetti_large_big_blue.svg',
        './props/confetti_large_green.svg',
        './props/confetti_small_big_yellow.svg',
        './props/confetti_large_big_red.svg',
        './props/confetti_large_blue.svg',
        './props/confetti_small_red.svg'
    ],
    options = {
        interval: 350,      // rain
        rotate: [-40, 40],
        size: [10, 15],
        duration: [2, 8],   // rain
        amount: [30, 40]    // mousemove
    },
    radioRain = document.getElementById('rain'),
    radioMousemove = document.getElementById('mousemove'),
    radioRainWithMousemove = document.getElementById('rainWithMousemove'),
    radioMousemoveElements = document.getElementById('mousemoveElements'),
    propType = {
        0: 'rain',
        1: 'mousemove',
        2: 'rainWithMousemove',
        3: 'mousemoveElements'
    },
    propState = localStorage.getItem('prop')

var prop = new propsjs(container, props, options)

let eventRain = () => {
    radioRain.checked = true
    localStorage.setItem('prop', propType[0])
    document.getElementById('propsjs').innerHTML = ''
    prop.reset()
    prop.rain()
}

let eventMousemove = () => {
    radioMousemove.checked = true
    localStorage.setItem('prop', propType[1])
    prop.reset()
    prop.mousemove()
}

let eventRainWithMousemove = () => {
    radioRainWithMousemove.checked = true
    localStorage.setItem('prop', propType[2])
    prop.reset()
    prop.rainWithMousemove()
}

let eventMousemoveElements = () => {
    radioMousemoveElements.checked = true
    localStorage.setItem('prop', propType[3])
    prop.reset()
    prop.mousemoveElements()
}

radioRain.addEventListener('change', eventRain)
radioMousemove.addEventListener('change', eventMousemove)
radioRainWithMousemove.addEventListener('change', eventRainWithMousemove)
radioMousemoveElements.addEventListener('change', eventMousemoveElements)

if (propState == propType[1]) eventMousemove()
else if (propState == propType[2]) eventRainWithMousemove()
else if (propState == propType[3]) eventMousemoveElements()
else eventRain()