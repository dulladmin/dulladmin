import type { GeneratedFile } from '@dulladmin/core'
import { i18nFile } from '../utils'

export function genAppSite(): GeneratedFile[] {
  const messages: Record<string, string> = {}
  messages['site.name'] = 'DullAdmin'
  messages['site.description'] = 'a specification for building admin panel'
  messages['site.author'] = 'DullAdmin Team'
  messages['site.author.url'] = 'https://github.com/dulladmin'
  messages['site.creationDate'] = new Date().toISOString()

  return [...i18nFile('07-app-site', messages)]
}
