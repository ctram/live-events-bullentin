import db from '../../models/index';
const { User, Website } = db;

Promise.all([Website.findAll(), User.findAll()])
  .then(values => {
    let [websites, users] = values;
    console.log('websites', websites);
    console.log('users', users);
    const promises = [];

    if (websites && websites.length === 0) {
      return Promise.resolve();
    }

    websites.forEach(website => {
      const user = users.find(user => user.dataValues.id === website.dataValues.creator_id);
      console.log('website found', website);
      console.log('user found', user);
      if (!user) {
        throw 'User not found';
      }
      promises.push(website.update({ view_permission: user.isAdmin() ? 'admin' : 'standard' }));
    });
    console.log('returning all promises');
    return Promise.all(promises);
  })
  .then(values => {
    console.log('results', values);
    console.log('Task complete');
    process.exit();
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
