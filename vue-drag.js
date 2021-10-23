Vue.config.devtools = true;

var app = new Vue({
  el: '#app',
  data: {
	bound: false,
	editmode: true,
	icons: [ {x: 50, y: 50, selected: false, style: 0}, {x: 100, y: 100, selected: false, style: 1} ],
	equations: [],
	timers: [],
	tags: [],
	iconStyles: [
	{rx: 15, ry: 15, width: 30, height: 30, style: "fill:red;stroke:black;stroke-width:5;" },
	{rx: 15, ry: 15, width: 30, height: 30, style: "fill:green;stroke:black;stroke-width:5;" }
	]
  },
  methods: {
    rectClick: function (icon) {
		//console.log("rectClick");
		if(this.editmode == true)
		{
			this.bound = true;
			icon.selected = true;
		}      
    },
	release: function () {
		//console.log("release");
		this.bound = false;
		for(const icon of this.icons){
			icon.selected = false;
		}
	},
	mousemove: function (ev) {
		if(this.bound)
		{
			let drawing = document.getElementById('drawing');
			let rect = drawing.getBoundingClientRect();
			
			for(const icon of this.icons){
				if(icon.selected)
				{
					icon.x = ev.clientX - rect.left;
					icon.y = ev.clientY - rect.top;		
				}
			}
		}
	},
	createicon: function() {
		console.log("createicon");
		let icon = {x: 10, y: 10, selected: false, style: 0};
		this.icons.push(icon);
	}
  }
})