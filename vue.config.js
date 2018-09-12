module.exports = {
  configureWebpack: {
    devServer: {
      before: function(app) {
        app.get('/config.vue.json', function(req, res) {
          res.json(require("./conf/config.vue.json"));
        });
      }
    }
  }
};
