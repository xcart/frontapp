import {RefObject, useEffect} from 'react'
import createHandlerSetter from './factory/createHandlerSetter'
import safeHasOwnProperty from './shared/safeHasOwnProperty'

/**
 * Accepts the reference to an HTML Element and an event name then performs the necessary operations to listen to the event
 * when fired from that HTML Element.
 */
const useEvent = <
  TEvent extends Event,
  TElement extends HTMLElement = HTMLElement,
>(
  ref: RefObject<TElement>,
  eventName: string,
  options?: AddEventListenerOptions,
) => {
  const [handler, setHandler] = createHandlerSetter<TEvent>()

  if (!!ref && !safeHasOwnProperty(ref, 'current')) {
    throw new Error('Unable to assign any scroll event to the given ref')
  }

  useEffect(() => {
    // @ts-ignore
    const cb: EventListenerOrEventListenerObject = (event: TEvent) => {
      if (handler.current) {
        handler.current(event)
      }
    }

    const refCurrent = ref.current
    const handlerCurrent = handler.current

    if (refCurrent && refCurrent.addEventListener && handlerCurrent) {
      refCurrent.addEventListener(eventName, cb, options)
    }

    return () => {
      const a = refCurrent?.addEventListener
      if (refCurrent && a && handlerCurrent) {
        refCurrent.removeEventListener(eventName, cb, options)
      }
    }
  }, [eventName, ref.current, options])

  return setHandler
}

export default useEvent
