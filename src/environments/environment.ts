// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Usually, this kind of secrets don't get expose in the commited code, however, this is a public key available to anyone
  // If this key stops working, visit https://www.pubnub.com/demos/real-time-data-streaming/?show=demo
  // and select the Twitter Stream to get a new one
  twitterPubNubSubscribeKey: 'sub-c-d00e0d32-66ac-4628-aa65-a42a1f0c493b'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
