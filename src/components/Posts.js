'use strict';
import React, {
  Component,
  StyleSheet,
  ListView,
  Platform,
  Text,
  View
} from 'react-native';

import PostsPreview from './PostsPreview';
import Relay from 'react-relay';

const _postsDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__,
});

class Posts extends Component {
  constructor(props, context) {
    super(props, context);
    const {edges} = props.root.posts;
    this.state = {
      initialListSize: edges.length,
      listScrollEnabled: true,
      postsDataSource: _postsDataSource.cloneWithRows(edges),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.root.posts.edges !== nextProps.root.posts.edges) {
      const {
        postsDataSource,
      } = this.state;
      this.setState({
        postsDataSource:
          _postsDataSource.cloneWithRows(nextProps.root.posts.edges),
      });
    }
  }


  renderSeparator(sectionId, rowId) {
    return <View key={`sep_${sectionId}_${rowId}`} style={styles.separator} />;
  }

  renderPostEdge = PostEdge => {
    return (
      <PostsPreview key={PostEdge.node.id} post={PostEdge.node} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Posts</Text>
        <View style={styles.list}>
          <ListView
            dataSource={this.state.postsDataSource}
            style={styles.list}
            initialListSize={this.state.initialListSize}
            renderRow={this.renderPostEdge}
            renderSeparator={this.renderSeparator}
          />
        </View>
      </View>
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
              ${PostsPreview.getFragment('post')}
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

const styles = StyleSheet.create({
  separator: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
  },
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? undefined : 20,
  },
  footer: {
    height: 10,
    paddingHorizontal: 15,
  },
  header: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 20,
    fontWeight: '500',
  },
  list: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    flex: 1,
  },
});
