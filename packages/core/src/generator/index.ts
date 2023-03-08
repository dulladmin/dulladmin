export interface GeneratedFile {
  path: string
  content: string
  ignoreExisting?: boolean
}

export interface ClientInstallRequest {
  dulladminDir: string
}
export interface ClientInstallResponse {
  code: number
  msg: string
  data: {
    templateDir: string
    postinstallScript: string
  }
}

export interface ClientUpdateRequest {
  dulladminDir: string
}
export interface ClientUpdateResponse {
  code: number
  msg: string
  data: {
    templateDir: string
    ignore: string[]
    postupdateScript: string
  }
}

export interface BuildRequest {
  dulladminDir: string
}
export interface BuildResponse {
  code: number
  msg: string
  data: {
    files?: Record<string, GeneratedFile[]>
    errors?: Record<string, string>
  }
}

export interface Generator {
  clientInstall: (req: ClientInstallRequest) => ClientInstallResponse
  clientUpdate: (req: ClientUpdateRequest) => ClientUpdateResponse
  build: (req: BuildRequest) => BuildResponse
}
