import React, { useEffect } from "react";
import { Box, IconButton, Snackbar, } from '@mui/material';

export const Snack =(props) =>{
  const {open, setOpen, error} = props;

  useEffect(() =>{
    const interval = setInterval(() => {
      setOpen(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [open, setOpen]);

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        message={error}
        action={
          <IconButton
            sx={{fontSize: '14px', marginTop: '-10px'}}
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </IconButton>
        }
      />
    </Box>
  )
}