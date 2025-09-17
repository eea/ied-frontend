import start from '@plone/volto/start-server';
import './testSentrySSR';

const reloadServer = start();

if (module.hot) {
  reloadServer();
}
