import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";
import { Card, Form, Button } from "semantic-ui-react";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const [submitComment] = useMutation(POST_COMMENTS_MUTATION, {
    variables: {
      postId,
      body: comment,
    },
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
  });

  return (
    <Card.Group>
      <Card fluid>
        <Form.Input
          placeholder="Comment.."
          fluid
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          ref={commentInputRef}
        />
      </Card>
      <Button type="submit" relaxed onClick={submitComment} disabled={!comment}>
        Submit
      </Button>
    </Card.Group>
  );
};

const POST_COMMENTS_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;

export default CommentForm;
