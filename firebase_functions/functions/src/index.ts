import * as serviceAccount from "./serviceaccount.json";
import {logger} from "firebase-functions";

import * as admin from "firebase-admin";
const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount)) as admin.ServiceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://chat-dreamerly-default-rtdb.asia-southeast1.firebasedatabase.app/",
});


import {onSchedule} from "firebase-functions/v2/scheduler";
import {UserInfo} from "firebase-admin/auth";
import {log} from "firebase-functions/logger";


exports.checkUnreadMessages = onSchedule({
  schedule: "*/1 * * * *",
  maxInstances: 5,
  timeZone: "Asia/Bangkok",
}, async (e) => {
  const database = app.database();
  const messaging = app.messaging();

  const messengesRef = database.ref("groupMessages");

  // Get every groups first
  const messageGroups = await messengesRef.once("value");

  const currentTime = Date.now();

  for (const [key, val] of Object.entries(messageGroups.val())) {
    const groupId = key;
    const groupRef = database.ref(`groupsMessages/${groupId}`);
    const allMessages = val as Record<string, object>;

    for (const [key, val] of Object.entries(allMessages)) {
      const messageId = key;
      const messageData = val as Record<string, any>;
      const messageTimeStamp = parseInt(messageData.timestamp);
      const timeDifference = currentTime - messageTimeStamp;

      // Filter out every messages that are older than 1 minute
      if (timeDifference > 60000 && !messageData.read && !messageData.notified) {
        // Get the users info from the groupMembers TODO: This looks terrible :(((
        const groupMembersRef = database.ref(`groupMembers/${groupId}`);
        const groupMembers = await groupMembersRef.once("value");
        const memberIds = Object.keys(groupMembers.val() || {});
        const otherMemberId = memberIds.find((id) => id !== messageData.sender);
        const otherMemberRef = database.ref(`users/${otherMemberId}`);
        const senderRef = database.ref(`users/${messageData.sender}`);
        const senderSnapshot = await senderRef.once("value");
        const otherMemberSnapshot = await otherMemberRef.once("value");

        const sender = senderSnapshot.val() as UserInfo & {online: boolean, deviceToken: string};
        const otherMember = otherMemberSnapshot.val() as UserInfo & {online: boolean, deviceToken: string};

        // Got all the info now. We can actually send a notification (finally!)
        if (sender && otherMember) {
          const response = await messaging.send({
            token: otherMember.deviceToken,
            data: {
              title: `${sender.displayName} just sent you a message!!`,
              body: messageData.content,
            },
          });
          logger.debug("Successfully sent message:", response);
          // Update the message to be notified
          if (typeof messageData === "object") {
            const messageRef = database.ref(`groupMessages/${groupId}/${messageId}`);
            messageRef.update({notified: true});
          }
        }
      }
    }
  }


  // messageGroups.once("value", (groupSnapshot) => {
  //   groupSnapshot.forEach((childSnapshot) => {
  //     const groupId = childSnapshot.key;
  //     const messageData = childSnapshot.val();
  //     logger.debug("Message data:", messageData);
  //     // Figure out the other person's ID
  //     const senderId = messageData.sender;
  //     logger.debug("SenderId:", senderId);
  //     const groupMembersRef = database.ref("groupMembers/" + `${groupId}`);

  //     groupMembersRef.once("value", ((membersSnapshot) => {
  //       // Found it!!
  //       const memberIds = Object.keys(membersSnapshot.val() || {});
  //       logger.debug("Member IDs for group:", memberIds);
  //       const otherMemberId = memberIds.find((id) => id !== senderId);
  //       const otherMemberRef = database.ref(`users/${otherMemberId}`);
  //       const senderRef = database.ref(`users/${senderId}`);

  //       senderRef.once("value", (senderSnapshot) => {
  //         const sender = senderSnapshot.val() as UserInfo & {online: boolean, deviceToken: string};
  //         logger.debug("Sender:", sender);

  //         otherMemberRef.once("value", (memberSnapshot) => {
  //           const otherMember = memberSnapshot.val() as UserInfo & {online: boolean, deviceToken: string};
  //           logger.debug("Other member:", otherMember);

  //           // Send a notification to the other member
  //           if (!messageData.read && !messageData.notified) {
  //             messaging.send({
  //               token: otherMember.deviceToken,
  //               notification: {
  //                 title: `${sender.displayName} just sent you a message!!`,
  //                 body: messageData.content,
  //               },
  //             }).then((response) => {
  //               logger.debug("Successfully sent message:", response);
  //               // Update the message to be notified
  //               if (typeof messageData === "object") {
  //                 const messageId = Object.keys(messageData)[0];
  //                 const messageRef = database.ref(`groupMessages/${groupId}/${messageId}`);
  //                 messageRef.update({notified: true});
  //               }
  //             });
  //           }
  //         });
  //       });
  //     }));
  //   });
  // });
});
