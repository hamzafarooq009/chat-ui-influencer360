// data.js
export const usersData = [
    {
      name: "John Doe",
      username: "johndoe",
      image: "https://via.placeholder.com/150/0000FF/808080?Text=JohnDoe",
      coverImage: "https://via.placeholder.com/350x150/0000FF/808080?Text=JohnDoeCover",
      bio: "Bio of John Doe",
    },
    {
      name: "Hamza Farooq",
      username: "hamzafarooq",
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=HamzaF",
      coverImage: "https://via.placeholder.com/350x150/FF0000/FFFFFF?Text=HamzaFCover",
      bio: "Bio of Hamza Farooq",
    },
    {
      name: "Alice Johnson",
      username: "alicejohnson",
      image: "https://via.placeholder.com/150/FFFF00/000000?Text=AliceJ",
      coverImage: "https://via.placeholder.com/350x150/FFFF00/000000?Text=AliceJCover",
      bio: "Bio of Alice Johnson",
    },
    // ... more user profiles
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
      // ... more messages
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