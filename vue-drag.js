Vue.config.devtools = true;

var app = new Vue({
  el: '#app',
  data: {
	bound: false,
	editmode: true,
  icons: [ {x: 50, y: 50, rx: 15, ry: 15, width: 30, height: 30, selected: false, style: "fill:red;stroke:black;stroke-width:5;", tag: "NWR"}, {x: 100, y: 100, rx: 15, ry: 15, width: 30, height: 30, selected: false, style: "fill:green;stroke:black;stroke-width:5;", tag: ""} ],
	equations: [{text:"NWR = !NWR"}],
	interval: "",
	timers: [],
	tags: {"NWR": false},
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
		this.render();
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
			with(this.tags)
			{
				eval(eq.text);	
			}
		}
	},
	render: function()
	{
		for(const icon of this.icons)
		{
			if(icon.tag == "")
			{
				continue;
			}
			
			if(!(icon.tag in this.tags))
			{
				continue;
			}
			
			let val = this.tags[icon.tag];
			
			if(val == false)
			{
				let style = this.iconStyles[0];
				icon.rx = style.rx;
				icon.ry = style.ry;
				icon.width = style.width;
				icon.height = style.height;
				icon.style = style.style;
			}
			
			if(val == true)
			{
				let style = this.iconStyles[1];
				icon.rx = style.rx;
				icon.ry = style.ry;
				icon.width = style.width;
				icon.height = style.height;
				icon.style = style.style;
			}
		}
	}
  }
})