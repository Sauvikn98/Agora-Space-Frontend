import { io } from 'socket.io-client'

const spaceSocket = io('http://127.0.0.1:5000', {autoConnect: false});

const socket = io('http://127.0.0.1:5000', {autoConnect: false});
socket.on("newPost", ({postData, channel}) => {
    if (channel === "one-to-one") {
      // Send a push notification or email to the user who created the post
    } else if (channel === "many-to-many") {
      // Send a push notification or email to all subscribed users
    } else if (channel === "many-to-one") {
      // Send a push notification or email to all subscribed users of the specific topic or category
    }
  });
  

export default spaceSocket;


