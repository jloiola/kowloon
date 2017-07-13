
var axios = require('axios');

module.exports = {

  pendingKey: false,

  onCreate: function(input, out) {
    this.state = {
      isFocused: false,
      showMenuOnFocus: false,
      showMenu: false,
      selectedItems: [],
      options: [],
      previousValue: "",
      debounce: input.debounce || 1000,
      optionsPromise: null,
      isLoading: false,
      src: input.src
    };
  },

  onInput: function(input) {
    // console.log("onInput", arguments)
  },

  onMount: function() {
    this.state.previousValue = this.getEl('acInput').value;
  },

  onRender: function(out) {
    // console.log("onRender", arguments)
  },

  onUpdate: function() {
    // console.log("onUpdate", arguments)
  },

  onDestroy: function() {

  },

  // allow override later
  fetchData: function (term) {
    var state = this.state;
    return axios.get("https://jsonplaceholder.typicode.com/users",{term:term}).then(function (res) {
      state.options = res.data;
      state.isLoading = false;
      state.showMenu = true;
    });
  },

  clearAndHide: function () {
    this.state.options = [];
    this.state.showMenu = false;
  },

  onKeyup: function (event) {
    var state = this.state;

    if(this.getEl('acInput').value === "") {
      this.clearAndHide();
      return;
    }

    if(this.getEl('acInput').value === this.state.previousValue) {
      return;
    }

    this.clearAndHide();

    var term = state.previousValue = this.getEl('acInput').value
    if(this.pendingKey) {
      clearTimeout(this.pendingKey)
    }

    state.isLoading = true
    this.pendingKey = setTimeout(function(){
      this.fetchData(term)
    }.bind(this), this.state.debounce);

  },

  onFocus: function() {
    this.state.isFocused = true;
    this.state.showMenu = this.state.showMenuOnFocus;
  },

  onBlur: function() {
    this.state.isFocused = false;
    this.state.showMenu = false;
  }


};
