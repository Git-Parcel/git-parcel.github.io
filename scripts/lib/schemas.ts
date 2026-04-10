import tsj, { Schema } from 'ts-json-schema-generator'
import { Path } from '@leawind/inventory/fs'
import { DOMAIN, OUTPUT } from '../env.ts'

export class SchemaUtils {
	/**
	 * @param src .ts 文件路径。必须导出一个 default interface Type，Type 是要生成的 schema 类型。
	 */
	public static parse(src: Path, base: Path): Schema {
		const typeName = src.relative(base).noExt
		const schemaId = `https://${DOMAIN}/schema/${typeName}.json`

		const config: tsj.Config = {
			path: src.str,
			type: 'Type',
			schemaId,
			discriminatorType: 'open-api',
			encodeRefs: false,
			expose: 'export',
			functions: 'comment',
			jsDoc: 'extended',
			markdownDescription: true,
			skipTypeCheck: true,
			sortProps: true,
			topRef: true,
			additionalProperties: true,
		}

		const generator = tsj.createGenerator(config)
		return generator.createSchema(config.type)
	}
}
