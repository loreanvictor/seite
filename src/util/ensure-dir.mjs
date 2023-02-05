import { access, mkdir } from 'fs/promises'
import { dirname } from 'path'


export const ensureDir = async (path) => {
  const dir = dirname(path)
  try {
    await access(dir)
  } catch(err) {
    await mkdir(dir, {recursive: true})
  }
}
