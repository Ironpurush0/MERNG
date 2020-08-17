import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image, Card, Item } from "semantic-ui-react";
import moment from "moment";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import gql from "graphql-tag";
import Post from "../components/Post";

function UserProfile() {
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_POSTS_QUERY);
  //   const { data } = useQuery(FETCH_USER, {
  //     variables: userId,
  //   });

  console.log(data.getPosts);

  const posts = data.getPosts.filter((post) => post.username === user.username);
  console.log(posts);

  return (
    <div>
      <Grid divided="vertical" relaxed padded={true}>
        <Grid.Column width={4}>
          <Image src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />
          <Card fluid>
            <Card.Content>
              <Card.Header>{user.username}</Card.Header>
              <Card.Description>{user.email}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <PostForm />
          {!data.getPosts && <p>No posts.</p>}
          {posts.map((p) => (
            <Item.Group key={p.id}>
              <Post post={p} />
            </Item.Group>
            // <Item.Group>
            //   <Item>
            //     <Item.Image
            //       src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            //       circular
            //       avatar
            //     />
            //     <Item.Content key={p.id}>
            //       <Item.Header className="username">{p.username}</Item.Header>
            //       {/* <DeleteButton postId={p.id} callback={deleteCallback} /> */}
            //       <Item.Meta>
            //         <span className="cinema">
            //           {moment(p.createdAt).fromNow()}
            //         </span>
            //       </Item.Meta>
            //       <Item.Description className="body__Container">
            //         {p.body}
            //       </Item.Description>
            //     </Item.Content>
            //   </Item>
            // </Item.Group>
          ))}
        </Grid.Column>
      </Grid>
    </div>
  );
}

const FETCH_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      email
      createdAt
    }
  }
`;

export default UserProfile;
