import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.register(view, {engine: {pug}});
  app.get("/users", (req, res) => {
    res.view("src/views/users/index", { users });
  })

  app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find((user) => user.id === userId);
    if (!user) {
      res.status(404).send("User not found");
    } 
    else {
    res.view("src/views/users/show", { user })};
  })
  // END

  return app;
};
