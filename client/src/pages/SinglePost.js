import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Item, Comment, Button } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CommentForm from "../components/CommentForm";

import "./SinglePost.css";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function deleteCallback() {
    props.history.push("/");
  }

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
        <Item.Group divided relaxed={true}>
          <Item>
            <Item.Image src="https://react.semantic-ui.com/images/avatar/large/steve.jpg" />

            <Item.Content>
              <Item.Header className="username">{username}</Item.Header>
              <DeleteButton postId={id} callback={deleteCallback} />
              <Item.Meta>
                <span className="cinema">{moment(createdAt).fromNow()}</span>
              </Item.Meta>
              <Item.Description className="body__Container">
                {body}
              </Item.Description>
            </Item.Content>
          </Item>
          <Item.Extra className="button-container">
            {!user && (
              <LikeButton
                as={Link}
                to="/login"
                user={user}
                post={{ id, likes, likesCount }}
              />
            )}
            <LikeButton user={user} post={{ id, likes, likesCount }} />
            <Button
              size="tiny"
              color="blue"
              content="Comments"
              icon="comment"
              label={{
                basic: true,
                color: "blue",
                pointing: "left",
                content: commentCount,
              }}
            />
          </Item.Extra>
        </Item.Group>
        {user && <CommentForm postId={id} />}
        {comments.map((comment) => (
          <Comment.Group>
            <Comment className="comment" key={comment.id}>
              {user && user.username === comment.username && (
                <DeleteButton postId={id} commentId={comment.id} />
              )}
              <Comment.Content>
                <Comment.Avatar src="/images/avatar/small/elliot.jpg" />
                <Comment.Author as="a">{comment.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(comment.createdAt).fromNow()}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{comment.body}</p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              {/* <Comment.Group>
              <Comment>
                <Comment.Avatar src="/images/avatar/small/jenny.jpg" />
                <Comment.Content>
                  <Comment.Author as="a">Jenny Hess</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>
                  </Comment.Metadata>
                  <Comment.Text>Elliot you are always so right :)</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group> */}
            </Comment>
          </Comment.Group>
        ))}
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
