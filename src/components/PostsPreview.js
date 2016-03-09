'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Relay from 'react-relay';

class PostsPreview extends Component {
  render() {
    const { post } = this.props;
    return (
      <TouchableHighlight>
        <View style={styles.post}>
          <Text style={styles.titleText}>{post.title}</Text>
          <Text style={{fontSize: 14}}>{post.excerpt}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
  },
  post: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
});


module.exports = PostsPreview;

const PostsPreviewContainer = Relay.createContainer(PostsPreview, {
  initialVariables: {
    count: 1000,
  },
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id,
        title,
        slug,
        excerpt,
        voted,
        created_at,
        comments_count,
        votes_count,
        user {
          name
        }
      }
    `,
  },
});

module.exports = PostsPreviewContainer;
