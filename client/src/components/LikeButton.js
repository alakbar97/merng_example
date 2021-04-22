import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Label, Icon } from "semantic-ui-react";

import { LIKE_POST_MUTATION } from "../utils/graphql";

import CustomPopup from "./CustomPopup";

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  useEffect(() => {
    setLiked(user && likes.find((like) => like.username === user.username));
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      <Button color="teal" onClick={likePost}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic onClick={likePost}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <CustomPopup content="Like post">
      <Button as="div" labelPosition="right">
        {likeButton}
        <Label as="a" basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </CustomPopup>
  );
};

export default LikeButton;
