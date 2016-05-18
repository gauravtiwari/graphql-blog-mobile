'use strict';

import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import Relay from 'react-relay';

class PostsShow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;
    return (
      <View>
        <View>
          <Text style={{fontSize: 18}}>
            { post.title }
          </Text>
        </View>
        <View style={{ marginTop: 5, padding: 5 }}>
          <Text style={{fontSize: 11}}>
            { post.body }
          </Text>
        </View>
      </View>
    );
  }
}

export default PostsShow;

const PostsShowContainer = Relay.createContainer(PostsShow, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        slug,
        body,
        voted,
        created_at,
        comments_count,
        votes_count,
        user {
          name
        },
      }
    `,
  },
});

export default PostsShowContainer;
