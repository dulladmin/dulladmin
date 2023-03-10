import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'
export { isResourceAction, isSelfBlock } from '../renderdata/base'

export function handlebarsFile(
  outfilePath: string,
  templatePath: string,
  data: Record<string, any>,
  options?: Record<string, any>
): GeneratedFile {
  const { ignoreExisting } = options ?? {}
  const infilePath = path.join(generatorsDir, templatePath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))
  const outfileContent = infileContent(data)
  return { path: outfilePath, content: outfileContent, ignoreExisting }
}

export function i18nFile(
  outfile: string,
  messages: Record<string, string>,
  options?: Record<string, any>
): GeneratedFile[] {
  const { ignoreExisting } = options ?? {}
  const defaultLocale = 'en-US'
  const availableLocales = ['en-US', 'zh-CN']
  return availableLocales.map((locale) => {
    const data = locale === defaultLocale ? messages : Object.keys(messages).reduce((a, v) => ({ ...a, [v]: null }), {})
    const outfilePath = `src/locale/${locale}/modules/${outfile}.json`
    const outfileContent = JSON.stringify(data, null, 2)
    return { path: outfilePath, content: outfileContent + '\n', ignoreExisting }
  })
}
