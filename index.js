const express = require("express");
const app = express();

const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id: uuidv4(),
        user: "Amit",
        content: "I Love Coding"
    },
    {
        id: uuidv4(),
        user: "Ankit",
        content: "Let's Party this time :)"
    },
    {
        id: uuidv4(),
        user: "Dipanjana",
        content: "Love me Like You Do !"
    }
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})
app.delete("/posts/:id/del", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((post) => id !== post.id);
    res.redirect("/posts");
})
app.post("/posts", (req, res) => {
    let { user, content } = req.body;
    let id = uuidv4();
    posts.push({ id, user, content });
    res.redirect("/posts");
})
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let { content } = req.body;
    post.content = content
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});
