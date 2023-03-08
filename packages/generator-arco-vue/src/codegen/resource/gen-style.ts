import { Resource } from '@dulladmin/core'
import type { GeneratedFile } from '@dulladmin/core'
import { toPath } from '../../naming'
import { handlebarsFile } from '../base'

export function genStyle(resource: Resource): GeneratedFile[] {
  return [
    {
      ...handlebarsFile(
        `src/assets/style/modules/${toPath(resource.name)}.less`,
        'src/assets/style/modules/__resource__.less.hbs',
        {}
      ),
      ignoreExisting: true
    }
  ]
}
