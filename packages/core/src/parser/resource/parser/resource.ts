import { Resource, View } from '../../../structs'
import {
  assertFieldNames,
  assertFieldNamesRegexp,
  assertNotNull,
  assertIsArray,
  assertIsObject,
  assertIsString
} from '../../assert'
import { YamlResourceType, YamlViewsType } from '../loader'
import { parseView } from './view'

export function parseResource(doc: YamlResourceType): Resource {
  if (doc.singular == null) doc.singular = false

  const allowedFiledNames = ['name', 'singular', 'authority', 'views']
  assertFieldNames(doc, allowedFiledNames, '/')

  const name = doc.name
  const nameXPath = '/name'
  assertNotNull(name, nameXPath)
  assertIsString(name, nameXPath)

  const authority = doc.authority ?? null
  const authorityXPath = '/authority'
  if (authority != null) {
    assertIsArray(authority, authorityXPath)
    authority.forEach((item, idx) => {
      assertIsString(item, authorityXPath + `[${idx}]`)
    })
  }

  const views = doc.views
  const viewsXPath = '/views'
  assertNotNull(views, viewsXPath)
  assertIsObject(views, viewsXPath)
  const parsedViews = parseViews(views!, viewsXPath)

  return new Resource(name!, doc.singular, authority, parsedViews)
}

function parseViews(doc: YamlViewsType, xpath: string): View[] {
  const allowedFiledNames = /^[a-zA-Z_]\w*/
  assertFieldNamesRegexp(doc, allowedFiledNames, xpath)

  const views: View[] = []
  Object.keys(doc).forEach((name) => {
    const _doc = doc[name as keyof typeof doc]!
    views.push(parseView(_doc, xpath + `/${name}`, { name }))
  })
  return views
}
