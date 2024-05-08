// data.js
export const usersData = [
    {
      name: "John Doe",
      username: "johndoe",
      image: "https://via.placeholder.com/150/0000FF/808080?Text=JohnDoe",
      coverImage: "https://via.placeholder.com/350x150/0000FF/808080?Text=JohnDoeCover",
      bio: "Bio of John Doe",
      platform: "Instagram",
    },
    {
      name: "Hamza Farooq",
      username: "hamzafarooq",
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=HamzaF",
      coverImage: "https://via.placeholder.com/350x150/FF0000/FFFFFF?Text=HamzaFCover",
      bio: "Bio of Hamza Farooq",
      platform: "WhatsApp",
    },
    {
      name: "Alice Johnson",
      username: "alicejohnson",
      image: "https://via.placeholder.com/150/FFFF00/000000?Text=AliceJ",
      coverImage: "https://via.placeholder.com/350x150/FFFF00/000000?Text=AliceJCover",
      bio: "Bio of Alice Johnson",
      platform: "Messenger",
    },
    // Additional users added
    {
      name: "David Smith",
      username: "davidsmith",
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=DavidS",
      coverImage: "https://via.placeholder.com/350x150/FF0000/FFFFFF?Text=DavidSCover",
      bio: "Enthusiastic developer and coffee lover",
      platform: "Instagram",
    },
    {
      name: "Emily Johnson",
      username: "emilyjohnson",
      image: "https://via.placeholder.com/150/00FF00/FFFFFF?Text=EmilyJ",
      coverImage: "https://via.placeholder.com/350x150/00FF00/FFFFFF?Text=EmilyJCover",
      bio: "Designer with a passion for sustainability",
      platform: "Messenger",
    },
    {
      name: "Michael Brown",
      username: "michaelbrown",
      image: "https://via.placeholder.com/150/0000FF/FFFFFF?Text=MichaelB",
      coverImage: "https://via.placeholder.com/350x150/0000FF/FFFFFF?Text=MichaelBCover",
      bio: "Globetrotter and tech enthusiast",
      platform: "WhatsApp",
    },
    {
      name: "Sophia Taylor",
      username: "sophiataylor",
      image: "https://via.placeholder.com/150/FF00FF/FFFFFF?Text=SophiaT",
      coverImage: "https://via.placeholder.com/350x150/FF00FF/FFFFFF?Text=SophiaTCover",
      bio: "Blogger and yoga instructor",
      platform: "Messenger",
    },
    {
      name: "Olivia Jones",
      username: "oliviajones",
      image: "https://via.placeholder.com/150/00FFFF/000000?Text=OliviaJ",
      coverImage: "https://via.placeholder.com/350x150/00FFFF/000000?Text=OliviaJCover",
      bio: "Marketer and social media guru",
      platform: "Instagram",
    },
    {
      name: "William Johnson",
      username: "williamjohnson",
      image: "https://via.placeholder.com/150/FFFF00/000000?Text=WilliamJ",
      coverImage: "https://via.placeholder.com/350x150/FFFF00/000000?Text=WilliamJCover",
      bio: "Entrepreneur and keynote speaker",
      platform: "WhatsApp",
    },
    {
      name: "Emma Wilson",
      username: "emmawilson",
      image: "https://via.placeholder.com/150/FFFFFF/000000?Text=EmmaW",
      coverImage: "https://via.placeholder.com/350x150/FFFFFF/000000?Text=EmmaWCover",
      bio: "Chef and culinary writer",
      platform: "WhatsApp",
    }
  ];
    
  
  export const dummyConversations = {
    "John Doe": [
      {
        from: 'John Doe',
        source: 'Instagram',
        date: '10:30 AM',
        content: 'Hello, how are you?'
      },
      {
        from: 'John Doe',
        source: 'Instagram',
        date: '10:35 AM',
        content: 'Did you see that new movie?'
      },
      // ... more messages
    ],
    "Hamza Farooq": [
      {
        from: 'Hamza Farooq',
        source: 'WhatsApp',
        date: '11:00 AM',
        content: 'Hey! Are we still on for today?'
      },
      {
        from: 'Hamza Farooq',
        source: 'WhatsApp',
        date: '11:05 AM',
        content: 'Looking forward to our meeting.'
      },
      // ... more messages
    ],
    "Alice Johnson": [
      {
        from: 'Alice Johnson',
        source: 'Facebook',
        date: '09:20 AM',
        content: 'Happy Birthday! 🎉'
      },
      {
        from: 'Alice Johnson',
        source: 'Facebook',
        date: '09:25 AM',
        content: 'Let’s celebrate when you’re free.'
      },
    ],
        // New conversations for additional profiles
  "David Smith": [
    {
      from: 'David Smith',
      source: 'Instagram',
      date: 'Yesterday',
      content: 'Great to connect here!'
    },
    {
      from: 'David Smith',
      source: 'Instagram',
      date: 'Yesterday',
      content: 'Check out my latest post.'
    },
  ],
  "Emily Johnson": [
    {
      from: 'Emily Johnson',
      source: 'Facebook',
      date: '08:45 AM',
      content: 'Could we discuss the new design project?'
    },
    {
      from: 'Emily Johnson',
      source: 'Facebook',
      date: '09:00 AM',
      content: 'Sent you the draft designs.'
    },
  ],
  "Michael Brown": [
    {
      from: 'Michael Brown',
      source: 'WhatsApp',
      date: 'Monday',
      content: 'Don\'t forget the team call at 3 PM.'
    },
  ],
  "Sophia Taylor": [
    {
      from: 'Sophia Taylor',
      source: 'Messenger',
      date: 'Yesterday',
      content: 'Yoga session was refreshing, thanks!'
    },
  ],
  "Olivia Jones": [
    {
      from: 'Olivia Jones',
      source: 'Instagram',
      date: 'Tuesday',
      content: 'Loved your photography!'
    },
  ],
  "William Johnson": [
    {
      from: 'William Johnson',
      source: 'LinkedIn',
      date: '09:30 AM',
      content: 'Interested in a collaboration?'
    },
  ],
  "Emma Wilson": [
    {
      from: 'Emma Wilson',
      source: 'Twitter',
      date: '10:20 AM',
      content: 'New recipe on my blog!'
    },
    ],
    // ... conversations for other users
  };
  
// This function can be used to merge user profile data with conversation summaries
export const users = usersData.map(userProfile => {
    const userName = userProfile.name;
    const userMessages = dummyConversations[userName];
    
    // Getting the last message object
    const lastMessageObject = userMessages?.length > 0
      ? userMessages[userMessages.length - 1]
      : { content: 'No messages yet', date: '', source: '' };
  
    return {
      ...userProfile, // Spread the user profile
      lastMessage: lastMessageObject.content, // Last message content
      lastMessageDate: lastMessageObject.date, // Last message date
      lastMessageSource: lastMessageObject.source, // Last message source
    };
  });