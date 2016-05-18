
import Relay from 'react-relay';

const PostsShowRoute = {
  queries: {
    post: () => Relay.QL` query {
      node(id: $id)
    } `,
  },
  name: 'PostsShowRoute',
};

module.exports = PostsShowRoute;
