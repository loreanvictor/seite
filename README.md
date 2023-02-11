<br>

<img src="./logo-light.svg#gh-light-mode-only" height="44px"/>
<img src="./logo-dark.svg#gh-dark-mode-only" height="44px"/>

<br>

Create batteries-included docs and blogs from markdown and HTML files with zero configuration.
Supports frontmatter, code highlighting, navigation, custom layouts and scripts, Web Components, and more.

```bash
npx seite
```

<div align="right">

[![version](https://img.shields.io/npm/v/seite?label=&color=black&style=flat-square)](https://www.npmjs.com/package/seite)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/seite/coverage.yml?label=%20&style=flat-square)](https://github.com/loreanvictor/seite/actions/workflows/coverage.yml)

</div>


<br>


## Work in Progress

This is a work in progress, and is not yet ready for use. I'll be adding more features and documentation as I go.
In this bit I'll outline what [**Seite**](.) is supposed to become / achieve:

- It should turn a README of a project into a nice looking doc with zero effort.
  ```bash
  npx seite

  # 👆 This should turn the README.md file into a 
  #    nice looking doc, ready to be deployed to gh-pages.
  ```
- It should support long one-pager docs, as well as multi-page websites.
  ```md
  # Intro

  Some intro text.

  <include src="./section-one.md" />
  <include src="./section-two.md" />

  <!-- It should also automatically generate ToC from these. -->
  ```
- It should handle relative imports, and this should be the main mechanism it handles assets, scripts, layouts and styles.
  ```html
  <img src="./logo.svg" />

  <link rel="stylesheet" href="../some.css" />
  <style>
    @import './some-other.css';
  </style>
  <script type="module">
    import * from '../some.js'
  </script>

  <!--
    Everything should be automatically packed alongside
    built files, also supporting assets imported from the scripts
    ands styles.
  -->
  ```
- It should allow environmental styles, scripts, layouts, and frontmatter, so that the markdown files would still be readable on GitHub.
  ```md
  <!-- README.md -->

  # Welcome to my project

  ...
  ```
  ```css
  /* _seite.css */

  p {
    color: red;
  }
  /* This should be applied only when the site is built. */
  ```
  ```html
  <!-- _seite.html -->
  <header>Some stuff</header>
  <slot></slot>
  <include src="./footer.md" />

  <!-- This acts as the layout for the page when it is built. -->
  ```
- It should get all the minimal amount of config it needs from frontmatter (and environmental frontmatter).
  ```md
  ---
  title: My Project
  description: This is my project.
  code theme light: A11YLight
  code theme dark: A11YDark
  ---

  # Welcome to my project

  ...
  ```
- It should support Web Components with SSR for custom content.
  ```html
  <h1>My Thoughts on Stuff</h1>
  <author-and-date></author-and-date>

  <!--
    The author and date info should also be automatically fetched
    from git commits, and the component should be able to pick
    these up at the server and the client.
    -->
  ```

<br>

## Roadmap

- [x] ~~Add environment manager~~
- [x] ~~Add input management (multiple files, dest folders, etc)~~
- [x] ~~Add support for html entries~~
- [ ] Add chain asset management
- [ ] Add layout management (layout & include directives)
- [ ] Add environmental scripts
- [ ] Add environmental layouts
- [ ] Add environmental frontmatter and config management
- [ ] Add auto ToC
- [ ] Add Web Components support w/ SSR
