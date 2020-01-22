import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react';
import { EN, JA } from '../../components/locale';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const CaptureButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PhotoCameraIcon />}
      className={classes.button}
      onClick={onClick}
    >
      <JA>キャプ</JA>
      <EN>Capture</EN>
    </Button>
  );
};
