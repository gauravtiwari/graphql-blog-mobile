import Relay from 'react-relay';

module.exports = {
  queries: {
    root: () => Relay.QL` query {
      root
    } `,
  },
  params: {
  },
  name: 'PostsRoute',
};
