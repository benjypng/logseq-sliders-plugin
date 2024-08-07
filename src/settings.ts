import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'defaultPropertyKey',
    type: 'string',
    default: 'value',
    title: 'Default Property Key',
    description: 'Indicate the property key associated with the slider value.',
  },
  {
    key: 'hidePropertyKey',
    type: 'boolean',
    default: false,
    title: 'Hide Property Key',
    description: 'Hide the slider value from the block properties.',
  },
]
