import React from "react";
import { Avatar } from "@material-ui/core";
// import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
// import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
// import RepeatIcon from "@material-ui/icons/Repeat";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import PublishIcon from "@material-ui/icons/Publish";
import moment from "moment";
import { Item, Icon, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Post.css";

const Post = ({
  post: { body, createdAt, id, username, likesCount, commentCount, likes },
}) => {
  return (
    <div className="ui container">
      <Item.Group relaxed>
        <Item>
          <Item.Image
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            avatar
            size="tiny"
          />

          <Item.Content>
            <Item.Header as="a">{username}</Item.Header>
            <Item.Meta>
              <span style={{ marginBottom: 10 }}>
                {moment(createdAt).fromNow()}
              </span>
            </Item.Meta>
            <Item.Description>{body}</Item.Description>
            <Item.Extra>
              <div>
                <Button
                  compact
                  color="red"
                  size="tiny"
                  icon="heart"
                  label={{
                    basic: true,
                    color: "red",
                    pointing: "left",
                    content: likesCount,
                  }}
                />
                <Button
                  size="tiny"
                  color="blue"
                  content="Comments"
                  icon="comment"
                  label={{
                    as: "a",
                    basic: true,
                    color: "blue",
                    pointing: "left",
                    content: "2,048",
                  }}
                />
              </div>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
    // <div className="post">
    //   <div className="post__avatar">
    //     <Avatar
    //       src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
    //       alt={username}
    //     />
    //   </div>
    //   <div className="post__body">
    //     <div className="post__header">
    //       <div className="post__headerText">
    //         <h3>
    //           {/* {displayName}{" "} */}
    //           <span className="post__headerSpecial">{username}</span>

    //           {moment(createdAt).fromNow()}
    //         </h3>
    //       </div>
    //       <div className="post__headerDescription">
    //         <p>{body}</p>
    //       </div>
    //     </div>

    //     <div className="post__footer">
    //       <h1>Buttons will go here.</h1>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Post;
