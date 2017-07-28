
module.exports = {
  onCreate: function(input, out) {
    this.state = {
      hideImage: false
    };
  },

  onInput: function(input) {

  },

  onMount: function() {
  },

  onRender: function(out) {

  },

  onUpdate: function() {
  },

  onDestroy: function() {

  },
  handleOnLoad: function(ev, el) {
    console.log(ev, el, "error")
    this.state.hideImage = true;
  }
};
