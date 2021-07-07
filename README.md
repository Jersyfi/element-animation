# element-animation

## What is this project for?
You can use this project to create congratulation confetti, snow or leaves falling from top to bottom or moved by mouse. Also elements insider your hole document can be moved by mouse movement. With this project you can create awesome effects on your website.

Start with a simple test file to see what the project can do without coding yourself. First you need to download the project and then go to the [TEST](./test/) folder and preview the bootstrap html file.

## Documentation

### Get started

To start with the project element-animation you need to install via NPM and then import it.

```bash
npm i element-animation
```

```javascript
import elementAnimation from element-animation

var elemAnim = new elementAnimation(
    container,
    props,
    options
)
```

container -> DOMElement (default: null) \
props -> Array (default: []) \
options -> Object (default: {})

Before we start to define the variables you need to know that you only need `container` and `props` when using the functions `rain()`, `mousemove()` and `rainWithMousemove()`.
First we start with the container. Here you need to give a DOMElement for example a simple `<div></div>` container.

```html
<div id="element-animation"></div>
```

```javascript
const container = document.getElementById('element-animation')
```

Then you need to define props. There you give an array with the sources to the images like .jpg or .svg.

```javascript
props = [
    'src_to_img',
    'src_to_img_1'
]
```

For the options you have the following possibilities. When a comment is behind a option it means that the option is only for a specific funtion.

```javascript
options = {
    interval: 550,          // rain
    rotate: [-40, 40],
    size: [10, 15],
    duration: [5, 13],      // rain
    amount: [30, 40]        // mousemove
}
```

Now you need to call one of the given functions [described down below](#functions) to visially see the animation. Choose between `rain()`, `mousemove()`, `rainWithMousemove()` and a special function `mousemoveElements()`.

### Functions

All functions except `mousemoveElements()` need a container for the generated elements.

#### rain()
```javascript
new elementAnimation(container, props, options).rain()
```

#### mousemove()
```javascript
new elementAnimation(container, props, options).mousemove()
```

#### rainWithMousemove()
```javascript
new elementAnimation(container, props, options).rainWithMousemove()
```

#### mousemoveElements()
data-p-element -> Defines that it is a element for movement
<br>data-p-move -> Factor from 0 to unlimited (float with dots allowed)

```html
<div data-ea-element data-ea-move="0.5">
    Example text or element here.
</div>

<div data-ea-element data-ea-move="0.8">
    Secound example text or element here.
</div>
```

```javascript
new elementAnimation(container, props, options).mousemoveElements()
```

### Helpers

#### reset()
Can be used to reset all prop actions.
After a reset you can call another functions

```javascript
const elemAnim = new elementAnimation(container, props, options).rain()

elemAnim.reset()
elemAnim.mousemove()
```

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Credits
- [Jérôme Bastian Winkel](https://github.com/jersyfi)
- [All Contributors](../../contributors)

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.
