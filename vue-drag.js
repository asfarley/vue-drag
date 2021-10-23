Vue.config.devtools = true;

var app = new Vue({
  el: '#app',
  data: {
	bound: false,
	editmode: true,
	icons: [ {x: 50, y: 50, selected: false, style: 0}, {x: 100, y: 100, selected: false, style: 1} ],
	equations: [],
	interval: "",
	timers: [],
	tags: {},
	new_tag_name: "",
	new_equation_text: "",
	new_timer_ms: 0,
	iconStyles: [
	{rx: 15, ry: 15, width: 30, height: 30, style: "fill:red;stroke:black;stroke-width:5;" },
	{rx: 15, ry: 15, width: 30, height: 30, style: "fill:green;stroke:black;stroke-width:5;" }
	]
  },
  mounted() {
	  this.interval = setInterval(() => {
        this.execute();
    }, 1000);
  },
  methods: {
    rectClick: function (icon) {
		if(this.editmode == true)
		{
			this.bound = true;
			icon.selected = true;
		}      
    },
	release: function () {
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
		let icon = {x: 10, y: 10, selected: false, style: 0};
		this.icons.push(icon);
	},
	createtag: function() {
		this.tags[this.new_tag_name] = 0;
	},
	createequation: function(text) {
		let equation = {text: this.new_equation_text};
		this.equations.push(equation);
	},
	execute: function()
	{
		for (const eq of this.equations) 
		{
			let splitEq = eq.text.split("=");
			let lhs = splitEq[0];
			let rhs = splitEq[1];
			console.log("RHS: " + rhs);
			let rhsValue = eval(rhs);
			this.tags[lhs] = rhsValue;	
		}
	}
  }
})