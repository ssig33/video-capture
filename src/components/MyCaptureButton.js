import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const MyCaptureButton = ({ onClick, children }) => {
  const classes = useStyles();

  return (
    <Fab
      variant="contained"
      size="medium"
      color="primary"
      aria-label="Capture"
      className={classes.margin}
      onClick={onClick}
    >
      <PhotoCameraIcon fontSize="inherit" className={classes.extendedIcon} />
      {children}
    </Fab>
  );
};
