# Firebase Real Time Chat App With Push Notification
# Built With Firebase, React, TailwindCss, HeadlessUI and Vite

![enter image description here](https://i.imgur.com/zLhLh2u.png)![enter image description here](https://i.imgur.com/YoNxs0v.png)

# Project Structure

## Outer layer
| ![enter image description here](https://i.imgur.com/cs1FtdE.png) |Overall architecture   |
|--|--|
Main thing is everything used commonly are put outside and every features have their own packaged space. 
(for example: ***hooks/components*** outside are related to the app as a whole, while ***hooks/components*** inside the features folder are related to that feature only)

# Build & Deploy

## 1. The Chat App


**1.1. BEFORE YOU BUILD THE CHAT APP**

The app utilizes all of these Firebase services, and will require you to set it up, then **copy the .env.example in the root folder into .env**, and fill in accordingly
**.env**
> VITE_FIREBASE_API_KEY= 
> VITE_FIREBASE_AUTH_DOMAIN=
> VITE_FIREBASE_AUTH_PROJECT_ID= 
> VITE_FIREBASE_STORAGE_BUCKET=
> VITE_FIREBASE_MESSAGING_SENDER_ID=
> VITE_FIREBASE_APP_ID=
> VITE_FIREBASE_DATABASE_URL=
> VITE_VAPID_KEY=

You should find everything but VAPID_KEY under Project Settings -> Your Apps -> SDK setup and configuration
 ![enter image description here](https://i.imgur.com/XNlVDI0.png)
 **For VAPID_KEY**:
 Under Cloud Messaging tab, create a new "Web Push certificates". That's your VAPID_KEY
![enter image description here](https://i.imgur.com/EZNZ8z5.png)
**1.2. BUILD THE CHAT APP** 
Simply

    yarn && yarn build

**1.3. DEPLOY THE CHAT APP**

The project utilizes Firebase Hosting as well. To deploy the app the same way:
> 1. Install Firebase CLI
> 2. firebase deploy

If you're looking it to host it yourself, the app is still at its core a React app bundled with Vite. Plenty of tutorials for that online.

## 2. Push notification system

**2.1 BEFORE YOU BUILD**
Acquire a serviceaccount.json file from the "Generate new private key" button in the Project Settings -> Service Account
![enter image description here](https://i.imgur.com/BwrrVGy.png)
Save the file under firebase_functions/functions/src directory
![enter image description here](https://i.imgur.com/3YbLjN8.png)
Go into the index.ts file, change databaseURL to your databaseURL *(yes I probably should use .env file for this but this is niche and small enough to justify my laziness)*

![enter image description here](https://i.imgur.com/SNvtxdc.png)**2.1 BUILD AND DEPLOY**

With the terminal pointed to the very same directory, run

    npm run deploy

# Firebase services explanation
Some explanations of the services used
![enter image description here](https://i.imgur.com/ofw0V0w.png)

## Firebase Messaging

For push notifications. Foreground notifications are set up with Firebase **"onMessaging"** function, while background notifications are set up with **src/firebase-messaging-sw.js** file
## Firebase Authentication

For the login as google function
## Firebase Realtime Database

For chat function. Data is de normalized to maximize reading capability. Schema is as bellow
![enter image description here](https://i.imgur.com/mozcATG.png)
## Firebase Functions

For push notifications. Essentially a cron job that runs every x hours/minutes to check for notifiable messages from users. 
## Firebase Hosting
For deployment


# Pictures
![enter image description here](https://i.imgur.com/lHYB8gg.png)![enter image description here](https://i.imgur.com/hiZLGNT.png)
Background notif

![enter image description here](https://i.imgur.com/HA1PF0M.png)Foreground notif
