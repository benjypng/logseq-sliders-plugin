import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

export const callSettings = () => {
  const settings: SettingSchemaDesc[] = [
    {
      key: "thumbColour",
      type: "string",
      default: "pink",
      description: "Colour of thumb in input range.",
      title: "Thumb colour",
    },
    {
      key: "trackColour",
      type: "string",
      default: "tomato",
      description: "Colour of range in input range.",
      title: "Range colour",
    },
    {
      key: "hideSliderValue",
      type: "boolean",
      default: false,
      description: "Hide values for the sliders.",
      title: "Hide sliders' value",
    },
  ];

  logseq.useSettingsSchema(settings);
};
