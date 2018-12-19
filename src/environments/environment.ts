// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCQo9We8GMS3GSZ3DaCcy-odAnvs5nVFLk",
    authDomain: "trackinglive-89835.firebaseapp.com",
    databaseURL: "https://trackinglive-89835.firebaseio.com",
    projectId: "trackinglive-89835",
    storageBucket: "trackinglive-89835.appspot.com",
    messagingSenderId: "1088365011407"
  },
  stripeKey: 'pk_test_i6Mjxq8jwet6IoCyw8AHgz6S'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
