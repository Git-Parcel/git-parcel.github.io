import { $schema } from './utils.ts'

type ParcelPath = string

/**
 * RepoMeta is the schema for the meta file of a Git Parcel repository.
 *
 * It lists all parcels in the repository.
 */
export type RepoMeta = $schema & {
  /**
   * List of path to parcels, relative to this meta file
   *
   * ## Example
   *
   * If the repository has directory structure like this:
   *
   * ```
   * repo/
   * ├─ houses/
   * │  ├─ alice_house/
   * │  │  └─ *
   * │  └─ bob_house/
   * │     └─ *
   * └─ common/
   *    └─ bus_station/
   *       └─ *
   * ```
   *
   * You can write it like this:
   *
   * ```json
   * {
   *   "parcels": [
   *     "houses/alice_house",
   *     "houses/bob_house",
   *     "common/bus_station"
   *   ]
   * }
   * ```
   */
  parcels: ParcelPath[]
}
