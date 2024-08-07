[:gift_heart: Sponsor this project on Github](https://github.com/sponsors/hkgnp) or [:coffee: Get me a coffee](https://www.buymeacoffee.com/hkgnp.dev) if you like this plugin!

# Introduction

This simple plugin inserts a slider into your note to serve as a great visualisation tool!

![](/screenshots/demo.gif)

# Usage

Use the slash command `/Insert slider`. This will insert a renderer: `{{renderer :slider_66b34ab4-6daf-4c65-bc88-521751b45571, value, 1, 10}}`. The parameters available to configure are as follows:

- `value`: This is the default property from the plugin settings. You may either change the default property, or make it slider-specific by changing the parameter in the renderer.
- `1`: This is the minimum value in your slider.
- `10`: This is the maximum value in your slider.

# Customise

Override the default css below in your own `custom.css` file.

```
.slider-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
}

.slider {
  height: 0.3rem;
  background: linear-gradient(to right, #d3d3d3, #d3d3d3),
    repeating-linear-gradient(
      to right,
      #888,
      #888 1px,
      transparent 1px,
      transparent 10%
    );
  background-size:
    100% 100%,
    100% 100%;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 12px;
}

.slider:hover {
  opacity: 1;
}

.slider-end {
  font-size: 0.6rem;
  margin: 0.5rem 0;
}
```

# Installation

If not available from the marketplace, simply download the release and manually load it into Logseq after unzipping it.
