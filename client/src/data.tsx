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
  {
    platformId: "instagram_janedoe",
    platform: Platform.INSTAGRAM,
    username: "janedoe",
    email: "jane.doe@example.com",
    profile_picture: "https://via.placeholder.com/150/00FF00/808080?Text=JaneDoe",
  },
  {
    platformId: "whatsapp_tomhanks",
    platform: Platform.WHATSAPP,
    username: "tomhanks",
    email: "tom.hanks@example.com",
    profile_picture: "https://via.placeholder.com/150/FF00FF/FFFFFF?Text=TomH",
  },
  {
    platformId: "messenger_emilyblunt",
    platform: Platform.MESSENGER,
    username: "emilyblunt",
    email: "emily.blunt@example.com",
    profile_picture: "https://via.placeholder.com/150/00FFFF/000000?Text=EmilyB",
  },
  {
    platformId: "instagram_sarahconnor",
    platform: Platform.INSTAGRAM,
    username: "sarahconnor",
    email: "sarah.connor@example.com",
    profile_picture: "https://via.placeholder.com/150/FF4500/808080?Text=SarahC",
  },
  {
    platformId: "whatsapp_peterparker",
    platform: Platform.WHATSAPP,
    username: "peterparker",
    email: "peter.parker@example.com",
    profile_picture: "https://via.placeholder.com/150/FFD700/FFFFFF?Text=PeterP",
  },
  {
    platformId: "messenger_brucelane",
    platform: Platform.MESSENGER,
    username: "brucelane",
    email: "bruce.lane@example.com",
    profile_picture: "https://via.placeholder.com/150/4B0082/FFFFFF?Text=BruceL",
  },
  {
    platformId: "instagram_annaquinn",
    platform: Platform.INSTAGRAM,
    username: "annaquinn",
    email: "anna.quinn@example.com",
    profile_picture: "https://via.placeholder.com/150/FF69B4/808080?Text=AnnaQ",
  },
  {
    platformId: "whatsapp_steverogers",
    platform: Platform.WHATSAPP,
    username: "steverogers",
    email: "steve.rogers@example.com",
    profile_picture: "https://via.placeholder.com/150/00FA9A/FFFFFF?Text=SteveR",
  },
  {
    platformId: "messenger_clarkkent",
    platform: Platform.MESSENGER,
    username: "clarkkent",
    email: "clark.kent@example.com",
    profile_picture: "https://via.placeholder.com/150/FFA07A/FFFFFF?Text=ClarkK",
  },
  {
    platformId: "instagram_brucewayne",
    platform: Platform.INSTAGRAM,
    username: "brucewayne",
    email: "bruce.wayne@example.com",
    profile_picture: "https://via.placeholder.com/150/20B2AA/808080?Text=BruceW",
  },
  {
    platformId: "whatsapp_dianaprince",
    platform: Platform.WHATSAPP,
    username: "dianaprince",
    email: "diana.prince@example.com",
    profile_picture: "https://via.placeholder.com/150/FF1493/FFFFFF?Text=DianaP",
  },
  {
    platformId: "messenger_loganwolverine",
    platform: Platform.MESSENGER,
    username: "loganwolverine",
    email: "logan.wolverine@example.com",
    profile_picture: "https://via.placeholder.com/150/00CED1/FFFFFF?Text=LoganW",
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
      receipient: usersData[0],
      reactions: [],
      createTime: 1597843267000,
    },
  ],
  "hamzafarooq": [
    {
      id: "msg2",
      message: 'Hey! Are we still on for today?',
      from: "System",
      source: "Automated",
      date: new Date(1597845267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[1],
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
      receipient: usersData[2],
      reactions: [],
      createTime: 1597847267000,
    },
  ],
  // Adding similar dummy conversations for additional users
  "janedoe": [
    {
      id: "msg4",
      message: 'Hi there!',
      from: "System",
      source: "Automated",
      date: new Date(1597848267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[3],
      reactions: [],
      createTime: 1597848267000,
    },
  ],
  "tomhanks": [
    {
      id: "msg5",
      message: 'Good morning!',
      from: "System",
      source: "Automated",
      date: new Date(1597849267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[4],
      reactions: [],
      createTime: 1597849267000,
    },
  ],
  "emilyblunt": [
    {
      id: "msg6",
      message: 'How was your day?',
      from: "Friend",
      source: "User",
      date: new Date(1597850267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[5],
      reactions: [],
      createTime: 1597850267000,
    },
  ],
  "sarahconnor": [
    {
      id: "msg7",
      message: 'See you soon.',
      from: "Friend",
      source: "User",
      date: new Date(1597851267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[6],
      reactions: [],
      createTime: 1597851267000,
    },
  ],
  "peterparker": [
    {
      id: "msg8",
      message: 'Let\'s catch up later.',
      from: "System",
      source: "Automated",
      date: new Date(1597852267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[7],
      reactions: [],
      createTime: 1597852267000,
    },
  ],
  "brucelane": [
    {
      id: "msg9",
      message: 'I will call you back.',
      from: "System",
      source: "Automated",
      date: new Date(1597853267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[8],
      reactions: [],
      createTime: 1597853267000,
    },
  ],
  "annaquinn": [
    {
      id: "msg10",
      message: 'Thanks for the help!',
      from: "Friend",
      source: "User",
      date: new Date(1597854267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[9],
      reactions: [],
      createTime: 1597854267000,
    },
  ],
  "steverogers": [
    {
      id: "msg11",
      message: 'I appreciate it.',
      from: "System",
      source: "Automated",
      date: new Date(1597855267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[10],
      reactions: [],
      createTime: 1597855267000,
    },
  ],
  "clarkkent": [
    {
      id: "msg12",
      message: 'See you tomorrow.',
      from: "System",
      source: "Automated",
      date: new Date(1597856267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[11],
      reactions: [],
      createTime: 1597856267000,
    },
  ],
  "brucewayne": [
    {
      id: "msg13",
      message: 'Good night.',
      from: "System",
      source: "Automated",
      date: new Date(1597857267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[12],
      reactions: [],
      createTime: 1597857267000,
    },
  ],
  "dianaprince": [
    {
      id: "msg14",
      message: 'I will let you know.',
      from: "System",
      source: "Automated",
      date: new Date(1597858267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[13],
      reactions: [],
      createTime: 1597858267000,
    },
  ],
  "loganwolverine": [
    {
      id: "msg15",
      message: 'Thank you!',
      from: "Friend",
      source: "User",
      date: new Date(1597859267000).toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: usersData[14],
      reactions: [],
      createTime: 1597859267000,
    },
  ],
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

  console.log('User:', userProfile.username, 'Last Message:', lastMessageObject);

  return {
    ...userProfile,
    lastMessage: lastMessageObject.message,
    lastMessageDate: new Date(lastMessageObject.createTime).toLocaleString(),
    lastMessageSource: lastMessageObject.source,
  };
});
