import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'defaultPropertyKey',
    type: 'string',
    default: 'value',
    title: 'Default Property Key',
    description: 'Indicate the property key associated with the slider value.',
  },
]
