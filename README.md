<p align="center"><br><img src="https://avatars.githubusercontent.com/u/76786120?v=4" width="128" height="128" style="border-radius: 50px;" /></p>
<h3 align="center">Ssibrahimbas E-Trade (with Go)</h3>
<p align="center">
  A simple chat system has been developed with this application. This app is developed with NodeJS and Socket.io
</p>


### Why This App?

This application aims to enable users to securely message each other. It includes several security measures including Login and Register with JWT. Actually, these are basic level measures, you can consider this project as a starting project. Production mode should include much more comprehensive security measures.

### Dependencies

To be able to run this application, you must have:

- MongoDB (Community Edition)
- NodeJS

### Installation

To install internal dependencies:

```
npm install
```

### Start App

Enter the following code on the command line to run the application

```
npm start
```

Everything is fine if you get the following output:

> Server listening on port 3000

<br>

### Documentation

<br>

Example code to Establish Connection:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    auth: {
        token: "123"
    }
})
```

<docgen-index>

|Module|
|------|
|**[Chat](#chat-actions)**|
|**[Messaging](#messaging-operations)**|
|**[Session](#session-operations)**|
|**[User](#user-actions)**|


</docgen-index>

<br>

<docgen-api>

## Chat Actions

### Creating a Chat

event: `chat:create.v1`

|Parameter|Description|
|---------|--------|
|**invitedId**|user id value to chat|

Sample request

```javascript
socket.emit("chat:create.v1", {invitedId: 3}, (chat) => {
    console.log('data -> ', chat)
})
```

<br>


### Listing Chats

event: `chat:get.v1`

Sample request

```javascript
socket.emit("chat:get.v1", (chat) => {
    console.log('data -> ', chat)
})
```

<br>

### Filtering Chats

event: `chat:find.v1`

Sample request

```javascript
socket.emit("chat:find.v1", {query: "abc"}, (chat) => {
    console.log('data -> ', chat)
})
```

<br>

## Messaging Operations

<br>

### Do not sent me a message

event: `message:send.v1`

| Parameter | Description |
|-----------|--------------------------------|
| **chatId** | chat id value |
| **content** | message content |
| **receiverId** | the id of the receiver of the message |

Sample request

```javascript
socket.emit("message:send.v1", {
    chatId: "asdsadsav3123",
    content: "Hello world",
    receiverId: "abc2314"
}, (message) => {
    console.log('data -> ', message)
})
```

<br>

### Seeing Message

event: `message:seen.v1`

| Parameter | Description |
|----------------|--------------------------------|
| **messageId** | message id value |

Sample request

```javascript
socket.emit("message:seen.v1", {
    messageId: "asdsadsav3123",
}, (message) => {
    console.log('data -> ', message)
})
```

<br>

### See All Messages

event: `message:seen.v1`

| Parameter | Description |
|-----------|--------------------------------|
| **chatId** | chat id value to see messages |

Sample request

```javascript
socket.emit("message:seenAll.v1", {
    chatId: "asdsadsav3123",
}, (res) => {
    console.log('data -> ', res)
})
```

<br>

### To List All Messages

event: `message:seen.v1`

| Parameter | Description |
|-----------|--------------------------------|
| **chatId** | chat id value to see messages |

Sample request

```javascript
socket.emit("message:getAll.v1", {
    chatId: "asdsadsav3123",
}, (res) => {
    console.log('data -> ', res)
})
```

<br>

### Delete Message

event: `message:remove.v1`

| Parameter | Description |
|-----------|-----------------------|
| **messageId** | id of the message to be deleted |

Sample request

```javascript
socket.emit("message:remove.v1", {
    messageId: "asdsadsav3123",
}, (res) => {
    console.log('data -> ', res)
})
```

<br>

## Session Operations

<br>

### Query Session Status

event: `session:checkStatus.v1`

| Parameter | Description |
|-----------|------------------------------------- |
| **userId** | user id value to query session |

Sample request

```javascript
socket.emit("session:checkStatus.v1", {
    userId: "asdsadsav3123",
}, (res) => {
    console.log('data -> ', res)
})
```

<br>

## User Actions

<br>

### Register

event: `user:register.v1`

| Parameter | Description |
|--------------|----------------|
| **username** | username |
| **email** | email |
| **password** | password |
| **avatar** | profile picture |

Sample request

```javascript
socket.emit("user:register.v1", {
    username: "example",
    email: "example@example.com",
    password: "12345",
    avatar: "https://cdn.example.com/avatar.png"
}, (res) => {
    console.log('data -> ', res)
    console.log('token -> ', res.data.token)
    console.log('user -> ', res.data.user)
})
```

<br>

### Login

event: `user:login.v1`

| Parameter | Description |
|--------------|----------------|
| **username** | username |
| **password** | password |

Sample request

```javascript
socket.emit("user:login.v1", {
    username: "example",
    password: "12345"
}, (res) => {
    console.log('data -> ', res)
    console.log('token -> ', res.data.token)
    console.log('user -> ', res.data.user)
})
```

<br>

</docgen-api>