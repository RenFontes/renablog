# README #

### What is this? ###

This is a simple blog engine I started making some years ago. It had remained in a private repository. Some years after creating it the free mongo database service I was using decided to stop providing their free service, so I decided to update it to use a local database and put it on github.

Vue is used for the frontend. And express js for api calls. disk-db is used to store blog posts locally.
Frontend and Backend are under this same project so it will be easy to deploy.

The blog engine was completely rewriten(or at least almost) to make it more usable. This is the second alpha release.

This project was made with **Heroku** in mind and running it in a free dyno should be fairly easy. Though it should work on other cloud platforms too.

### Features ###

* Post creation without an external database
* Simple and easy to use
* Post editing using markdown.
* Simple pagination (just next and previous buttons, when there are more than 10 posts).

### How does it work? ###

Configuration is done in the `/src/Settings.js` file. For more customization you can modify `/public/stylesheet/style.sass` or the **Vue components** directly.

The blog is using [bulma.io](http://bulma.io) css framework. For any changes to the page styling you can go read their documentation.

Creation, edition and deletion of post is handled in development mode and is expected to be done offline, in your machine by running the app in development mode using `npm start`. Since posts are saved on a json file, you can easily create the posts while running the app in your machine, commit and then upload it to your server. 

You can go to **New Post** to create a new post while in development mode. Post are written using markdown. The engine is using [marked](https://www.npmjs.com/package/marked) in default mode.

Uploading images to the server was removed in this version(so it wouldn't conflict with post editing) but it will be added again later on. You can use external image sources in the meantime, or place images directly in the public folder.

### Plans for the project ###

I first started this for two reasons: To use it as my tool for blogging, and to learn node.js. (Learning Vue + Webpack became a reason later on)
A lot has changed in those 3 years, though. So I plan to keep updating it and make a tool anyone can use.

Some of the plans I have right now:

[ ] Add option for uploading images. 
[ ] Improve pagination (show pages buttons)
[ ] Split json files used for posts.
[ ] Re-organize project. (Since backend and frontend are mixed, some things are all over the place.
[ ] Easy theming? Maybe?
[ ] Find prettier background images. 

### Who do I talk to? ###

My name is Renato Fontes, and you can find me on twitter [@RenatoFontes](https://twitter.com/renatofontes).
You can also visit my site here: [elrenato.com](http://elrenato.com)

I twit mostly in spanish, but I can reply to you in english. I tend to rant there when new technology is released that I don't like, or when something I like doesn't work as expected... So, sorry about that. :)
