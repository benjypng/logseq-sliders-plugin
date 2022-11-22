export const sliderStyle = (uuid: string, id: string) => {
  const { trackColour, thumbColour, hideSliderValue } = logseq.settings;

  return `
  #slider-${id} {
   -webkit-appearance: none;
  }

  #block-content-${uuid} .block-properties {
   display: ${hideSliderValue ? "none !important" : "content !imoprtant"}
  }

  #slider-${id}:focus {
   outline: none;
  }

  #slider-${id}::-webkit-slider-runnable-track {
   background: ${trackColour};
   height: 5px;
	 cursor: pointer;
  }

  #slider-${id}::-webkit-slider-thumb {
   -webkit-appearance: none;
   height: 15px;
   width: 15px;
   background: ${thumbColour};
   margin-top: -5px;
   border-radius: 50%;
		cursor: pointer;
  }

	#value-${id} {
		margin-left: 10px;
		font-size: 10px;
		padding: 3px;
		border: 1px solid black;
		border-radius: 12px;
	}
  `;
};
