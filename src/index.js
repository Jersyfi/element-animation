export default class elementAnimation {
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
            const Elem = document.createElement('div'),
                img = document.createElement('img'),
                selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

            var r = this.options.rotate,
                d = this.options.duration,
                s = this.options.size

            var rotate = this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40),
                duration = this.getRandomInt(d ? d[0] : 5, d ? d[1] : 13)

            Elem.classList.add('element-animation')
            Elem.style.left = Math.random() * 100 + '%'
            Elem.style.position = 'fixed'
            Elem.style.zIndex = 45
            Elem.style.top = '-20vh'
            Elem.animate([
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
            Elem.appendChild(img)
            this.container.appendChild(Elem)

            setTimeout(() => {
                Elem.remove()
            }, 15000)
        }

        window.elementAnimationInterval = setInterval(render, this.options.interval ?? 550)
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
                const Elem = document.createElement('div'),
                    img = document.createElement('img'),
                    selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

                Elem.classList.add('element-animation')
                Elem.classList.add('element-animation-mousemove-' + i)
                Elem.style.position = 'fixed'
                Elem.style.zIndex = 45
                Elem.style.top = Math.random() * 100 + 'vh'
                Elem.style.left = Math.random() * 100 + 'vw'
                Elem.setAttribute('data-ea-move', Math.random() * 10)
                img.style.transform = 'rotate(' + this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40) + 'deg)'
                img.width = this.getRandomInt(s ? s[0] : 10, s = s ? s[1] : 15)
                img.src = selectedProp

                Elem.appendChild(img)
                this.container.appendChild(Elem)
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
            const Elem = document.createElement('div'),
                img = document.createElement('img'),
                selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

            var r = this.options.rotate,
                d = this.options.duration,
                s = this.options.size

            var rotate = this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40),
                duration = this.getRandomInt(d ? d[0] : 5, d ? d[1] : 13)

            Elem.classList.add('element-animation')
            Elem.classList.add('element-animation-rainwithmousemove')
            Elem.style.left = Math.random() * 100 + '%'
            Elem.style.position = 'fixed'
            Elem.style.zIndex = 45
            Elem.style.top = '-20vh'
            Elem.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateX(' + this.getRandomInt(5, 5)  + 'vw) translateY(120vh)' }
            ], {
                duration: duration * 1000,
            })
            Elem.setAttribute('data-ea-move', Math.random() * 10)
            img.animate([
                { transform: 'rotate(' + rotate  + 'deg)' },
                { transform: 'rotate(' + this.getRandomInt(rotate - 10, rotate + 10)  + 'deg)' }
            ], {
                duration: duration * 1000,
            })
            img.width = this.getRandomInt(s ? s[0] : 10, s = s ? s[1] : 15)
            img.src = selectedProp
            Elem.appendChild(img)
            this.container.appendChild(Elem)

            setTimeout(() => {
                Elem.remove()
            }, 15000)

            document.body.addEventListener('mousemove', this.handleRainWithMousemove)
        }

        window.elementAnimationInterval = setInterval(render, this.options.interval ?? 550)
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
        clearInterval(window.elementAnimationInterval)
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
            const Elem = document.getElementsByClassName('element-animation-mousemove-' + i)[0],
                x = calc(ww, cx) * (Elem.getAttribute('data-ea-move') / 5.5),
                y = calc(wh, cy) * (Elem.getAttribute('data-ea-move') / 5.5)

            Elem.style.transform = 'translateX(' + x + 'vw) translateY(' + y + 'vh)'
        }
    }

    /**
     * Handles the rainWithMousemove event
     * 
     * @param {*} event 
     * @param {*} Elem 
     */
    handleRainWithMousemove(event) {
        const ww = window.innerWidth,
            wh = window.innerHeight,
            cx = event.clientX,
            cy = event.clientY

        var calc = (inner, client) => {
            return (client - (inner / 2)) / (inner * 0.05)
        }

        const Elems = document.getElementsByClassName('element-animation-rainwithmousemove')

        for (const Elem of Elems) {
            const x = calc(ww, cx) * (Elem.getAttribute('data-ea-move') / 5.5),
                y = calc(wh, cy) * (Elem.getAttribute('data-ea-move') / 5.5)

            Elem.style.marginLeft = x + 'px'
            Elem.style.marginTop = y + 'px'
        }        
    }

    handleMousemoveElements(event) {
        const ww = window.innerWidth,
            wh = window.innerHeight,
            cx = event.clientX,
            cy = event.clientY

        const Elems = document.querySelectorAll('[data-ea-element]')

        var calc = (inner, client) => {
            return (client - (inner / 2)) / (inner * 0.05)
        }

        for (const Elem of Elems) {
            const move = Elem.getAttribute('data-ea-move') ?? 1

            const x = calc(ww, cx) * (move / 5.5),
                y = calc(wh, cy) * (move / 5.5)

            Elem.style.transform = 'translateX(' + x + 'vw) translateY(' + y + 'vh)'
        }
    }
}
