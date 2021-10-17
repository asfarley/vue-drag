Vue.config.devtools = true

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
	bound: false,
	x: 50,
	y: 50
  },
  methods: {
    rectClick: function () {
      this.message = "Bound"
	  this.bound = true;
    },
	release: function () {
		this.message = "Unbound"
		this.bound = false;
	},
	mousemove: function (event) {
		if(this.bound)
		{
			let drawing = document.getElementById('drawing');
			let rect = drawing.getBoundingClientRect();
			this.x = event.clientX - rect.left;
			this.y = event.clientY - rect.top;	
		}
	}
  }
})