import { Resource, View } from '@dulladmin/core'
import { toI18nMessage, toPath } from '../../naming'

export function extractViewInfo(resource: Resource, view: View): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const i18nKeyPrefix = `${resourceName}--${viewName}`

  return {
    title: {
      i18nKey: `${i18nKeyPrefix}.title`,
      i18nValue: `${toI18nMessage(resourceName)} ${toI18nMessage(viewName)}`
    }
  }
}
