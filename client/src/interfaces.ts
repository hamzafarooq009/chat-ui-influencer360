export interface User {
    platformId: string,
    platform: Platform,
    username: string,
    email?: string,
    // profile picture url.
    profile_picture?: string,
    lastMessage?: string,  // Last message text
    lastMessageDate?: string,  // Date of the last message
}

// Interface to get user contact on the right sidebar.
export interface GetContactRequest {
    user: User
}
// Interface for the user contact response on the right sidebar.
export interface GetContactResponse {
    user: User,
    follower_count: number,
}


// Interface for getting the conversations for left side bar.
export interface GetConversationsRequest {
    // Conversations from particular platform.
    platform: Platform,
    // Folder such as inbox, spam etc.
    folder?: String,
    // Pass the user id and platform id of the person starting the conversation for Search
    user?: User
    // requester info if user has multiple pages/accounts, it would contains user platform id.
    requester: User
}

// Would be used for building the left side bar.
export interface GetConversationsResponse {
    conversation : Conversations[]
}

export interface Conversations {
    message: String
    // Conversation id.
    id: String,
    // Platform on which it was received.
    platform: Platform,
    user: User,
    // For multiple accounts on fb etc.
    receiver: User,
}

// To get conversations for a particular user.
export interface GetUserConversationsRequest {
    // Conversation/Thread id.
    id: String,
    // user id of the person for which indepth messages are needed.
    user: User,
    receiver: User,
}

// Interface to get conversation messages for the with the users.
export interface GetUserConversationsResponse {
    message: Message[]
}


// Interface for the api to post a message.
export interface PostMessageRequest {
    from: User,
    to: User,
    message: CreateMessageRequest,
}


export interface Message {
    id: string,
    message: string,
    from: string,
    source: string,
    date: string,  // Include this if you want to keep the date
    attachment: ConversationAttachment,
    receipient: User,
    reactions: ReactionInfo[],
    createTime: number,
    
}

export interface ReactionInfo {
    reaction: String,
    user: User[]
}

export interface CreateMessageRequest {
    message: String,
    attachment: ConversationAttachment,
    receipient: User,
    reaction: String,
    createTime: number,
} 
// Interface for the api to read the post message response.
export interface PostMessageResponse {
    id: String,
    result: Status,
}

export enum Status {
    SUCCESS,
    FAILED,
    FAILED_NOT_RETRIABLE,
}


export enum Platform {
    INSTAGRAM,
    MESSENGER,
    WHATSAPP,
    ALL,
}


export interface ConversationAttachment {
    type: AttachmentType | null;
    payload: any,
}

export enum AttachmentType {
    MEDIA_SHARE, 
    NONE // Represents no attachment
}