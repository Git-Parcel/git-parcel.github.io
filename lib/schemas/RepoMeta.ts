import { $schema } from './utils.ts'

type ParcelPath = string

/**
 * The meta file of a Git Parcel repository.
 *
 * This file:
 *
 * - should be in the root directory of the repository.
 * - lists all the parcels in this repository.
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
