import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Label } from "semantic-ui-react";
import gql from "graphql-tag";
import { Item, Container } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

import "./SinglePost.css";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  console.log(data);

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading....</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likesCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <div className="post-container">
        <Item.Group relaxed>
          <Item>
            <Item.Image src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />

            <Item.Content>
              <Item.Header as="a">{username}</Item.Header>
              <Item.Meta>
                <span className="cinema">{moment(createdAt).fromNow()}</span>
              </Item.Meta>
              <Item.Description>{body}</Item.Description>
            </Item.Content>
          </Item>
          <Item.Extra className="button-container">
            <LikeButton user={user} post={{ id, likes, likesCount }} />
          </Item.Extra>
        </Item.Group>
      </div>
    );
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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
        body
      }
    }
  }
`;
export default SinglePost;
