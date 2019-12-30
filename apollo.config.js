module.exports = {
  client: {
    excludes: ["src/generated/*.*"],
    service: {
      name: "pop-api",
      url: "http://localhost:4000/graphql"
    }
  }
};
