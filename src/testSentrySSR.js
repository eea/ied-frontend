// Test function to verify Sentry SSR error capture
// Can be called from browser console or imported in components

export const testSentrySSR = () => {
  if (__CLIENT__) {
    console.log('🧪 Testing Sentry SSR error capture from frontend...');
    
    // Simulate SSR-like errors that should be captured
    console.error('Error: Service Unavailable - Frontend test for SSR error capture');
    console.error('    at Request.callback (/app/node_modules/superagent/lib/node/index.js:696:15)');
    
    console.error('TypeError: Cannot read properties of undefined (reading \'test\')');
    console.error('    at /app/build/server.js:1:3722480');
    
    console.error('Error: connect EHOSTUNREACH 10.62.64.90:8080 - Test SSR network error');
    
    console.error('This error originated either by throwing inside of an async function without a catch block - Test SSR async error');
    
    console.log('🧪 Test SSR errors logged to console - check Sentry dashboard');
    
    // Also trigger a direct client error to confirm Sentry is working
    if (window.Sentry) {
      window.Sentry.captureMessage('Direct frontend test - SSR error handling verification 🧪', 'info');
    }
  }
  
  if (__SERVER__) {
    console.log('🧪 Server-side SSR test triggered');
    
    // Trigger actual SSR errors for testing
    console.error('Error: Service Unavailable');
    console.error('TypeError: Cannot read properties of undefined (reading \'split\')');
    console.error('Error: connect EHOSTUNREACH 10.62.64.90:8080');
    
    // Manual Sentry capture if available
    if (global.__sentrySSRErrorCapture) {
      global.__sentrySSRErrorCapture('Manual SSR test error for Sentry verification');
    }
  }
};

// Make function available globally in development
if (typeof window !== 'undefined') {
  window.testSentrySSR = testSentrySSR;
  console.log('🧪 Sentry SSR test function available: run testSentrySSR() in console');
  
  // Also make it available immediately when script loads
  setTimeout(() => {
    window.testSentrySSR = testSentrySSR;
    console.log('🧪 testSentrySSR() function is now available in console');
  }, 1000);
}