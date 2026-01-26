import { searchFiles } from './searchFiles'
import { promises as fs } from 'fs'
import sharp, { type WebpOptions } from 'sharp'

const webpOptions: sharp.WebpOptions = {
  quality: 80,
}

;(async () => {
  const SEARCH_TARGET_DIR = './public/assets/images'
  const imageFileInfos = await searchFiles(SEARCH_TARGET_DIR)
  for (const { dirName, fileName, ext } of imageFileInfos) {
    const webpOption: WebpOptions = {}
    switch (ext) {
      case '.jpeg':
      case '.jpg':
        webpOption.lossless = false
        webpOption.quality = 80
        break
      case '.png':
        webpOption.lossless = false
        webpOption.quality = 80
        break
    }
    await sharp(`./${dirName}/${fileName}`)
      .webp(webpOption)
      .toFile(`./${dirName}/${fileName.split('.')[0]}.webp`)
    await fs.unlink(`./${dirName}/${fileName}`)
    console.log(`${dirName}/${fileName} converted to WebP.`)
  }
})()
