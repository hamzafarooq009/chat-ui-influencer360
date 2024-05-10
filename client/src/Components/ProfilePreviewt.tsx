// Assuming User interface and styled are correctly imported
import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { User } from '../interfaces';

interface ProfilePreviewProps {
    profile: User;
}

const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60,
  marginRight: 8,
});

const ProfilePreviewt: React.FC<ProfilePreviewProps> = ({ profile }) => {
    return (
      <Card sx={{ maxWidth: '100%', margin: 0, boxShadow: 'none', borderRadius: 0 }}>
        <CardHeader
          avatar={
            <StyledAvatar
              aria-label="profile picture"
              src={profile.profile_picture || ''}
            />
          }
          title={profile.username}
          subheader={`@${profile.username}`}
          titleTypographyProps={{ fontWeight: 'bold' }}
          subheaderTypographyProps={{ color: 'text.secondary' }}
          sx={{ alignItems: 'center', paddingBottom: 0 }}
        />
        <CardMedia
          component="img"
          height="194"
          image={profile.profile_picture || ''}  // Fallback here as well
          alt={`${profile.username}'s cover`}
          sx={{ width: 'auto', maxHeight: '194px', objectFit: 'cover' }}
        />
        <CardContent sx={{ padding: '16px' }}>
          <Typography variant="body2" color="text.secondary">
            {profile.email}
          </Typography>
        </CardContent>
      </Card>
    );
};

export default ProfilePreviewt;