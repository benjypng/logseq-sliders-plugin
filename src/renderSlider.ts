import "@logseq/libs";

declare global {
  interface Window {
    HTMLDivElement: any;
  }
}

export const renderSlider = (id: string) => {
  const HTMLDivEl: typeof HTMLDivElement = top?.HTMLDivElement;

  const NAME = `slider-${id}`;

  class Slider extends HTMLDivEl {
    constructor() {
      super();
    }

    static get observedAttributes() {
      return ["data-latex", "data-uuid"];
    }

    async connectedCallback() {
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
      this.innerHTML = `<input tabindex="-1" id=${id} type="range" min="0" max=${
        !params ? 10 : params
      } value=${rangeValue} />`;
      top?.document
        .getElementById(id)
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
      extends: "div",
    });
  }
};
