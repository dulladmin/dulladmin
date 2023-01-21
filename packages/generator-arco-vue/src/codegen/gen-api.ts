/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'node:fs'
import path from 'node:path'
import Handlebars from 'handlebars'
import {
  Resource,
  ViewType,
  View,
  BlockType,
  Block,
  TableBlock,
  DescriptionsBlock,
  FormBlock,
  Model,
  ScalarValueType,
  ObjectValueType
} from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { generatorsDir } from '../files'
import { toPath } from '../naming'

const TYPES = {
  [ScalarValueType.Double]: 'number',
  [ScalarValueType.Float]: 'number',
  [ScalarValueType.Int32]: 'number',
  [ScalarValueType.Int64]: 'number',
  [ScalarValueType.Uint32]: 'number',
  [ScalarValueType.Uint64]: 'number',
  [ScalarValueType.Sint32]: 'number',
  [ScalarValueType.Sint64]: 'number',
  [ScalarValueType.Fixed32]: 'number',
  [ScalarValueType.Fixed64]: 'number',
  [ScalarValueType.Sfixed32]: 'number',
  [ScalarValueType.Sfixed64]: 'number',
  [ScalarValueType.Bool]: 'boolean',
  [ScalarValueType.String]: 'string',
  [ScalarValueType.Datetime]: 'string',
  [ObjectValueType.Object]: 'object'
}

export function genAPI(resource: Resource): GeneratedFile[] {
  return genAPI_Resource(resource)
}

function genAPI_Resource(resource: Resource): GeneratedFile[] {
  return resource.views
    .map((view) => genAPI_View(resource, view))
    .reduce<GeneratedFile[]>((acc, files) => acc.concat(files), [])
}

function genAPI_View(resource: Resource, view: View): GeneratedFile[] {
  return view.blocks
    .map((block) => genAPI_Block(resource, view, block))
    .reduce<GeneratedFile[]>((acc, file) => acc.concat([file]), [])
}

function genAPI_Block(resource: Resource, view: View, block: Block): GeneratedFile {
  switch (block.type) {
    case BlockType.TableBlock:
      return genAPI_TableBlock(resource, view, block)
    case BlockType.DescriptionsBlock:
      return genAPI_DescriptionsBlock(resource, view, block)
    case BlockType.FormBlock:
      return genAPI_FormBlock(resource, view, block)
  }
}

function genAPI_TableBlock(resource: Resource, view: View, block: TableBlock): GeneratedFile {
  const { url, requiredID } = calcUrl(resource, view, block)
  const model = calcModel(block.model)

  const infileRawPath = 'src/api/modules/__resource__/__view__/__table_block__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/api/modules/${resourceName}/${viewName}/${blockName}.ts`
  const outfileContent = infileContent({ url, requiredID, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}

function genAPI_DescriptionsBlock(resource: Resource, view: View, block: DescriptionsBlock): GeneratedFile {
  const { url, requiredID } = calcUrl(resource, view, block)
  const model = calcModel(block.model)

  const infileRawPath = 'src/api/modules/__resource__/__view__/__descriptions_block__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/api/modules/${resourceName}/${viewName}/${blockName}.ts`
  const outfileContent = infileContent({ url, requiredID, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}

function genAPI_FormBlock(resource: Resource, view: View, block: FormBlock): GeneratedFile {
  const { url, requiredID } = calcUrl(resource, view, block)
  const model = calcModel(block.model)

  const infileRawPath = 'src/api/modules/__resource__/__view__/__form_block__.ts.hbs'
  const infilePath = path.join(generatorsDir, infileRawPath)
  const infileContent = Handlebars.compile(fs.readFileSync(infilePath, 'utf-8'))

  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)
  const outfilePath = `src/api/modules/${resourceName}/${viewName}/${blockName}.ts`
  const outfileContent = infileContent({ url, requiredID, model })
  const outfile = { path: outfilePath, content: outfileContent }

  return outfile
}

function calcUrl(resource: Resource, view: View, block: Block): Record<string, any> {
  const resourceName = toPath(resource.name)
  const viewName = toPath(view.type)
  const blockName = toPath(block.relName)

  switch (view.type) {
    case ViewType.Index:
    case ViewType.New:
      return {
        url: `/${resourceName}/${viewName}/${blockName}`,
        requiredID: false
      }
    case ViewType.Show:
    case ViewType.Edit:
      if (resource.singular) {
        return {
          url: `/${resourceName}/${viewName}/${blockName}`,
          requiredID: false
        }
      }
      return {
        url: `/${resourceName}/\${id}/${viewName}/${blockName}`,
        requiredID: true
      }
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function calcModel(model: Model) {
  return {
    attributes: model.attributes.map((attr) => {
      return {
        name: attr.name,
        type: TYPES[attr.type],
        collection: attr.collection,
        object:
          attr.object == null
            ? null
            : {
                attributes: attr.object.attributes.map((obj_attr) => {
                  return {
                    name: obj_attr.name,
                    type: TYPES[obj_attr.type],
                    collection: obj_attr.collection
                  }
                })
              }
      }
    })
  }
}
