import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const BirthdayPopup = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="birthday-modal-title"
      aria-describedby="birthday-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="birthday-modal-title" variant="h4" component="h2" align="center">
          Happy Birthday!
        </Typography>
        <Typography id="birthday-modal-description" sx={{ mt: 2 }}>
          Dear Mum,
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Happy Birthday to the most incredible and loving mother in the world! On this special day, I want you to know just how much you mean to me. Your love, kindness, and strength have shaped me into who I am today, and I am endlessly grateful for everything you do.
        </Typography>
        <Typography sx={{ mt: 1 }}>
          This year, I wanted to do something extra special for you. I’ve created a website to showcase all the wonderful cakes you’ve made over the years. Your talent and creativity have brought so much joy to everyone, and now the world can see just how extraordinary your cakes truly are. Each one tells a story of your love and dedication, and I’m so proud to share your beautiful work.
        </Typography>
        <Typography sx={{ mt: 1 }}>
          I hope this website brings a smile to your face and shows you just how much your hard work and passion are appreciated. You are an inspiration, and I am so lucky to have you as my mum.
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Wishing you a birthday filled with love, happiness, and all the cake you can enjoy! Here’s to many more years of baking brilliance and cherished memories.
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 3, width: '100%' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default BirthdayPopup;
