# chat-ui-influencer360

Screen Recording:
[screen-capture.webm](https://github.com/hamzafarooq009/chat-ui-influencer360/assets/46634351/35b708a9-185f-46eb-aab7-714172be4d80)

This project is a stateful UI interface for a message web app, with all features and improvements successfully implemented. The application now includes a right panel that can be toggled on and off, an emoji picker next to conversations for adding reactions, and a scrollable left panel with fixed height that paginates to fetch only 10 conversations at a time. Message attachments are shown directly if they are images, while other media types are represented with a download icon. Users can send messages using the Enter key, and the message box has been refactored into an independent TypeScript file for reuse across the app, with each user having their specific message box. Long messages are truncated with '...', and the search functionality is context-sensitive, calling the backend based on the current tab.

The UI has been polished to match Facebook Business standards, including styled tabs and typography. Improvements such as preserving the user reply box content when switching users, updating the rendering of the right panel content, and displaying conversation status (unread/read) with bold/default fonts have been made. The scrollbar flicker issue while waiting for a response has been fixed, and a horizontal scrollbar has been enabled for smaller window screens. Overall, the initial prototype was created and refined based on user feedback and additional requirements, resulting in a fully functional and polished UI. The client is extremely satisfied with the completed work.

UI:
![screencapture-localhost-3000-2024-05-20-10_27_14](https://github.com/hamzafarooq009/chat-ui-influencer360/assets/46634351/99728b95-75f9-4dde-8730-4b8bd544a5d5)
