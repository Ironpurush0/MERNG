import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Container } from "semantic-ui-react";
import Post from "../components/Post";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={1}>
      <Grid.Row stretched>
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <Post post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
      }
    }
  }
`;

export default Home;
