const router = require("express").Router();

module.exports = (app) => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  app.use(router);

  // UNHANDLE ROUTE RESPONSE
  app.all('*', (req, res) => {
    res.status(404).send({
      statusCode: 404,
      message: `OOPs!! from Masamo Expenses Backend. Server can't find ${req.originalUrl}.
      This could be a typographical issue. 
      Check the API specification for further guidance`,
    });
  });
  
  // UNHANDLED ERRORS
  app.use((error, req, res, next) => {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  });

  return router;
}