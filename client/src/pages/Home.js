import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { FETCH_POSTS } from "../utils/graphql";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POSTS);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <Transition.Group>
            {data.posts &&
              data.posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
