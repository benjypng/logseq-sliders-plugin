import "@logseq/libs";
import { callSettings } from "./callSettings";
import { renderSlider } from "./renderSlider";

function main() {
  console.log("logseq-sliders-plugin loaded");

  callSettings();

  // Generate unique identifier
  const uniqueIdentifier = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");

  logseq.Editor.registerSlashCommand("Insert slider", async () => {
    const id = uniqueIdentifier();
    await logseq.Editor.insertAtEditingCursor(
      `[:span {:is "slider-${id}"}]{{renderer :slider_${id}}}`
    );
  });

  logseq.App.onMacroRendererSlotted(async ({ payload }) => {
    const [type] = payload.arguments;
    if (!type.startsWith(":slider_")) return;
    const id = type.split("_")[1]?.trim();

    renderSlider(id);
  });
}

logseq.ready(main).catch(console.error);
