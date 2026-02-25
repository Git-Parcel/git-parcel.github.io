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

type ModDependency =
  | '*'
  | {
    /**
     * Minimum version (SemVer)
     */
    min?: string
    /**
     * Maximum version (SemVer)
     */
    max?: string
  }

/**
 * The meta file of a Parcel
 *
 * This file should be in the root directory of a parcel
 */
export type ParcelMeta = $schema & {
  /**
   * The format of parcel
   */
  format: ParcelFormat
  /**
   * Minecraft data version
   *
   * Refer to [Minecraft WIKI - Data version: List of data versions](https://minecraft.wiki/w/Data_version#List_of_data_versions)
   */
  dataVersion: number
  /**
   * Size of parcel in `X`, `Y`, `Z`.
   *
   * Must be positive integers.
   */
  size: [number, number, number]
  /**
   * Display name of the parcel
   *
   * It doesn't need to be unique. It's used for display purposes only.
   */
  name?: string
  /**
   * Description of the parcel
   */
  description?: string
  /**
   * Tags for categorizing
   */
  tags?: string[]
  /**
   * List of mods that are allowed to be used in the parcel
   *
   * - Key is the mod ID, usually in lowercase with underscore separator.
   * - Value is the mod dependency, `"*"` means any version
   *
   * ### Example
   *
   * ```json
   * {
   *   "mod_1": "*"
   *   "mod_2": { "min": "1.0.0", "max": "2.0.0" },
   *   "mod_3": { "min": "1.0.0" },
   *   "mod_4": { "max": "1.0.0" }
   * }
   * ```
   */
  mods?: Record<string, ModDependency>
  /**
   * Whether to include entities
   *
   * Default is `true`
   *
   * If `false`, the parcel will not save or load entities, and existing entity data will be treated as redundant and will be cleaned up when saving.
   */
  includeEntity?: boolean
}
