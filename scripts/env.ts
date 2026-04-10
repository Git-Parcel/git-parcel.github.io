import * as fs from '@leawind/inventory/fs'

export const INPUT = fs.P`src`
export const OUTPUT = fs.P`dist`
export const OUTPUT_KEEP: (string | RegExp)[] = [/docs.*/]

export const DOMAIN = `git-parcel.github.io`
