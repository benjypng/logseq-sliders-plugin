import '@logseq/libs'

import css from './index.css?raw'
import { settings } from './settings'

interface SliderClickEvent {
  type: 'click'
  value: string
  id: string
  className: string
  dataset: {
    onClick: string
  }
}

const main = () => {
  console.log('logseq-sliders-plugin loaded')
  logseq.provideStyle(css)

  logseq.Editor.registerSlashCommand('Insert slider', async (e) => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :slider_${e.uuid}, ${logseq.settings!.defaultPropertyKey}, 1, 10}}`,
    )
  })

  logseq.App.onMacroRendererSlotted(
    async ({ slot, payload: { uuid, arguments: args } }) => {
      const [type, property, min, max] = args
      if (!type || !type.startsWith(':slider_') || !property || !min || !max)
        return

      const sliderId = `slider_${uuid}_${slot}`
      const value = await logseq.Editor.getBlockProperty(uuid, property)

      logseq.provideModel({
        async [`slide-${sliderId}`](e: SliderClickEvent) {
          await logseq.Editor.upsertBlockProperty(uuid, property, e.value)
        },
      })

      logseq.provideUI({
        key: sliderId,
        slot,
        reset: true,
        template: `<div class="slider-container"><div class="slider-end">${min}</div><input type="range" class="slider" id="${sliderId}" data-on-click="slide-${sliderId}" min="${min}" max="${max}" value="${value}"><div class="slider-end">${max}</div></div>`,
      })
    },
  )
}

logseq.useSettingsSchema(settings).ready(main).catch(console.error)
