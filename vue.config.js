module.exports = {
  configureWebpack: {
    devServer: {
      before: function(app) {
        app.get('/test', function(req, res) {
          console.log("hit test!");
          res.json({ custom: 'response' });
        });
      }
    }
  }
};
