import {
  Application,
  Assets,
  Text,
  Spritesheet,
  Texture,
  Sprite,
  TilingSprite,
} from "pixi.js"
import atlasData from "@/assets/spritesheets/pieces-spritesheet.json"

let base = '.'
if (import.meta.env.DEV)
  base = '../..'

const load = async () => {
  return Promise.all([
    Assets.load(`${base}/assets/fonts/OpenSans-Medium.ttf`),
    Assets.load(`${base}/assets/spritesheets/pieces-spritesheet.png`),
    Assets.load(`${base}/assets/images/circuitboard.png`),
  ])
}

const drawText = async (app) => {
  const text = new Text({
    text: "2:20",
    style: {
      fontFamily: "OpenSans Medium",
      fontSize: 50,
      fill: "white",
    },
  })
  text.x = 500
  text.y = 200
  app.stage.addChild(text)
}

const sprites = async () => {
  const texture = Texture.from(
    `${base}/assets/spritesheets/pieces-spritesheet.png`,
  )
  const spritesheet = new Spritesheet(texture, atlasData)
  await spritesheet.parse()
  return spritesheet
}

const createBackground = (app) => {
  const circuitboardTexture = Texture.from(`${base}/assets/images/circuitboard.png`)
  const tilingSprite = new TilingSprite({
    texture: circuitboardTexture,
    width: app.screen.width,
    height: app.screen.height,
  })
  app.stage.addChild(tilingSprite)
  return tilingSprite
}

export const test = async () => {
  const app = new Application()
  await app.init({ background: "#000000", resizeTo: window })
  document.body.appendChild(app.canvas)

  await load()

  createBackground(app)

  drawText(app)
  const spritesheet = await sprites()
  const sprite = new Sprite(spritesheet.textures["pawn-w-trim.png"])
  sprite.x = 500
  sprite.y = 300
  sprite.eventMode = "static"
  app.stage.addChild(sprite)
}
