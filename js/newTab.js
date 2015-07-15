var apps = {};

function loopOverApps(apps) {
	var ary = [];
	for (var key in apps) {
		// console.log(key + ': ' + apps[key].sumTime);
		if (apps.hasOwnProperty(key)) {
			ary.push({domain: key, sumTime: apps[key].sumTime});
		}
	}
	console.log(ary);
	return ary;
}

function update() {
	apps = loopOverApps(JSON.parse(localStorage["apps"]));
	apps.sort(function(a,b) { return b.sumTime - a.sumTime });
	apps = apps.slice(0, 20);
}

function updateDraw() {
	svg.selectAll('rect').data(apps).enter()
		.append('rect')
		.attr({'x': 5,
					 'y': function(d, i) { return i * 22},
					 'width': function(d, i) { return x(d.sumTime)},
					 'height': 20,
					 'fill': 'steelblue'
	});

	svg.selectAll('text').data(apps).enter()
		.append('text')
		.text( function(d) { return d.domain + '-' + d.sumTime})
		.attr({
			'x': 6,
			'y': function(d, i) {return i * 22 + 14},
			'fill': 'white',
			'font-size': '12px'
	});
}

update();

var x = d3.scale.linear()
    .domain([0, d3.max(apps, function(d) { return d.sumTime})])
    .range([0, 900]);

var body = d3.select('body').style({'background-color': '#333'})


var svg = d3.select('body').append('svg').attr({'width': 1200, 'height': 600}).style({'margin': '50px'});

svg.selectAll('rect').data(apps).enter()
	.append('rect')
	.attr({'x': 200,
				 'y': function(d, i) { return i * 25 },
				 'width': function(d, i) { return x(d.sumTime) },
				 'height': 22,
				 'fill': 'steelblue'
	})
	.on('mouseover', function() {
		d3.select(this)
		.transition()
		.duration(100)
		.attr('fill', '#4499da')
	})
	.on('mouseout', function() {
		d3.select(this)
		.transition()
		.duration(100)
		.attr('fill', 'steelblue')
	});

svg.selectAll('text.domain').data(apps).enter()
	.append('text')
	.text( function(d) { return d.domain })
	.attr({
		'x': 10,
		'y': function(d, i) {return i * 25 + 14},
		'fill': '#bbb',
		'font-size': '12px'
});

svg.selectAll('text.sum-time').data(apps).enter()
	.append('text')
	.text( function(d) { return d.sumTime + 'sec.'})
	.attr({
		'x': function(d, i) {return x(d.sumTime) + 205},
		'y': function(d, i) {return i * 25 + 14},
		'fill': 'white',
		'font-size': '12px'
});


