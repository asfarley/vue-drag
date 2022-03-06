Vue.config.devtools = true;

const ICON_ON_COLOR = "#005BBB";
const ICON_OFF_COLOR = "#FFD500";

var app = new Vue({
  el: '#app',
  data: {
	bound: false,
	editmode: true,
	zoomlevel: 1,
  icons: [ {x: 50, y: 50, rx: 15, ry: 15, width: 30, height: 30, selected: false, style: "fill:"+ICON_OFF_COLOR+";stroke:black;stroke-width:5;", tag: "NWR"}, {x: 100, y: 50, rx: 15, ry: 15, width: 30, height: 30, selected: false, style: "fill:"+ICON_ON_COLOR+";stroke:black;stroke-width:5;", tag: "IN"} ],
	equations: [{text:"NWR = !NWR"}],
	interval: "",
	timers: [],
	tags: {"NWR": false, "IN": true},
	new_tag_name: "",
	new_equation_text: "",
	new_timer_ms: 0,
	iconStyles: [
	{rx: 15, ry: 15, width: 30, height: 30, style: "fill:"+ICON_OFF_COLOR+";stroke:black;stroke-width:5;" },
	{rx: 15, ry: 15, width: 30, height: 30, style: "fill:"+ICON_ON_COLOR+";stroke:black;stroke-width:5;" }
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
		else
		{
			this.tags[icon.tag] = !this.tags[icon.tag];
		}
    },
	release: function () {
		this.bound = false;
		for(const icon of this.icons){
			icon.selected = false;
		}
	},
		scroll: function (ev) {
		this.zoomlevel *= ev.deltaY > 0 ? 0.9 : 1.1;
		let width = 900 * this.zoomlevel;
		let height = 600 * this.zoomlevel;
		const svg = document.getElementById("drawing");
		svg.setAttribute("viewBox", "0 0 " + width + " " + height); 
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
	},
	addLegion: function(num)
	{
		const ICON_ROW_COUNT = 10;
		const ICON_COL_COUNT = 100;

		const VERTICAL_OFFSET = 600 * num; 
		const VERTICAL_PADDING = 200;
		//Generate a large amount of icons for performance testing.
		for(let i=0; i<ICON_ROW_COUNT; i++)
		{
			for(let j=0; j<ICON_COL_COUNT;j++)
			{
				let x = j*40;
				let y = i*40 + VERTICAL_OFFSET + VERTICAL_PADDING;
			this.icons.push( {x: x, y: y, rx: 15, ry: 15, width: 30, height: 30, selected: false, style: "fill:"+ICON_ON_COLOR+";stroke:black;stroke-width:5;", tag: "NWR"} )
			}
		}
	}

 },
 beforeMount(){
	 			this.addLegion(0);
	 			this.addLegion(1);
	 			this.addLegion(2);
	 			this.addLegion(3);
		}
})