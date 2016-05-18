'use strict';
import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import Relay from 'react-relay';
import PostsPreviewList from './PostsPreviewList';
import PostsPreviewItem from './PostsPreviewItem';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  render() {
    const { root } = this.props;
    return (
       <Navigator
        style={{ flex:1 }}
        initialRoute={{ component: PostsPreviewList }}
        renderScene={ this.renderScene } />
    );
  }

  renderScene(route, navigator) {
    let RouteComponent = route.component
    return <RouteComponent navigator={navigator} {...route.passProps} {...this.props} />
  }
}

export default Posts;

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

export default PostsContainer;
