import { Resource } from '../structs'

export interface GeneratedFile {
  path: string
  content: string
}

export interface Generator {
  readonly templateDir: string
  buildResource: (resource: Resource) => GeneratedFile[]
}
