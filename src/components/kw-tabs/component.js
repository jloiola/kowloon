
module.exports = {

  onCreate: function(input, out) {
    this.state = {
      selectedIndex: input.selectedIndex || 0
    }
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

  handleOnClick(index, ev, el) {
    ev.preventDefault();
    ev.target.blur();
    this.state.selectedIndex = index;
    // emit an Id too?
    this.emit("onclick", index, ev, el)
  }
};
