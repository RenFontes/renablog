var express = require('express');
var router = express.Router();

function routes(blogDb) {
    //GET
    router.get('/', function (req, res, next) {
        if (req.query.id) {
            var post = blogDb.posts.findOne({ _id: req.query.id });
            if (post) {
                res.json({ blogPost: post });
            }
            else {
                res.status(404).send('Not found');
            }
        } else {
            var posts = blogDb.posts.find().reverse();
            if (req.query.page) {
                var endIndex = posts.length >= (10 * req.query.page) ? (10 * req.query.page) : posts.length;
                var startIndex = (10 * req.query.page) - 10;

                posts = posts.slice(startIndex, endIndex);
            }
            res.json(posts);
        }
    });

    if (process.env.NODE_ENV === 'development') {
        //POST
        router.post('/', function (req, res, next) {
            var title = req.body.title;
            var text = req.body.text;
            if (title && text) {
                var post = { title: title, text: text, created_at: new Date(), markdown: true };
                blogDb.posts.save(post);
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'Title and Body are required.' });
            }
        });

        //PUT
        router.put('/', function (req, res, next) {
            
            var title = req.body.title;
            var text = req.body.text;
            var id = req.body.id;
            if (title && text && id) {
                var post = { title: title, text: text, edited_at: new Date(), markdown: true };
                blogDb.posts.update({ _id: id }, post);
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'Id, Title and Body are required.' });
            }
        });

        //DELETE
        router.delete('/', function (req, res, next) {
            if (req.query.id) {
                blogDb.posts.remove({ _id: req.query.id });
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, message: 'Id is required to delete a blog post.' })
            }
        });
    }



    return router;
}

module.exports = routes;
