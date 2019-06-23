const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let switch_btn = document.querySelector(".switch-btn");

window.onresize = function() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}
let velocity = [0.009,0.006, 0.004, 0.003];
let ab_services_radius = [25,35,40,40];
let angle = [60,100,160, 220];
let canvas_bg_color = "rgba(0,0,0,0.04)";
let primary_color = "rgba(126,87,194,1)";
let meteoroids_color = "rgba(0,0,0,0.5)";
let orbit_color = "rgba(0,0,0,0.2)";
let ab_services_names = ["Blog", "Forum", "Free Hosting", "Open Source"];
let meteoroids = [];
let isNormal = true;

function galaxy_color_switch() {
	if(isNormal) {
		canvas.style.backgroundColor = "black";
		meteoroids_color = "rgba(255,255,255,0.5)";
		orbit_color = "rgba(255,255,255,0.2)";
		isNormal = false;
	} else {
		canvas.style.backgroundColor = canvas_bg_color;
		meteoroids_color = "rgba(0,0,0,0.5)";
		orbit_color = "rgba(0,0,0,0.2)";
		isNormal = true;
	}
	
}

switch_btn.addEventListener('click', galaxy_color_switch);

function Meteoroid(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		context.fill();
		context.fillStyle = meteoroids_color;
	}

	this.update = function() {
		if (this.x + this.radius > width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

(function ab_gen_meteoroids() {
	for (let i = 0; i < 500; i++) {
		let radius = Math.random() * 3;
		let x = Math.random() * (width - radius * 2) + radius;
		let y = Math.random() * (height - radius * 2) + radius;
		let dx = (Math.random() - 0.5);
		let dy = (Math.random() - 0.5);
		meteoroids.push(new Meteoroid(x, y, dx, dy, radius));
	}
})();


function ab_core() {
	context.beginPath();
	context.strokeStyle = "rgba(126,87,194,0.3)";
	context.fillStyle = primary_color;
	context.lineWidth = 15;
	context.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();
	context.stroke();

	context.beginPath();
	context.fillStyle = "#FFF";
	context.font = "25pt Arial";
	context.fillText("Ask Buddie", canvas.width / 2, canvas.height / 2 - 10);
	context.font = "10pt Arial";
	context.fillText("Always Seek Knowledge", canvas.width / 2, canvas.height / 2 + 20);
	context.textAlign = "center";
	context.closePath();
}

function ab_orbits() {
	let ab_orbits_radius = 100;
	for(let i = 0; i < 4; i++) {
		ab_orbits_radius += 100;
		context.beginPath();
		context.strokeStyle = orbit_color;
		context.lineWidth = 2;
		context.arc(canvas.width / 2, canvas.height / 2, ab_orbits_radius, 0, Math.PI * 2, true);
		context.closePath();
		context.stroke();
	}
}

function ab_services() {
	let x, y, radius = 100;
	for(let i = 0; i < 4; i++) {
		radius += 100;
		context.beginPath();
		context.lineWidth = 8;
		context.fillStyle = primary_color;
		context.strokeStyle = "rgba(126,87,194,0.3)";
		x = canvas.width / 2 + radius * Math.cos(angle[i]);
		y = canvas.height / 2 + Math.sin(angle[i]) * radius;
		context.arc(x, y, ab_services_radius[i], 0, Math.PI * 2, true);
		context.stroke();
		context.closePath();
		context.fill();

		context.beginPath();
		context.lineWidth = 1;
		context.fillStyle = "#FFF";
		context.font = "7pt Arial";
		context.fillText(ab_services_names[i], x, y);
		context.textAlign = "center";
		context.closePath();
		context.fill();
	}
}

function render() {
	requestAnimationFrame(render);
	context.clearRect(0,0,width,height);
	for(let i = 0; i < meteoroids.length; i++) {
		meteoroids[i].update();
	}
	for(let i = 0; i < 4; i++) {
		angle[i] += velocity[i];
	}
	ab_core();
	ab_orbits();
	ab_services();
}

render();