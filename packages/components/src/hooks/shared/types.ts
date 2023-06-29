/**
 * Typed generic callback function, used mostly internally
 * to defined callback setters
 */
export interface SomeCallback<TArgs, TResult = void> {
  (...args: TArgs[]): TResult
}

/**
 * A callback setter is generally used to set the value of
 * a callback that will be used to perform updates
 */
export interface CallbackSetter<TArgs> {
  (nextCallback: SomeCallback<TArgs>): void
}
