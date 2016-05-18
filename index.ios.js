'use strict';
import React, {Component} from "react";
import {AppRegistry} from "react-native";

import 'babel-polyfill';
import Posts from './src/components/Posts';
import PostsRoute from './src/routes/PostsRoute';
import Relay from 'react-relay';
import config from './config';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(config.graphqlURL)
);

class GraphQLBlogMobile extends Component {
  render() {
    return (
     <Relay.RootContainer
         Component={Posts}
         route={PostsRoute}
      />
    );
  }
}

AppRegistry.registerComponent('GraphQLBlogMobile', () => GraphQLBlogMobile);
