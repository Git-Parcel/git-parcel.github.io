import { $schema } from './utils.ts'

type ParcelFormat = {
	/**
	 * Parcel format ID
	 */
  id: string
	/**
	 * Parcel format version
	 */
  version: number
}

type ModDependency = {
  id: string
  /** Minimum version (SemVer) */
  min?: string
  /** Maximum version (SemVer) */
  max?: string
}

export type ParcelMeta = $schema & {
  /** The format of parcel */
  format: ParcelFormat
  /** Minecraft data version */
  dataVersion: number
  /** Size of parcel in X,Y,Z */
  size: [number, number, number]
  name?: string
  description?: string
  /** Tags for searching */
  tags?: string[]
  /**
   * List of mods that are allowed to be used in the parcel
   */
  mods?: ModDependency[]
  /**
   * Whether to include blocks
   *
   * @default true
   */
  includeBlock?: boolean
  /**
   * Whether to include entities
   *
   * @default false
   */
  includeEntity?: boolean
}
