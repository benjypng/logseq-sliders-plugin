import "@logseq/libs";
import { callSettings } from "./callSettings";
import { renderSlider } from "./renderSlider";

function main() {
  console.log("logseq-sliders-plugin loaded");

  callSettings();

  // Generate unique identifier
  const id = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

  logseq.Editor.registerSlashCommand("Insert slider", async () => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :slider_${id}}} [:span {:is "slider-${id}"}]`
    );
  });

  logseq.App.onMacroRendererSlotted(function ({ payload, slot }) {
    const [type] = payload.arguments;
    if (!type.startsWith(":slider_")) return;
    const id = type.split("_")[1]?.trim();

    renderSlider(id, slot);
  });
}

logseq.ready(main).catch(console.error);
