import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/Button';
import { PhotoCameraIcon } from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const MyCaptureButton = ({ onClick, children }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PhotoCameraIcon />}
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
