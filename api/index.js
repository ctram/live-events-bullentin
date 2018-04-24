import apiUsers from './users';
import apiWebsites from './websites';

const APIs = [apiUsers, apiWebsites];

function loadApi(app) {
  APIs.forEach(APIs => {
    APIs.load(app);
  });
}

export default loadApi;
