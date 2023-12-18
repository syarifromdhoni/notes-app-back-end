const Hapi = require("@hapi/hapi");
// import routes.js
const routes = require("./routes");

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
    host: "localhost",
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
