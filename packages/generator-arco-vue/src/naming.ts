import inflection from 'inflection'

export const toCamelizeName = (name: string): string => inflection.camelize(name)
export const toUnderscoreName = (name: string): string => inflection.underscore(name)

export const toPath = (name: string): string => inflection.dasherize(toUnderscoreName(name))
