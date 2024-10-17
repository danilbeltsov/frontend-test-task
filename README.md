# FrontendTestTask

## Task

Requirements:

- support mobile screens (<600px) only, no desktop
- one slide utilises 100vw
- should be possible to change slides by swiping
- slides data should be abstracted, not hardcoded
- slide has background image, main image, title, text and button
- output: repository on github

Optional, if have time and desire:

- timer to change slides every 10 seconds
- prevent vertical scrolling while swiping
- simulate loading from api

## Thoughts on this task

- I decide to implement this carousel using ```<ng-content>``` because it gives us the flexibility to add any type of slides.
- because of no figma provided, I didn't focus too much on the details and implemented the design by eye.
- For the purpose of this task, I placed images for the slides in the assets folder. However, I believe it would be better to serve them from a CDN storage, such as S3
- Clicking on buttons in the slides will not do anything, except ```console.log()```, but it can be modified because of the callback fn i provided with.

## Start project

To run this project simply run the following command in the terminal:

```bash
npm start
```

it will start the project on `http://localhost:4200/`

