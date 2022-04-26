import "@logseq/libs";
import { callSettings } from "./callSettings";
import { renderSlider } from "./renderSlider";

const main = () => {
  console.log("logseq-sliders-plugin loaded");

  callSettings();

  // Generate unique identifier
  const uniqueIdentifier = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");

  logseq.Editor.registerSlashCommand("Insert slider", async () => {
    const id = uniqueIdentifier();
    await logseq.Editor.insertAtEditingCursor(`[:span {:is "slider-${id}"}]`);

    renderSlider(id);
  });
};
logseq.ready(main).catch(console.error);
