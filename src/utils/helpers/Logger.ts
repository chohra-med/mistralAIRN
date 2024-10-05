/* eslint-disable no-console */

import { AxiosError } from "axios";



/**
 * recordError will save error + stack trace
 * only if errors appears.
 */
export function recordError(error: Error | string, errorInfo?: string) {
  if (__DEV__) {
    console.error(error, errorInfo || '');
    return;
  }
  /* In case of Production, we usually record error in this line, depends on the tool used
  in case of Firebase Crashlytics: crashlytics().recordError(new Error(error));
  */

}
export function logApiError(error: AxiosError) {


  console.log(error.toJSON());
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
}
/**
 * track the user behaviors
 * before than the crash.
 */
export function trace(traceMessage: string) {

  if (__DEV__) {
    console.log(traceMessage);
    return;
  }
  /* In case of Production, we usually log the event here
 in case of Firebase Crashlytics: crashlytics().log(traceMessage);
 */

}

export function logEvent(action: string, payload?: object) {

  if (__DEV__) {
    console.log(action, payload || '');
    return;
  }
  /* In case of Production, we usually log the event here
  in case of Firebase Crashlytics: crashlytics().log(action);
  */
}

export async function logAnalyticsEvents(eventName: string, payload?: object) {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  /* In case of Production, we usually log the event here
in case of Firebase Crashlytics: await analytics().logEvent(eventName, payload);
*/


}

export default {
  recordError,
  logEvent,
  trace,
  logApiError,
  logAnalyticsEvents,
};
