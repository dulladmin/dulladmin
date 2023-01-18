import { Resource } from '@/parser'

export interface GeneratedFile {
  name: string
  content: string
}

export interface Generator {
  readonly templateDir: string
  buildResource: (resource: Resource) => GeneratedFile[]
}
