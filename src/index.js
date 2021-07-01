export default class propjs {
    constructor(container, props = [], options = {}) {
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
     * Create random generated props that fall from the page top to bottom
     */
    rain() {
        let render = () => {
            const propElem = document.createElement('div'),
                img = document.createElement('img'),
                selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

            var r = this.options.rotate,
                d = this.options.duration,
                s = this.options.size

            propElem.classList.add('prop', 'prop-rain')
            propElem.style.left = Math.random() * 100 + '%'
            propElem.style.position = 'fixed'
            propElem.style.zIndex = 45
            propElem.style.top = '-20vh'
            propElem.animate([
                { transform: 'rotate(' + this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40)  + 'deg) translateY(0)' },
                { transform: 'translateX(' + this.getRandomInt(5, 5)  + 'vw) translateY(120vh)' }
            ], {
                duration: (this.getRandomInt(d ? d[0] : 5, d ? d[1] : 13)) * 1000,
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
     * Create random generated props that move on mousemovement
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
                    currentProp = this.props[Math.floor(Math.random() * this.props.length)]

                propElem.classList.add('prop', 'prop-mousemove')
                propElem.classList.add('prop-mousemove-' + i)
                propElem.style.position = 'fixed'
                propElem.style.zIndex = 45
                propElem.style.top = Math.random() * 100 + 'vh'
                propElem.style.left = Math.random() * 100 + 'vw'
                propElem.style.transform = 'rotate(' + this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40)  + 'deg)'
                propElem.setAttribute('prop-move', Math.random() * 10)
                img.width = this.getRandomInt(s ? s[0] : 10, s = s ? s[1] : 15)
                img.src = currentProp

                propElem.appendChild(img)
                this.container.appendChild(propElem)
            }

            document.body.addEventListener('mousemove', this.handleMousemove)
        }

        render()
    }

    rainWithMousemove() {
        let render = () => {
            const propElem = document.createElement('div'),
                img = document.createElement('img'),
                selectedProp = this.props[Math.floor(Math.random() * this.props.length)]

            var r = this.options.rotate,
                d = this.options.duration,
                s = this.options.size

            propElem.classList.add('prop', 'prop-rainwithmousemove')
            propElem.style.left = Math.random() * 100 + '%'
            propElem.style.position = 'fixed'
            propElem.style.zIndex = 45
            propElem.style.top = '-20vh'
            propElem.animate([
                { transform: 'rotate(' + this.getRandomInt(r ? r[0] : -40, r ? r[1] : 40)  + 'deg) translateY(0)' },
                { transform: 'translateX(' + this.getRandomInt(5, 5)  + 'vw) translateY(120vh)' }
            ], {
                duration: (this.getRandomInt(d ? d[0] : 5, d ? d[1] : 13)) * 1000,
            })
            propElem.setAttribute('prop-move', Math.random() * 10)
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
     * 
     */
    reset() {
        clearInterval(window.propInterval)
        document.body.removeEventListener('mousemove', this.handleMousemove)
        document.body.removeEventListener('mousemove', this.handleRainWithMousemove)
    }

    /**
     * Events
     */

    handleMousemove(event) {
        const ww = window.innerWidth
        const wh = window.innerHeight
        const cx = event.clientX
        const cy = event.clientY

        var calc = (inner, client) => {
            //return Math.floor((client - (inner / 2)) / (inner * 0.1));
            return (client - (inner / 2)) / (inner * 0.05)
        }

        for (let i = 0; i < window.propAmount; i++) {
            const propElem = document.getElementsByClassName('prop-mousemove-' + i)[0]
            const x = calc(ww, cx) * (propElem.getAttribute('prop-move') / 5.5)
            const y = calc(wh, cy) * (propElem.getAttribute('prop-move') / 5.5)

            propElem.style.marginLeft = x + 'px'
            propElem.style.marginTop = y + 'px'
        }
    }

    handleRainWithMousemove(event, propElem) {
        const ww = window.innerWidth
        const wh = window.innerHeight
        const cx = event.clientX
        const cy = event.clientY

        var calc = (inner, client) => {
            //return Math.floor((client - (inner / 2)) / (inner * 0.1));
            return (client - (inner / 2)) / (inner * 0.05)
        }

        const x = calc(ww, cx) * (propElem.getAttribute('prop-move') / 5.5)
        const y = calc(wh, cy) * (propElem.getAttribute('prop-move') / 5.5)

        propElem.style.marginLeft = x + 'px'
        propElem.style.marginTop = y + 'px'
    }
}
