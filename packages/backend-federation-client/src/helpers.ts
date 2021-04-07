/*
 * CS3099 Group A3
 */

export { HTTPError } from "got";

export class RemoteResponseError<T> extends Error {
  constructor(value: T) {
    super(`Invalid response: ${value}`);
  }
}

export function isStringArray(values: unknown): values is string[] {
  if (!Array.isArray(values)) {
    return false;
  }

  for (const value of values) {
    if (typeof value !== "string") {
      return false;
    }
  }

  return true;
}