# element-animation

## What is this project for?
You can use this project to create congratulation confetti, snow or leaves falling from top to bottom or moved by mouse. Also elements insider your hole document can be moved by mouse movement. With this project you can create awesome effects on your website.

Start with a simple test file to see what the project can do without coding yourself. First you need to download the project and then go to the [TEST](./test/) folder and preview the bootstrap html file.

## Get started
Simple start with element-animation
```javascript
new elementAnimation(container, props, options).rain()
```

You can use the functions `rain()`, `mousemouve()`, `rainWithMousemove()` and a special function `mousemoveElements()`

For the functions `rain()`, `mousemouve()` and `rainWithMousemove()` you need to define a container.

```html
<div id="element-animation"></div>
```

```javascript
const container = document.getElementById('element-animation')
```

For the props you need to define a array with the sources to the images.

```javascript
props = [
    'src_to_img',
    'src_to_img_1'
]
```

All awailable options. Need to be an Object.

```javascript
options = {
    interval: 550,          // rain
    rotate: [-40, 40],
    size: [10, 15],
    duration: [5, 13],      // rain
    amount: [30, 40]        // mousemove
}
```

## Functions

All functions except `mousemoveElements()` need a container for the generated elements.

### rain()
```javascript
new elementAnimation(container, props, options).rain()
```

### mousemove()
```javascript
new elementAnimation(container, props, options).mousemove()
```

### rainWithMousemove()
```javascript
new elementAnimation(container, props, options).rainWithMousemove()
```

### mousemoveElements()
data-p-element -> Defines that it is a element for movement
<br>data-p-move -> Factor from 0 to unlimited (float with dots allowed)

```html
<div data-p-element data-p-move="0.5">
    Example text or element here.
</div>

<div data-p-element data-p-move="0.8">
    Secound example text or element here.
</div>
```

```javascript
new elementAnimation(container, props, options).mousemoveElements()
```

## Helpers

### reset()
Can be used to reset all prop actions.
After a reset you can call another functions

```javascript
const elemAnim = new elementAnimation(container, props, options).rain()

elemAnim.reset()
elemAnim.mousemove()
```
