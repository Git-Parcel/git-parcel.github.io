import * as fs from '@leawind/inventory/fs'
import { Path } from '@leawind/inventory/fs'
import { INPUT, OUTPUT, OUTPUT_KEEP } from './env.ts'
import { Schema } from 'ts-json-schema-generator'
import { SchemaUtils } from './lib/schemas.ts'
import { redirect } from './lib/redirect.ts'

// Clean output directory
if (await fs.exists(OUTPUT)) {
	const toRemove = OUTPUT.listSync()
		.filter((item) => {
			const rel = item.relative(OUTPUT).str
			for (const keep of OUTPUT_KEEP) {
				if (keep instanceof RegExp) {
					if (keep.test(rel)) {
						return false
					}
				} else if (keep === rel) {
					return false
				}
			}
			return true
		})
	toRemove.forEach((item) => item.removeSync({ recursive: true }))
}

// Copy static files
{
	fs.copySync(INPUT.join('copied'), OUTPUT)
}

// Redirect urls
{
	const CONFIG = {
		'index.html': '/docs/',
		'404.html': '/docs/404',
	}
	for (const [file, target] of Object.entries(CONFIG)) {
		redirect(OUTPUT.join(file), target)
	}
}

// Build schemas
{
	const inputDir = INPUT.join('schemas')
	const outputDir = OUTPUT.join('schema')

	const schemas: Record<string, Schema> = {}

	// Parse schemas
	for await (const file of fs.walkFile(inputDir.str, /.*\.ts$/)) {
		const src = fs.Path.from(file)

		const relative = src.relative(inputDir).noExt
		schemas[relative] = SchemaUtils.parse(src, inputDir)
	}

	// Write schemas
	for (const [relative, schema] of Object.entries(schemas)) {
		const dst = outputDir.join(relative + '.json')
		Path.from(dst).write(JSON.stringify(schema, null, 2))
	}

	// Write index
	{
		const indexFile = outputDir.join('index.html')
		const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Schemas</title>
</head>
<body>
	<h1>Schemas</h1>
	<ul>
		${
			Object.keys(schemas).map((rel) => {
				rel += '.json'
				return `<li><a href="${rel}">${rel}</a></li>`
			}).join('\n')
		}
	</ul>
</body>
</html>
`
		indexFile.write(html)
	}
}
