const initializeAPI = (app) => {
  // Standard REST-API-Endpunkt
  app.get("/api/hello", hello);
  // Weitere API-Endpunkte hier hinzufügen
};

const hello = (req, res) => {
  res.send("Hallo Welt!");
};

module.exports = { initializeAPI };
