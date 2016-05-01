'use strict';
import React, {
  Component,
  NavigatorIOS
} from 'react-native';

import Relay from 'react-relay';
import PostsPreviewList from './PostsPreviewList';
import PostsPreviewItem from './PostsPreviewItem';

class Posts extends Component {
  render() {
    const { root } = this.props;
    return (
       <NavigatorIOS
        initialRoute={{
          component: PostsPreviewList,
          title: 'Posts',
          passProps: { root: root }
        }}
      />
    );
  }
}

module.exports = Posts;

const PostsContainer = Relay.createContainer(Posts, {
  initialVariables: {
    count: 20,
    order: '-id',
    filter: null,
  },
  fragments: {
    root: () => Relay.QL`
      fragment on Viewer {
        id,
        posts(first: $count, order: $order, filter: $filter) {
          edges {
            node {
              id,
              ${PostsPreviewItem.getFragment('post')}
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  },
});

module.exports = PostsContainer;
