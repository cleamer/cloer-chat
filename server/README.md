# Server

a real time web chat api server

<br>
<br>

# Index

- [File Structure](#file-structure)
- [API Documnet](#api-document)

<br>
<br>

# File Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.js
    ├── App.module.css
    ├── components
    │   ├── Header.js
    │   ├── Header.module.css
    │   ├── HomeInfo.js
    │   ├── HomeInfo.module.css
    │   ├── Nav.js
    │   ├── Nav.module.css
    │   ├── RoomList.js
    │   ├── RoomList.module.css
    │   ├── RoomRow.js
    │   ├── RoomRow.module.css
    │   ├── SignWarningMessage.js
    │   ├── SignWarningMessage.module.css
    │   └── index.js
    ├── contents
    │   ├── Home.js
    │   ├── SignIn.js
    │   ├── SignInUp.module.css
    │   ├── SignUp.js
    │   └── index.js
    ├── index.css
    ├── index.js
    └── layouts
        ├── Lobby.js
        ├── Lobby.module.css
        ├── Sign.js
        ├── Sign.module.css
        └── index.js
```

<br>
<br>

# API Document

| protocol | method | path           | discription                       | done |
| :------: | :----: | :------------- | --------------------------------- | :--: |
|   HTTP   |  POST  | /auth/signup   | sign up(create a new user)        |  ✅  |
|   HTTP   |  POST  | /auth/signin   | sign in                           |  ✅  |
|   HTTP   |  GET   | /auth/signout  | sign out                          |  ☑️  |
|   HTTP   |  GET   | /rooms         | get all rooms                     |  ☑️  |
|   HTTP   |  GET   | /rooms/:userId | get all the rooms the user joined |  ☑️  |
|   HTTP   |  POST  | /rooms         | create a new room                 |  ☑️  |
|   HTTP   | DELETE | /rooms/:userId | the user leaves the room          |  ☑️  |
|   HTTP   |  GET   | /user/:userId  | get informations about the user   |  ☑️  |
|   HTTP   | PATCH  | /user/:userId  | update the user informations      |  ☑️  |
|   HTTP   | DELETE | /user/:userId  | delete the user account           |  ☑️  |
|   HTTP   |  GET   | /chats/:roomId | get chats in the room             |  ☑️  |
|   HTTP   |  POST  | /chats/:roomId | save a new chat                   |  ☑️  |

<br>
<br>
