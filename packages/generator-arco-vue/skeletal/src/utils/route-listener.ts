/**
 * Listening to routes alone would waste rendering performance. Use the
 * publish-subscribe model for distribution management.
 */
import mitt, { Handler } from 'mitt';
import type { RouteLocationNormalized } from 'vue-router';

export interface RouteChangeEvent {
  to: RouteLocationNormalized;
  from?: RouteLocationNormalized;
}

const emitter = mitt();
const key = Symbol('ROUTE_CHANGE');
let latestRoute: RouteLocationNormalized;

export function setRouteEmitter(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  emitter.emit(key, { to, from });
  latestRoute = to;
}

export function listenerRouteChange(
  handler: (_: RouteChangeEvent) => void,
  immediate = true
) {
  emitter.on(key, handler as Handler);
  if (immediate && latestRoute) {
    handler({ to: latestRoute });
  }
}

export function removeRouteListener(handler: (_: RouteChangeEvent) => void) {
  emitter.off(key, handler as Handler);
}
