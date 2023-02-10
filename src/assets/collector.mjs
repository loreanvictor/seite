import { selectAll } from 'hast-util-select'


export default (collect) => {
  const handle = path => collect(path.split('?')[0].split('#')[0])

  return (tree) => {
    selectAll('img[src^="./"], img[src^="../"]', tree)
      .forEach(img => handle(img.properties.src))
    selectAll('link[rel="stylesheet"][href^="./"], link[rel="stylesheet"][href^="../"]', tree)
      .forEach(link => handle(link.properties.href))
    selectAll('script[src^="./"], script[src^="../"]', tree)
      .forEach(script => handle(script.properties.src))
  }
}
