import inflection from 'inflection'

export const toCamelize = (name: string): string => inflection.camelize(name)
export const toUnderscore = (name: string): string => inflection.underscore(name)
export const toDasherize = (name: string): string => inflection.dasherize(name)

export const toI18nMessage = (name: string): string => inflection.titleize(toUnderscore(name))
export const toPath = (name: string): string => inflection.dasherize(toUnderscore(name))
