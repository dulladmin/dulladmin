/* eslint-disable @typescript-eslint/naming-convention */
import type { GeneratedFile } from '@dulladmin/core'
import { i18nFile } from '../utils'

export function genAppConfig(): GeneratedFile[] {
  return [genAppConfig_config(), ...genAppConfig_i18n()]
}

export function genAppConfig_config(): GeneratedFile {
  const data: Record<string, any> = {}
  data['app.creationDate'] = new Date().toISOString()
  data['app.topMenu'] = false

  const outfilePath = 'src/config/config.json'
  const outfileContent = JSON.stringify(data, null, 2)
  return { path: outfilePath, content: outfileContent + '\n' }
}

export function genAppConfig_i18n(): GeneratedFile[] {
  const messages: Record<string, string> = {}
  messages['site.name'] = 'DullAdmin'
  messages['site.description'] = 'a specification for building admin panel'
  messages['site.author'] = 'DullAdmin Team'
  messages['site.author.url'] = 'https://github.com/dulladmin'

  return i18nFile('07-app-site', messages)
}
