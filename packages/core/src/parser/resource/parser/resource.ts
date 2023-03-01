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
  const allowedFiledNames = ['index', 'show', 'new', 'edit', 'delete']
  assertFieldNames(doc, allowedFiledNames, xpath)

  const views = []
  if (doc.index != null) views.push(parseView(doc.index, xpath + '/index', { name: 'index' }))
  if (doc.show != null) views.push(parseView(doc.show, xpath + '/show', { name: 'show' }))
  if (doc.new != null) views.push(parseView(doc.new, xpath + '/new', { name: 'new' }))
  if (doc.edit != null) views.push(parseView(doc.edit, xpath + '/edit', { name: 'edit' }))
  if (doc.delete != null) views.push(parseView(doc.delete, xpath + '/delete', { name: 'delete' }))
  return views
}
