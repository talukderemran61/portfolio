import express from "express"
import bodyparser from 'body-parser';

const app = express();
const port = 6060;

app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static("public"));

let posts = []
let postId = 1;

app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
});

app.post("/create", (req, res) => {
    console.log(`new post:`, req.body);
    const {title, content} = req.body;

    posts.push({
        id: postId++,
        title: title,
        content: content
    });

    console.log(`All posts:`, posts);
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    console.log(req.params);
    const id = +req.params.id;      // unary operator (+) is shorthand for Number()
                                    // or Number(req.params.id)
    posts = posts.filter(post => post.id !== id);

    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const id = +req.params.id;
    const post = posts.find(p => p.id === id);

    res.render("edit.ejs", { post });
});
app.post("/edit/:id", (req, res) => {
    const id = +req.params.id;
    const { title, content } = req.body;

    const post = posts.find(p => p.id === id);

    post.title = title;
    post.content = content;

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});