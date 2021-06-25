var prop = {
    props: {
        0: {
            src: './assets/icons/dollar.svg',
            minSize: 10,
        },
        1: {
            src: './assets/icons/cactus.png',
            minSize: 25,
        },
    },
    container: () => {
        const propContainer = document.createElement('div');
        propContainer.id = 'propContainer';
        document.body.appendChild(propContainer);
    },

    /**
     * Create random generated props that fall from the page top to bottom
     */
    rain: () => {
        prop.container();

        let render = () => {
            const propElem = document.createElement('div');
            const img = document.createElement('img');
            var currentProp = prop.props[Math.floor(Math.random() * Object.keys(prop.props).length)];

            propElem.classList.add('prop-rain');
            propElem.style.left = Math.random() * 100 + 'vw';
            propElem.style.transform = 'rotate(' + getRandomInt(-50, 50)  + 'deg)';
            propElem.style.animationDuration = Math.random() * 3 + 8 + 's';
            img.width = Math.random() * 25 + currentProp.minSize;
            img.src = currentProp.src;

            propElem.appendChild(img);
            document.getElementById('propContainer').appendChild(propElem);

            setTimeout(() => {
                propElem.remove();
            }, 10000);
        }

        let getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            
            return Math.floor(Math.random() * (max - min)) + min;
        }

        window.propInterval = setInterval(render, Math.random() * 600 + 200);
    },

    /**
     * Create random generated props that move on mousemovement
     */
    mousemove: () => {
        prop.container();

        let render = () => {
            window.propMouseoverloop = getRandomInt(30, 40);

            for (let i = 0; i < window.propMouseoverloop; i++) {
                const propElem = document.createElement('div');
                const img = document.createElement('img');
                var currentProp = prop.props[Math.floor(Math.random() * Object.keys(prop.props).length)];

                propElem.classList.add('prop-mousemove');
                propElem.classList.add('prop-mousemove-' + i);
                propElem.setAttribute('move-randomize', Math.random() * 10);
                propElem.style.top = Math.random() * 100 + 'vh';
                propElem.style.left = Math.random() * 100 + 'vw';
                propElem.style.transform = 'rotate(' + getRandomInt(-50, 50)  + 'deg)';
                img.width = Math.random() * 25 + currentProp.minSize;
                img.src = currentProp.src;

                propElem.appendChild(img);
                document.getElementById('propContainer').appendChild(propElem);
            }

            document.body.addEventListener('mousemove', (e) => {
                const ww = window.innerWidth;
                const wh = window.innerHeight;
                const cx = e.clientX;
                const cy = e.clientY;

                var calc = (inner, client) => {
                    //return Math.floor((client - (inner / 2)) / (inner * 0.1));
                    return (client - (inner / 2)) / (inner * 0.05);
                }
    
                for (let i = 0; i < window.propMouseoverloop; i++) {
                    const propElem = document.getElementsByClassName('prop-mousemove-' + i)[0];
                    const x = calc(ww, cx) * (propElem.getAttribute('move-randomize') / 5.5);
                    const y = calc(wh, cy) * (propElem.getAttribute('move-randomize') / 5.5);

                    propElem.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
                }
            });
        }

        let getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            
            return Math.floor(Math.random() * (max - min)) + min;
        }

        render();
    }
}


/**
 * Changes the active script if prop rain or mouseover is selected
 */
const radioRain = document.getElementById('propRadioRain');
const radioMousemove = document.getElementById('propRadioMousemove');
const propType = {
    0: 'rain',
    1: 'mousemove',
};

radioRain.addEventListener('change', () => {
    localStorage.setItem('prop', propType[0]);
    document.getElementById('propContainer').remove();
    prop.rain();
});

radioMousemove.addEventListener('change', () => {
    localStorage.setItem('prop', propType[1]);
    clearInterval(window.propInterval);
    document.getElementById('propContainer').remove();
    prop.mousemove();
});

if (localStorage.getItem('prop') == propType[0]) {
    radioRain.checked = true;
    prop.rain();
} else if (localStorage.getItem('prop') == propType[1]) {
    radioMousemove.checked = true;
    prop.mousemove();
} else {
    localStorage.setItem('prop', propType[0]);
    radioRain.checked = true;
    prop.rain();
}