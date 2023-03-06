import { Resource, View } from '../../../structs'
import { assertFieldNames, assertNotNull, assertIsArray, assertIsObject, assertIsString } from '../../assert'
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
  const allowedFiledNames = ['index', 'new', 'show', 'edit', 'delete', '~']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const views: View[] = []
  Object.keys(doc).forEach((name) => {
    if (name === 'index') views.push(parseView(doc.index!, xpath + '/index', { name }))
    if (name === 'new') views.push(parseView(doc.new!, xpath + '/new', { name }))
    if (name === 'show') views.push(parseView(doc.show!, xpath + '/show', { name }))
    if (name === 'edit') views.push(parseView(doc.edit!, xpath + '/edit', { name }))
    if (name === 'delete') views.push(parseView(doc.delete!, xpath + '/delete', { name }))

    const _doc = doc[name as keyof typeof doc]!
    if (name.startsWith('~')) views.push(parseView(_doc, xpath + `/${name}`, { name: name.slice(1) }))
  })
  return views
}
