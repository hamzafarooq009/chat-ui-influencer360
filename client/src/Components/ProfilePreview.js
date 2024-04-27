import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

// If you want a bigger avatar, you can use the styled component.
const StyledAvatar = styled(Avatar)({
  width: 60, // Increase the width for a larger avatar
  height: 60, // Increase the height for a larger avatar
  marginRight: 8, // Adjust spacing if necessary
});

const ProfilePreview = ({ profile }) => {
    console.log("profile: ", profile)
  return (
    <Card sx={{ 
      maxWidth: '100%', // Use 100% to fill the container
      margin: 0, // Reset the margin to match the goal UI layout
      boxShadow: 'none', // Remove shadow if it doesn't match the goal UI
      borderRadius: 0, // Match to goal UI if no border radius is desired
    }}>
      <CardHeader
        avatar={
          <StyledAvatar // Use the styled avatar for a larger size
            aria-label="profile picture"
            src={profile.image}
          >
            {profile.name[0]}
          </StyledAvatar>
        }
        title={profile.name}
        subheader={`@${profile.username}`}
        titleTypographyProps={{ fontWeight: 'bold' }} // Bold title
        subheaderTypographyProps={{ color: 'text.secondary' }} // Subtitle color
        sx={{ 
          alignItems: 'center', 
          paddingBottom: 0 // Reduce padding to tighten layout
        }}
      />
      <CardMedia
        component="img"
        height="194" // Adjust the height to match the goal UI
        image={profile.coverImage}
        alt="Profile cover"
        sx={{
          width: 'auto', // Adjust width to maintain aspect ratio
          maxHeight: '194px', // Match the height from your style
          objectFit: 'cover', // Ensures the image covers the area, no stretching
        }}
      />
      <CardContent sx={{ padding: '16px' }}>
        <Typography variant="body2" color="text.secondary">
          {profile.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfilePreview;