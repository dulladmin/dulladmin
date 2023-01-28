import type { GeneratedFile } from '@dulladmin/core'

export function i18nFile(messages: Record<string, string>, outfile: string): GeneratedFile[] {
  const defaultLocale = 'en-US'
  const availableLocales = ['en-US', 'zh-CN']
  return availableLocales.map((locale) => {
    const i18nMessages =
      locale === defaultLocale ? messages : Object.keys(messages).reduce((a, v) => ({ ...a, [v]: null }), {})

    const outfilePath = `src/locale/${locale}/modules/${outfile}.json`
    const outfileContent = JSON.stringify(i18nMessages, null, 2)
    return { path: outfilePath, content: outfileContent + '\n' }
  })
}
