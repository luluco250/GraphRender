//Graph Render

(function() {

	var line_size = 3;
	var cells = 16;
	
	const canvas = document.getElementById("canvas_graph");
	const ctx = canvas.getContext("2d");
	
	const res = {
		x: canvas.width,
		y: canvas.height
	};
	
	const input_cells = document.getElementById("input_cells");
	const input_cells_text = document.getElementById("input_cells_text");

	const input_line_size = document.getElementById("input_line_size");
	const input_line_size_text = document.getElementById("input_line_size_text");

	const input_function = document.getElementById("input_function");

	const cell_step = {
		x: res.x / cells,
		y: res.y / cells
	}
	
	const date = new Date();
	var time = date.getTime();

	function graph_function(n) {
		lock_functions(true);
		try {
			return eval(input_function.value);
		} catch (e) {
			return n;
		} finally {
			lock_functions(false);
		}
	}

	const backup = {
		alert: alert
	}
	function lock_functions(lock) {
		if (lock) {
			alert = null
		} else {
			alert = backup.alert;
		}
	}

	function clear() {
		ctx.clearRect(0, 0, res.x, res.y);
	}

	function draw_background() {
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, res.x, res.y);
		
		const gray = "#555";
		const blue = "#06f";

		ctx.lineWidth = 1;
		ctx.strokeStyle = gray;

		ctx.beginPath();

		for (var x = 0; x <= res.x; x += cell_step.x) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, res.y);
		}
		for (var y = 0; y <= res.y; y += cell_step.y) {
			ctx.moveTo(0, y);
			ctx.lineTo(res.x, y);
		}
		
		ctx.stroke();
		ctx.closePath();
		ctx.strokeStyle = blue;
		ctx.lineWidth = 3;
		ctx.beginPath();

		ctx.moveTo(res.x / 2, 0);
		ctx.lineTo(res.x / 2, res.y);
		ctx.stroke();

		ctx.closePath();
		ctx.beginPath();

		ctx.moveTo(0, res.y / 2);
		ctx.lineTo(res.x, res.y / 2);
		ctx.stroke();

		ctx.closePath();
	}

	function draw_pixel(x, y, size, color = "#000") {
		ctx.fillStyle = color;
		ctx.fillRect(x - size * 0.5, y - size * 0.5, size, size);
	}

	function draw_line() {
		ctx.beginPath();
		ctx.strokeStyle = "#f00";

		const last = {
			x: 0,
			y: 0
		}

		for (var x = 0; x < res.x; ++x) {
			y = graph_function((x - res.x * 0.5) / res.x * cells) * res.y / cells;
			ctx.moveTo(last.x, res.y - last.y - res.y / 2);
			ctx.lineTo(x, res.y - y - res.y / 2);
			last.x = x;
			last.y = y;
			//draw_pixel(x, res.y - y - res.y * 0.5, line_size, "#f00");
		}
		ctx.stroke();
		ctx.closePath();
	}

	function render() {
		clear();
		draw_background();
		draw_line();
	}

	function logic() {
		cells = input_cells.value;
		cell_step.x = res.x / cells;
		cell_step.y = res.y / cells;

		line_size = input_line_size.value;

		input_cells_text.innerText = cells;
		input_line_size_text.innerText = line_size;

		//time = date.getTime();
		++time;
	}

	function main() {
		logic();
		render();
		requestAnimationFrame(main);
	}

	main();
}());
