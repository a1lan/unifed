/*
 * CS3099 Group A3
 */

import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardHeader, Grid, makeStyles } from "@material-ui/core";
import { UserIcon } from "..";
import { ReactElement } from "react";

interface Props {
  username: string;
  name: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
    textAlign: "center",
  },
}));

export function UserInfoCard(props: Props): ReactElement {
  const classes = useStyles();

  const userIcon = <UserIcon inHeader username={props.username} />;

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardActionArea to={"/user/" + props.username} component={RouterLink}>
          <CardHeader avatar={userIcon} title={props.name} subheader={props.username} />
        </CardActionArea>
      </Card>
    </Grid>
  );
}