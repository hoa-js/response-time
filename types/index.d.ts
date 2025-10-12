import type { HoaMiddleware } from 'hoa'

export interface ResponseTimeOptions {
  /**
   * Number of digits to keep when formatting milliseconds.
   * Default: 0 (integer milliseconds)
   */
  digits?: number
  /**
   * Header name to set.
   * Default: 'X-Response-Time'
   */
  header?: string
  /**
   * Whether to append the 'ms' suffix to the header value.
   * Default: true
   */
  suffix?: boolean
}

export function responseTime(options?: ResponseTimeOptions): HoaMiddleware

export default responseTime