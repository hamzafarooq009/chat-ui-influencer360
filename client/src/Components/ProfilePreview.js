import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const ProfilePreview = ({ profile }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile picture" src={profile.image}>
            {profile.name[0]}
          </Avatar>
        }
        title={profile.name}
        subheader={`@${profile.username}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={profile.coverImage}
        alt="Profile cover"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {profile.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfilePreview;