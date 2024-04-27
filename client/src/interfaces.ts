



export interface User {
    platformId: String,
    platform: Platform,
    username?: String,
    email?: String,
    // profile picture url.
    profile_picture?: String,
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

interface Conversations {
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


interface Message {
    id: String,
    message: String,
    attachment: ConversationAttachment,
    receipient: User,
    reactions: ReactionInfo[],
    createTime: number,
}

interface ReactionInfo {
    reaction: String,
    user: User[]
}

interface CreateMessageRequest {
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

enum Status {
    SUCCESS,
    FAILED,
    FAILED_NOT_RETRIABLE,
}


enum Platform {
    INSTAGRAM,
    MESSENGER,
    WHATSAPP,
    ALL,
}


export interface ConversationAttachment {
    type: AttachmentType,
    playload: any,
}

export enum AttachmentType {
    MEDIA_SHARE
}
