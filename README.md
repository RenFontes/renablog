# README #

### What is this? ###

This is a simple blog engine I created some years ago. It had remained in a private repository. Some years after creating it the free mongo database service I was using decided to stop providing their free service, so I decided to update it to use a local database and put it on github.

The blog engine uses an old version of expressjs since I created a few years ago. Mongo Db was replaced by diskdb so you don't depend on any db hosting service. Images for blog posts are stored directly in the json file created by diskdb.

The project is really old and also quick project I made, please don't judge my coding style. heh :)

### How does it work? ###

There are only 2 pages right now "index" and "newpost". Index shows all your posts, newpost helps you create a new post using markdown. 

Comment **newpost** in **app.js** page when uploading, since there is no security anyone would be able to upload whatever they want to your blog. 

Add your cover image in style.styl in **.main-image** .

The styling is really old, so go ahead and change all of it.

* You can add a new line by adding "--  ".
* You can add a new image by putting it in the file input and adding a markdown image tag with "\*\*01\*\*" (without the quotes) for the url. This feature is incomplete and it will actually let you add as many images you want to. Though it could be limited by the performance of diskdb.

### Plans for the project ###

I first started this for two reasons: To use it as my tool for blogging, and to learn node.js.
A lot has changed in those 3 years, though. So I plan to keep updating it and make a tool anyone can use.

Some of the plans I have right now:

* Use pug instead of jade.
* Migrate this to the newest express version.
* Use vuejs for javascript parts.
* Add pagination
* Maybe make the pagination use multiple files, so the files become easier to load and manage.
* *Maybe* add a login for new posts.


### Who do I talk to? ###

My name is Renato Fontes, and you can find me on twitter [@RenatoFontes](https://twitter.com/renatofontes).
You can also visit my site here: [elrenato.com](http://elrenato.com)

I twit mostly in spanish, but I can reply to you in english. I tend to rant there when new technology is released that I don't like, or when something I like doesn't work as expected... So, sorry about that. :)
