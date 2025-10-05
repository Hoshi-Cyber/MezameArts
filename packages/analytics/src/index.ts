import events from './events.json';
export type EventName = keyof typeof events;
export function track(event: EventName, payload: Record<string, any>) {
  console.log('Tracking event', event, payload);
}
