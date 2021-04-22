import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Confirm, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import {
  DELETE_POST_MUTATION,
  FETCH_POSTS,
  DELETE_COMMENT_MUTATION,
} from "../utils/graphql";

import CustomPopup from "./CustomPopup";

const DeleteButton = ({ postId, commentId }) => {
  const history = useHistory();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutationQuery = commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;

  const [deletePost] = useMutation(mutationQuery, {
    variables: { postId, commentId },
    update(cache) {
      setConfirmOpen(false);

      if (!commentId) {
        const oldData = cache.read({
          query: FETCH_POSTS,
        });

        const newData = oldData.posts.filter((post) => post.id !== postId);

        cache.writeQuery({
          query: FETCH_POSTS,
          data: { ...oldData, posts: { newData } },
        });

        history.push("/");
      }
    },
  });

  return (
    <>
      <CustomPopup content="Delete post">
        <Button
          onClick={() => setConfirmOpen(true)}
          as="div"
          color="red"
          floated="right"
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </CustomPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

export default DeleteButton;
