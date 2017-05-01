var clientTemplate = _.template(document.getElementById("client-template").innerHTML);

var onClientEvent = function(clientID, type, value) {
  switch(type){
    case "button":
      var duration = (type === "CLICK") ? 500 : 200;
      Velocity(getClientRootDOM(clientID), { opacity: (type === "CLICK") ? 0.5 : 0.7 }, { duration: duration }, "easeInSine");
      Velocity(getClientRootDOM(clientID), { opacity: 1 }, { duration: duration}, "easeInSine");
      break;
    default:
  }
}

var onClientConnected = function(newClient, clients) {
  renderClients(clients);
}

var renderClients = function(clients) {
  document.getElementById("client-list").innerHTML = "";
  clients.forEach(function(client){
    document.getElementById("client-list").innerHTML += clientTemplate(client);
  });
}

// util
var getClientRootDOM = function(clientID){
  return document.getElementById("client-"+clientID);
}

var api = new GhoustApi({
  hostname: "localhost",
  port: 1884,
  verbose: true,
  //callbacks
  onClientConnected: onClientConnected,
  onClientEvent: onClientEvent,
});
