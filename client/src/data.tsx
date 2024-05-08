import { User, Message, Platform, AttachmentType } from './interfaces';

// Define user data
export const usersData: User[] = [
  {
    platformId: "instagram_johndoe",
    platform: Platform.INSTAGRAM,
    username: "johndoe",
    email: "john.doe@example.com",
    profile_picture: "https://via.placeholder.com/150/0000FF/808080?Text=JohnDoe",
  },
  {
    platformId: "whatsapp_hamzafarooq",
    platform: Platform.WHATSAPP,
    username: "hamzafarooq",
    email: "hamza.farooq@example.com",
    profile_picture: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=HamzaF",
  },
  {
    platformId: "messenger_alicejohnson",
    platform: Platform.MESSENGER,
    username: "alicejohnson",
    email: "alice.johnson@example.com",
    profile_picture: "https://via.placeholder.com/150/FFFF00/000000?Text=AliceJ",
  },
];

// Define dummy conversations based on usernames
export const dummyConversations: { [username: string]: Message[] } = {
  "johndoe": [
    {
      id: "msg1",
      message: 'Hello, how are you?',
      from: "System",
      source: "Automated",
      date: new Date(1597843267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[0], // Directly referencing the user data
      reactions: [],
      createTime: 1597843267000,
    },
    // More messages can be added here
  ],
  "hamzafarooq": [
    {
      id: "msg2",
      message: 'Hey! Are we still on for today?',
      from: "System",
      source: "Automated",
      date: new Date(1597845267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[1], // Directly referencing the user data
      reactions: [],
      createTime: 1597845267000,
    },
  ],
  "alicejohnson": [
    {
      id: "msg3",
      message: 'Happy Birthday! 🎉',
      from: "Friend",
      source: "User",
      date: new Date(1597847267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[2], // Directly referencing the user data
      reactions: [],
      createTime: 1597847267000,
    },
  ],
  // Additional conversations can be defined similarly
};

// Map user data to include last message details
export const users = usersData.map(userProfile => {
  const userMessages = dummyConversations[userProfile.username] || [];
  const lastMessageObject = userMessages.length > 0
    ? userMessages[userMessages.length - 1]
    : {
        message: 'No messages yet',
        from: "System",
        source: "Automated",
        date: new Date().toISOString(),
        attachment: { type: AttachmentType.NONE, payload: null },
        receipient: userProfile,
        reactions: [],
        createTime: Date.now(),
        id: 'no_message_id',
      };

  return {
    ...userProfile,
    lastMessage: lastMessageObject.message,
    lastMessageDate: new Date(lastMessageObject.createTime).toLocaleString(),
    lastMessageSource: lastMessageObject.source,
  };
});