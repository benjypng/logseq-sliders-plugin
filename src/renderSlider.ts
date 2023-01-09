import { sliderStyle } from "./sliderStyle";

declare global {
  interface Window {
    HTMLSpanElement: any;
  }
}

export const renderSlider = (id: string, slot: string) => {
  const HTMLSpanEl = top?.HTMLSpanElement;
  class Slider extends HTMLSpanEl {
    constructor() {
      super();
      this.width = "100%";
      this.marginTop = "-50px";
    }

    static get observedAttributes() {
      return ["data-uuid"];
    }

    get uuid() {
      return (
        this.getAttribute("data-uuid") ||
        this.closest('div[id^="block-content"]')?.getAttribute("blockid") ||
        ""
      );
    }

    connectedCallback() {
      logseq.provideStyle(sliderStyle(this.uuid, id));
      this.render();
    }

    async render() {
      const savedValue = await logseq.Editor.getBlockProperty(
        this.uuid,
        "value"
      );
      // Create slider
      const slider = top?.document.createElement("input");
      slider!.type = "range";
      slider!.id = `slider-${id}`;
      slider!.value = savedValue;
      slider!.setAttribute("data-slot-id", slot);

      const value = top?.document.createElement("span");
      value!.id = `value-${id}`;
      if (savedValue) {
        value!.style.visibility = "visible";
        value!.innerHTML = savedValue;
      } else {
        value!.style.visibility = "hidden";
      }

      slider!.addEventListener("input", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        value!.style.visibility = "visible";
        value!.innerHTML = (e.target as HTMLInputElement).value;
        await logseq.Editor.upsertBlockProperty(
          this.uuid,
          "value",
          (e.target as HTMLInputElement).value
        );
      });

      this.appendChild(slider);
      this.appendChild(value);
    }
  }

  if (!top?.customElements.get(`slider-${id}`)) {
    //@ts-expect-error
    top?.customElements.define(`slider-${id}`, Slider, {
      extends: "span",
    });
  }
};
