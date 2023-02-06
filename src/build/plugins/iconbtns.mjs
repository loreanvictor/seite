import style from './style.mjs'


export default () => tree => {
  style({ url: 'https://esm.sh/graphis/font/graphis.css', defer: true })(tree)
  style(`.icon {
    font-family: graphis, sans-serif;
    font-size: 1rem;
  }`)(tree)
}

