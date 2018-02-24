import apiUsers from './users';

const APIs = [apiUsers];

function loadApi(app) {
  APIs.forEach(APIs => {
    APIs.load(app);
  });
}

export default loadApi;
