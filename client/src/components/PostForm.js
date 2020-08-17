import React, { useState } from "react";
import { Button, Item, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import "./PostForm.css";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const [values, setValues] = useState({
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div className="text-input">
      <div className="image-container">
        <Item>
          <Item.Image
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            size="tiny"
            circular
          />
        </Item>
      </div>
      <div className="form">
        <Form onSubmit={submitForm}>
          <Form.Field>
            <Form.Input
              type="text"
              name="body"
              placeholder="What's happening?"
              onChange={onChange}
              value={values.body}
              error={error ? true : false}
            />
            <Button type="submit" color="teal">
              Post
            </Button>
          </Form.Field>
        </Form>
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likesCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
