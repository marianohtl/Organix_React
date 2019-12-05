import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  }
}));

export default function ButtonSmall() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Button  size="small" className={classes.margin}>
          Small
        </Button>
    
      </div>
    </div>
  );
}
