import React from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar, Box, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { User } from '../app/interfaces';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 145px)",
        overflowY: "auto",
        backgroundColor: '#fff',
        padding: 2,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        borderRadius: '8px',
      }}
    >
      <Card sx={{ maxWidth: '100%', margin: 0, boxShadow: 'none', borderRadius: 0 }}>
        <CardHeader
          avatar={
            <StyledAvatar
              aria-label="profile picture"
              src={profile.profile_picture || ''}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={profile.username}
          subheader={
            <Typography variant="body2" color="text.secondary">
              @{profile.username}
            </Typography>
          }
          titleTypographyProps={{ fontWeight: 'bold', variant: 'h6' }}
          subheaderTypographyProps={{ color: 'text.secondary', fontSize: '0.875rem' }}
          sx={{ alignItems: 'center', paddingBottom: 0 }}
        />
        <CardContent sx={{ padding: '16px' }}>
          {profile.bio && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>About</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {profile.bio}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
            </>
          )}
          {(profile.location || profile.email || profile.follower_count !== undefined) && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Profile Info</Typography>
              {profile.location && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Location: {profile.location}
                  </Typography>
                  <Divider sx={{ marginY: 1 }} />
                </>
              )}
              {profile.follower_count !== undefined && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Followers: {profile.follower_count}
                  </Typography>
                  <Divider sx={{ marginY: 1 }} />
                </>
              )}
              {profile.email && (
                <Typography variant="body2" color="text.secondary">
                  Email: {profile.email}
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePreviewt;