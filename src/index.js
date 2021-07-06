export default class propjs {
    constructor(container = null, props = [], options = {}) {
        this.container = container
        this.props = props
        this.options = options

        this.container.style.height = '100vh'
        this.container.style.width = '100vw'
        this.container.style.position = 'fixed'
        this.container.style.overflow = 'hidden'
        this.container.style.userSelect = 'none'
        this.container.style.pointerEvents = 'none'
    }

    /**
     * Prop rain from top to bottom
     */
    rain() {
        let render = () => {
            const propElem = document.createElement('div'),
                img = document.createElement('img'),
                selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

            var r = this.options.rotate,
                d = this.options.duration,
                s = this.options.size

            var rotate = this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40),
                duration = this.getRandomInt(d ? d[0] : 5, d ? d[1] : 13)

            propElem.classList.add('prop', 'prop-rain')
            propElem.style.left = Math.random() * 100 + '%'
            propElem.style.position = 'fixed'
            propElem.style.zIndex = 45
            propElem.style.top = '-20vh'
            propElem.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateX(' + this.getRandomInt(5, 5)  + 'vw) translateY(120vh)' }
            ], {
                duration: duration * 1000,
            })
            img.animate([
                { transform: 'rotate(' + rotate  + 'deg)' },
                { transform: 'rotate(' + this.getRandomInt(rotate - 20, rotate + 20)  + 'deg)' }
            ], {
                duration: duration * 1000,
            })
            img.width = this.getRandomInt(s ? s[0] : 10, s = s ? s[1] : 15)
            img.src = selectedProp
            propElem.appendChild(img)
            this.container.appendChild(propElem)

            setTimeout(() => {
                propElem.remove()
            }, 15000)
        }

        window.propInterval = setInterval(render, this.options.interval ?? 550)
    }

    /**
     * Props mouving by mouse movement
     */
    mousemove() {
        let render = () => {
            var a = this.options.amount,
                r = this.options.rotate,
                s = this.options.size

            window.propAmount = this.getRandomInt(a ? a[0] : 30, a ? a[1] : 40)

            for (let i = 0; i < window.propAmount; i++) {
                const propElem = document.createElement('div'),
                    img = document.createElement('img'),
                    selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

                propElem.classList.add('prop', 'prop-mousemove')
                propElem.classList.add('prop-mousemove-' + i)
                propElem.style.position = 'fixed'
                propElem.style.zIndex = 45
                propElem.style.top = Math.random() * 100 + 'vh'
                propElem.style.left = Math.random() * 100 + 'vw'
                propElem.setAttribute('data-p-move', Math.random() * 10)
                img.style.transform = 'rotate(' + this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40) + 'deg)'
                img.width = this.getRandomInt(s ? s[0] : 10, s = s ? s[1] : 15)
                img.src = selectedProp

                propElem.appendChild(img)
                this.container.appendChild(propElem)
            }

            document.body.addEventListener('mousemove', this.handleMousemove)
        }

        render()
    }

    /**
     * Prop rain from top to bottom and moving by mouse movement
     */
    rainWithMousemove() {
        let render = () => {
            const propElem = document.createElement('div'),
                img = document.createElement('img'),
                selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

            var r = this.options.rotate,
                d = this.options.duration,
                s = this.options.size

            var rotate = this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40),
                duration = this.getRandomInt(d ? d[0] : 5, d ? d[1] : 13)

            propElem.classList.add('prop', 'prop-rainwithmousemove')
            propElem.style.left = Math.random() * 100 + '%'
            propElem.style.position = 'fixed'
            propElem.style.zIndex = 45
            propElem.style.top = '-20vh'
            propElem.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateX(' + this.getRandomInt(5, 5)  + 'vw) translateY(120vh)' }
            ], {
                duration: duration * 1000,
            })
            propElem.setAttribute('data-p-move', Math.random() * 10)
            img.animate([
                { transform: 'rotate(' + rotate  + 'deg)' },
                { transform: 'rotate(' + this.getRandomInt(rotate - 10, rotate + 10)  + 'deg)' }
            ], {
                duration: duration * 1000,
            })
            img.width = this.getRandomInt(s ? s[0] : 10, s = s ? s[1] : 15)
            img.src = selectedProp
            propElem.appendChild(img)
            this.container.appendChild(propElem)

            setTimeout(() => {
                propElem.remove()
            }, 15000)

            document.body.addEventListener('mousemove', this.handleRainWithMousemove(propElem))
        }

        window.propInterval = setInterval(render, this.options.interval ?? 550)
    }

    mousemoveElements() {
        document.body.addEventListener('mousemove', this.handleMousemoveElements)
    }

    /**
     * Helper functions
     */

    /**
     * Return random int value with given min and max
     * 
     * @param {*} min 
     * @param {*} max 
     * @returns
     */
    getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        
        return Math.floor(Math.random() * (max - min)) + min
    }

    /**
     * Resetting the props
     */
    reset() {
        this.container.innerHTML = ''
        clearInterval(window.propInterval)
        document.body.removeEventListener('mousemove', this.handleMousemove)
        document.body.removeEventListener('mousemove', this.handleRainWithMousemove)
        document.body.removeEventListener('mousemove', this.handleMousemoveElements)
    }

    /**
     * Event handler
     */

    /**
     * Handles the mousemove event
     * 
     * @param {*} event 
     */
    handleMousemove(event) {
        const ww = window.innerWidth,
            wh = window.innerHeight,
            cx = event.clientX,
            cy = event.clientY

        var calc = (inner, client) => {
            return (client - (inner / 2)) / (inner * 0.05)
        }

        for (let i = 0; i < window.propAmount; i++) {
            const propElem = document.getElementsByClassName('prop-mousemove-' + i)[0],
                x = calc(ww, cx) * (propElem.getAttribute('data-p-move') / 5.5),
                y = calc(wh, cy) * (propElem.getAttribute('data-p-move') / 5.5)

            propElem.style.transform = 'translateX(' + x + 'vw) translateY(' + y + 'vh)'
        }
    }

    /**
     * Handles the rainWithMousemove event
     * 
     * @param {*} event 
     * @param {*} propElem 
     */
    handleRainWithMousemove(event, propElem) {
        const ww = window.innerWidth
        const wh = window.innerHeight
        const cx = event.clientX
        const cy = event.clientY

        var calc = (inner, client) => {
            return (client - (inner / 2)) / (inner * 0.05)
        }

        const x = calc(ww, cx) * (propElem.getAttribute('data-p-move') / 5.5)
        const y = calc(wh, cy) * (propElem.getAttribute('data-p-move') / 5.5)

        propElem.style.marginLeft = x + 'px'
        propElem.style.marginTop = y + 'px'
    }

    handleMousemoveElements(event) {
        const ww = window.innerWidth,
            wh = window.innerHeight,
            cx = event.clientX,
            cy = event.clientY

        const propElems = document.querySelectorAll('[data-p-element]')

        var calc = (inner, client) => {
            return (client - (inner / 2)) / (inner * 0.05)
        }

        for (const propElem of propElems) {
            const move = propElem.getAttribute('data-p-move') ?? 1

            const x = calc(ww, cx) * (move / 5.5),
                y = calc(wh, cy) * (move / 5.5)

            propElem.style.transform = 'translateX(' + x + 'vw) translateY(' + y + 'vh)'
        }
    }
}
