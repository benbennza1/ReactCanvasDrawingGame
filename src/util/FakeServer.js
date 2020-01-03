// This will be used until the server is implemented
const FakeServer = {
  // this will act as the client requests for now, and returns server "broadcast" expected value
  post: function(src, data) {
    console.log("post! " + JSON.stringify(data));
    // server reveives data
    // server sends back
  },
  fetch: function(src, data) {
    console.log("fetch! " + JSON.stringify(data));
  },
  get: function(src, data) {
    console.log("get! " + JSON.stringify(data));
  }
};

export default FakeServer;
