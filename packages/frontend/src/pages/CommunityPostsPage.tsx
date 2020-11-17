import React from "react";
import { Container, Grid, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import { gql, useQuery } from "@apollo/client";
import CommunityDesc from "../components/CommunityDesc";
import CommunityHeader from "../components/CommunityHeader";

interface Params {
  server: string;
  community: string;
}

const HomePage = () => {
  const { community, server } = useParams<Params>();

  const GET_POSTS = gql`
    query($community: String!, $host: String!) {
      getPosts(community: { id: $community, host: $host }) {
        id
        title
        author {
          id
        }
      }
      getCommunity(community: { id: $community, host: $host }) {
        id
        title
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      community,
      host: server,
    },
  });

  if (error) return <h1 style={{ color: "black" }}>Error! </h1>;
  if (loading) return <h1 style={{ color: "black" }}>Loading community...</h1>;

  return (
    <div>
      <CommunityHeader title={data.getCommunity.title} server={server} />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item container xs={8} direction="column" spacing={2}>
            {data.getPosts
              .filter((post: any) => post.title)
              .map((post: any) => {
                return (
                  <PostPreview
                    key={post.id}
                    username={post.author.id}
                    title={post.title}
                    postId={post.id}
                    server={server}
                    community={community}
                  />
                );
              })}
          </Grid>

          <Grid item container xs={4} direction="column" spacing={2}>
            <Grid item>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                href={`/instances/${server}/communities/${community}/posts/create`}
              >
                {" "}
                Make Post{" "}
              </Button>
            </Grid>
            <CommunityDesc desc={data.getCommunity.description} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;