/**
 * Make a type nullable by allowing null or undefined values
 *
 * @example
 * ```typescript
 * type User {
 *  id: string;
 *  name: string;
 * }
 *
 * // Can be null, undefined or User
 * type NullableUser = Nullable<User>
 * ```
 **/
export type Nullable<T> = null | undefined | T
