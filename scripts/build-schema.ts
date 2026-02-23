import tsj from 'ts-json-schema-generator'
import * as fs from '@leawind/inventory/fs'
import log from '@leawind/inventory/log'

const INPUT_SCHEMA_INDEX = `lib/schemas/index.ts`
const OUTPUT_SCHEMA_DIR = `dist/schemas`
const getSchemaId = (name: string) =>
  `https://git-parcel.github.io/schemas/${name}.json`

const CONFIG: tsj.Config = {
  path: INPUT_SCHEMA_INDEX,
  discriminatorType: 'open-api',
  encodeRefs: false,
  expose: 'export',
  functions: 'comment',
  jsDoc: 'extended',
  markdownDescription: true,
  fullDescription: false,
  skipTypeCheck: true,
  sortProps: true,
  topRef: true,
}

function main() {
  const exportedTypes = extractExportedTypes()

  log.info(`Exported types: ${exportedTypes.join(', ')}`)

  for (const typeName of exportedTypes) {
    const output = fs.p`${OUTPUT_SCHEMA_DIR}/${typeName}.json`
    const config = {
      ...CONFIG,
      type: typeName,
      schemaId: getSchemaId(typeName),
    }

    const generator = tsj.createGenerator(config)
    const schema = generator.createSchema(config.type)
    fs.makeParentDir(output)
    fs.Path.from(output).writeSync(JSON.stringify(schema, null, 2))
    log.info(`Generated schema for ${typeName} at ${output}`)
  }
}

/**
 * Extract all exported types from the schema file
 */
function extractExportedTypes(): string[] {
  const generator = tsj.createGenerator({
    path: INPUT_SCHEMA_INDEX,
    discriminatorType: 'open-api',
    encodeRefs: false,
    expose: 'export',
    functions: 'comment',
    jsDoc: 'extended',
    skipTypeCheck: true,
    sortProps: true,
    topRef: true,
  })

  // Create a schema that includes all exported types
  const fullSchema = generator.createSchema()
  const definitions = fullSchema.definitions || fullSchema['$defs'] || {}
  return Object.keys(definitions)
}

main()
