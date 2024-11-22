import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
  app.post("/users", (req, res) => {
    const user = {id: generateId(), token: generateToken(), firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email};
    users.push(user);

    res.cookie("token", user.token);

    res.redirect(`/users/${user.id}`);
  });

  app.get("/users/:id", (req, res) => {
    const userToken = req.cookies.token;
    const user = users.find(({id, token}) => id === req.params.id && token === userToken);
      
    if (!user) {
      return res.status(404).send("User not found");
    }
    else {
      return res.view("src/views/users/show", {user});
    }
      
  })
  // END
};
