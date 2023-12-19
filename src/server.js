const Hapi = require("@hapi/hapi");
// import routes.js
const routes = require("./routes");

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    // kita tambahkan CORS
    routes: {
      cors: {
        origin: ["*"],
        credentials: true,
      },
    },
  });

  //gunakan routes.js
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
