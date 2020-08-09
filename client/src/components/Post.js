import React from "react";
import { Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";

const Post = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <h1>Buttons here</h1>
      </Card.Content>
    </Card>
  );
};

export default Post;
