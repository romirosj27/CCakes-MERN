import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import CountUp from 'react-countup';

const CircularCardContainer = styled(Card)(({ theme }) => ({
  width: 200,
  height: 200,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
  boxShadow: theme.shadows[4],
}));

const CircularCard = ({ title, end }) => {
  return (
    <CircularCardContainer>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h3" component="div">
          <CountUp start={0} end={end} duration={3} />
        </Typography>
      </CardContent>
    </CircularCardContainer>
  );
};

export default CircularCard;
