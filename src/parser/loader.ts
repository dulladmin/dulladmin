import * as yaml from 'js-yaml'
import { BlockRelationshipType } from './structs'

interface YamlResourceType {
  name?: string
  views?: YamlViewsType
}

interface YamlViewsType {
  index?: YamlViewType
  show?: YamlViewType
  new?: YamlViewType
  edit?: YamlViewType
}

interface YamlViewType {
  blocks?: YamlBlockType[]
}

interface YamlBlockType {
  relationship?: string
  name?: string
  table?: YamlBlockTableType
  descriptions?: YamlBlockDescriptionsType
  form?: YamlBlockFormType
}

interface YamlBlockTableType {
  items?: YamlModelAttributeType[]
}

interface YamlBlockDescriptionsType {
  items?: YamlModelAttributeType[]
}

interface YamlBlockFormType {
  items?: YamlModelAttributeType[]
}

interface YamlModelAttributeType {
  name?: string
  type?: string
}

function load(str: string): YamlResourceType {
  return yaml.load(str) as YamlResourceType
}

function assertNotNull(fieldValue: unknown, fieldName: string): void {
  if (fieldValue != null) return
  throw new Error(`Field \`${fieldName}\` is required`)
}

function assertIsArray(fieldValue: unknown, fieldName: string): void {
  if (Array.isArray(fieldValue)) return
  throw new Error(`Field \`${fieldName}\` must be an array`)
}

function assertIsBlockRelationshipType(fieldValue: unknown, fieldName: string): void {
  if (Object.values(BlockRelationshipType).includes(fieldValue as BlockRelationshipType)) return
  throw new Error(`Field \`${fieldName}\` must be one of ["self", "has_one", "has_many"]}`)
}

export {
  YamlResourceType,
  YamlViewsType,
  YamlViewType,
  YamlBlockType,
  YamlBlockTableType,
  YamlBlockDescriptionsType,
  YamlBlockFormType,
  YamlModelAttributeType,
  load,
  assertNotNull,
  assertIsArray,
  assertIsBlockRelationshipType
}
