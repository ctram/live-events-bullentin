import apiUsers from './users';
import apiTemplates from './templates';

const APIs = [apiUsers, apiTemplates];

function loadApi(app) {
  console.log('in loadApi');

  APIs.forEach(APIs => {
    APIs.load(app);
  });
}

export default loadApi;
