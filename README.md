<br><br>

<img src="./logo-light.svg#gh-light-mode-only" height="48px"/>
<img src="./logo-dark.svg#gh-dark-mode-only" height="48px"/>

<sup>fastest way for writing stuff</sup>

<br>

## MVP idea

Basically, it should be possible to just run this on the README of any OSS project and it produces a pretty nice
one pager documentation. It also should generally make it super easy to build one-pager docs, blog posts, etc.

- You just pass HTML or markdown files to `seite`, and a nice, beautiful web page, ready for deploying to gh pages is produced
- It provides nice overridable defaults (styling, features, etc)
- It detects a ToC and places it in the correct place
- It makes making a one-pager doc easy by automatically including sections from neighboring files based on the ToC

## Follow up steps

- It supports SSR for Web Components
- For multipage websites, it supports client-side routing
- It utilizes contextual info (e.g. repo)
