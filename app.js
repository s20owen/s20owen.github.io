if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


// PWA app badging https://web.dev/badging-api/
// Set the badge
const unreadCount = 1;
navigator.setAppBadge(unreadCount).catch((error) => {
  //Do something with the error.
});

// Clear the badge
/* 
navigator.clearAppBadge().catch((error) => {
  // Do something with the error.
});
*/
