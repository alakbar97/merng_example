import { useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS } from "../utils/graphql";

const PostForm = () => {
  const { handleInputChange, values, handleSubmit } = useForm(
    () => createPost(),
    { body: "" }
  );

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update: (cache, result) => {
      const oldData = cache.read({
        query: FETCH_POSTS,
      });

      const newData = [result.data.createPost, ...oldData.posts];

      cache.writeQuery({
        query: FETCH_POSTS,
        data: { ...oldData, posts: { newData } },
      });

      values.body = "";
    },
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Post Body"
            onChange={handleInputChange}
            value={values.body}
            name="body"
            error={!!error}
          />
          <Button color="teal" type="submit">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;
