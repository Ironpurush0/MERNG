import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image, Card, Item } from "semantic-ui-react";
import moment from "moment";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import Post from "../components/Post";
import { FETCH_USERS } from "../utils/graphql";

function UserProfile(props) {
  const { user } = useContext(AuthContext);

  // const { data } = useQuery(FETCH_POSTS_QUERY);
  const { data } = useQuery(FETCH_USERS);

  console.log(data);

  // console.log(data.getPosts);

  // const posts = data.getPosts.filter(
  //   (post) => post.username === getUsers.username
  // );
  // console.log(posts);

  return (
    <div>
      {/* <Grid divided="vertical" relaxed padded={true}>
        <Grid.Column width={4}>
          <Image src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
          <Card fluid>
            {getUsers.map((user) => (
              <Card.Content key={user.id}>
                <Card.Header>{user.username}</Card.Header>
                <Card.Description>{user.email}</Card.Description>
                <Card.Meta>{moment(user.createdAt).fromNow()}</Card.Meta>
              </Card.Content>
            ))}
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <PostForm />
        </Grid.Column>
      </Grid> */}
      <h1>user profile</h1>
    </div>
  );
}

export default UserProfile;
