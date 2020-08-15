import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

import { Button, Confirm, Icon } from "semantic-ui-react";

const DeleteButton = ({ postId }) => {
  const [open, setOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId,
    },
    update() {
      setOpen(false);
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
