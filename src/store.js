import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    panel: {
      display: false,
      text: ""
    }
  },
  mutations: {
    panelText (text) {
      this.state.panel.text = text
      this.state.panel.display = true
    },
    panelClose () {
      this.state.panel.display = false
    }
  }
})
