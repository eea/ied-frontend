import client from '@plone/volto/start-client';

client();

// Add Sentry SSR test function for development
if (typeof window !== 'undefined') {
  window.testSentrySSR = () => {
    console.log('🧪 Testing Sentry SSR error capture from frontend...');
    
    // Simulate SSR-like errors that should be captured
    console.error('Error: Service Unavailable - Frontend test for SSR error capture');
    console.error('    at Request.callback (/app/node_modules/superagent/lib/node/index.js:696:15)');
    
    console.error('TypeError: Cannot read properties of undefined (reading \'test\')');
    console.error('    at /app/build/server.js:1:3722480');
    
    console.error('Error: connect EHOSTUNREACH 10.62.64.90:8080 - Test SSR network error');
    
    console.error('This error originated either by throwing inside of an async function without a catch block - Test SSR async error');
    
    console.log('🧪 Test SSR errors logged to console - check Sentry dashboard');
  };
  
  console.log('🧪 Sentry SSR test function available: run testSentrySSR() in console');
}

if (module.hot) {
  module.hot.accept();
}
