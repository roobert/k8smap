module.exports = {
  configureWebpack: {
    plugins: [
      new RobPlugin = {
          devServer: {
            before: function(app) {
              app.get('/test', function(req, res) {
                res.json({ custom: 'response' });
              });
            }
          }
        }
    ]
  }
};
