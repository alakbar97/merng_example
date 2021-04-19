import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  dayjs.extend(relativeTime);

  const handleLikePost = () => {
    console.log("Like post");
  };

  const handleCommentPost = () => {
    console.log("Comment post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{dayjs(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={handleLikePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={handleCommentPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
