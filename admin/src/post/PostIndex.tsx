import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PostList } from "./PostList";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";

export const PostIndex = (): React.ReactElement => {
  useBreadcrumbs("/posts/", "Posts");

  return (
    <Switch>
      <PrivateRoute exact path={"/posts/"} component={PostList} />
      <PrivateRoute path={"/posts/new"} component={CreatePost} />
      <PrivateRoute path={"/posts/:id"} component={Post} />
    </Switch>
  );
};
