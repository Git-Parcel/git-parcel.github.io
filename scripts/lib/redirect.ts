import { Path, PathLike } from '@leawind/inventory/fs'

export type Options = {
	file: PathLike
	target: string
}

export function redirect(file: PathLike, target: string) {
	Path.from(file).writeSync(`<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="refresh" content="0; url=${target}" />
		<title>Redirecting</title>
		<script>
			location.href = '${target}'
		</script>
	</head>

	<body>
		<p><a href="${target}">Redirecting, click here if it doesn't work</a></p>
	</body>
</html>
`)
}
