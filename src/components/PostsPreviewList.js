'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Platform,
  View,
  Text
} from 'react-native';

import PostsPreviewItem from './PostsPreviewItem';

const _postsDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__,
});

class PostsPreviewList extends Component {
  constructor(props, context) {
    super(props, context);
    const { edges } = props.root.posts;
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
      <PostsPreviewItem key={PostEdge.node.id} post={PostEdge.node} />
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

export default PostsPreviewList;

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
