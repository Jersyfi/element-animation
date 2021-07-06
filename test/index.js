import elementAnimation from '../src/index.js'

const container = document.getElementById('element-animation'),
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
    elemAnimType = {
        0: 'rain',
        1: 'mousemove',
        2: 'rainWithMousemove',
        3: 'mousemoveElements'
    },
    elemAnimState = localStorage.getItem('element-animation')

var elemAnim = new elementAnimation(container, props, options)

let eventRain = () => {
    radioRain.checked = true
    localStorage.setItem('element-animation', elemAnimType[0])
    elemAnim.reset()
    elemAnim.rain()
}

let eventMousemove = () => {
    radioMousemove.checked = true
    localStorage.setItem('element-animation', elemAnimType[1])
    elemAnim.reset()
    elemAnim.mousemove()
}

let eventRainWithMousemove = () => {
    radioRainWithMousemove.checked = true
    localStorage.setItem('element-animation', elemAnimType[2])
    elemAnim.reset()
    elemAnim.rainWithMousemove()
}

let eventMousemoveElements = () => {
    radioMousemoveElements.checked = true
    localStorage.setItem('element-animation', elemAnimType[3])
    elemAnim.reset()
    elemAnim.mousemoveElements()
}

radioRain.addEventListener('change', eventRain)
radioMousemove.addEventListener('change', eventMousemove)
radioRainWithMousemove.addEventListener('change', eventRainWithMousemove)
radioMousemoveElements.addEventListener('change', eventMousemoveElements)

if (elemAnimState == elemAnimType[1]) eventMousemove()
else if (elemAnimState == elemAnimType[2]) eventRainWithMousemove()
else if (elemAnimState == elemAnimType[3]) eventMousemoveElements()
else eventRain()
