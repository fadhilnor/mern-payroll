dbPassword =
  'mongodb+srv://YOUR_USERNAME_HERE:' +
  encodeURIComponent('YOUR_PASSWORD_HERE') +
  '@CLUSTER_NAME_HERE.mongodb.net/@COLLECTION_NAME_HERE?retryWrites=true&w=majority';

module.exports = {
  mongoURI: dbPassword,
};
