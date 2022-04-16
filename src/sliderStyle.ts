export const sliderStyle = (uuid: string) => {
  const { trackColour, thumbColour, hideSliderValue } = logseq.settings;

  return `
input[type="range"] {
 -webkit-appearance: none;
}

#block-content-${uuid} .block-properties {
 display: ${hideSliderValue ? "none !important" : "content !imoprtant"}
}

input[type="range"]:focus {
 outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
 background: ${trackColour};
 height: 5px;
}

input[type="range"]::-moz-range-track {
 background: tomato;
 height: 5px;
}

input[type="range"]::-webkit-slider-thumb {
 -webkit-appearance: none;
 height: 15px;
 width: 15px;
 background: ${thumbColour};
 margin-top: -5px;
 border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
 height: 15px;
 width: 15px;
 background: pink;
 margin-top: -5px;
 border-radius: 50%;
}
`;
};
