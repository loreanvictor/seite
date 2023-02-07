import { select } from 'hast-util-select'


export default node => tree => {
  const head = select('head', tree)
  const main = select('main', tree)
  const body = select('body', tree)
  const target = head || main || body || tree

  target.children.push(node)
}
