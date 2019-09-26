const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout.js');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


db.authenticate().
then(() => {
  console.log('connected to the database');
})

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false}))

app.get("/", (req, res) => {
  res.send(layout(""));
})

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

app.get("/", (req, res) => {
  res.redirect("/wiki");
})


const PORT = 3000;

const init = async () => {
  await User.sync({force: true})
  await Page.sync({force: true})

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
