import { sliderStyle } from "./sliderStyle";

declare global {
  interface Window {
    HTMLSpanElement: any;
  }
}

export const renderSlider = (uniqueIdentifier: string) => {
  const HTMLDivEl: typeof HTMLSpanElement = top?.HTMLSpanElement;

  const NAME = `slider-${uniqueIdentifier}`;

  class Slider extends HTMLDivEl {
    constructor() {
      super();
    }

    static get observedAttributes() {
      return ["data-uuid"];
    }

    connectedCallback() {
      logseq.provideStyle(sliderStyle(this.uuid));
      this.render();
    }

    async render() {
      const rangeValue = await logseq.Editor.getBlockProperty(
        this.uuid,
        "value"
      );
      const blk = await logseq.Editor.getBlock(this.uuid);
      const params = blk.content.substring(
        blk.content.indexOf('"}') + 2,
        blk.content.indexOf("]")
      );
      this.innerHTML = `<input class="sliderLS" tabindex="-1" id=${uniqueIdentifier} type="range" min="0" max=${
        !params ? 10 : params
      } value=${rangeValue} />`;
      top?.document
        .getElementById(uniqueIdentifier)
        .addEventListener("input", async (e: any) => {
          await logseq.Editor.upsertBlockProperty(
            this.uuid,
            "value",
            e.target.value
          );
        });
    }

    get uuid() {
      return (
        this.getAttribute("data-uuid") ||
        this.closest('div[id^="block-content"]')?.getAttribute("blockid") ||
        ""
      );
    }
  }

  if (!top?.customElements.get(NAME)) {
    top?.customElements.define(NAME, Slider, {
      extends: "span",
    });
  }
};
