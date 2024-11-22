import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users', (req, res) => {
    const { page = 1, per = 5 } = req.query;
    const currentPage = parseInt(page);
    const perPage = parseInt(per);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    
    const pagedUsers = users.slice(start, end);
    
    res.send(pagedUsers);
  });
  // END

  return app;
};
