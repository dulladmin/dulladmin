export interface GeneratedFile {
  path: string
  content: string
}

export interface BuildInfo {
  code: number
  msg: string
  data?: {
    files: Record<string, GeneratedFile[]>
  }
}

export interface Generator {
  readonly templateDir: string
  build: (dulladminDir: string) => BuildInfo
}
