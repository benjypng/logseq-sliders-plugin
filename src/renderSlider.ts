import { sliderStyle } from "./sliderStyle";

export const renderSlider = (id: string) => {
	const HTMLSpanEl = top?.HTMLSpanElement;
	class Slider extends HTMLSpanEl {
		constructor() {
			console.log('element init')
			super();
		}

		static get observedAttributes() {
			return ["data-uuid"];
		}

		connectedCallback() {
			logseq.provideStyle(sliderStyle(this.uuid))
			this.render();
		}

		async render() {
			const slide = top?.document.createElement('input');
			slide!.type = "range";
			slide!.addEventListener('input', async (e) => {
				await logseq.Editor.upsertBlockProperty(this.uuid, "value", e.target!.value)
			});
			this.appendChild(slide)
		}

		get uuid() {
			return (
				this.getAttribute("data-uuid") ||
				this.closest('div[id^="block-content"]')?.getAttribute("blockid") ||
				""
			);
		}
	}

	top?.customElements.define(`slider-${id}`, Slider, {
		extends: "span",
	});
};
