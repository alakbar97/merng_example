import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";

const FETCH_POSTS = gql`
  {
    posts: getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          data.posts &&
          data.posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
