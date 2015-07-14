var Container = React.createClass({displayName: "Container",
	loopOverApps: function(apps) {
		var ary = [];
		for (var key in apps) {
			console.log(apps[key].sumTime);
			if (apps.hasOwnProperty(key)) {
				ary.push({domain: key, sumTime: apps[key].sumTime});
			}
		}
		return ary
	},
	update: function() {
		var apps = JSON.parse(localStorage['apps']);
		var apps_array = this.loopOverApps(apps);
		this.setState({apps_array: apps_array});
	},
	getInitialState: function() {
		var apps = JSON.parse(localStorage['apps']);
		var apps_array = this.loopOverApps(apps);
		
		return {
			apps_array: apps_array
		}
	},
	componentDidMount: function() {
		this.update();
		setInterval(this.update(), 3000);
	},
  render: function() {
  	var domainNodes = this.state.apps_array.map(function(app) {
  		return (
  			React.createElement(DomainCard, {domain: app.domain, sumTime: app.sumTime})
  		)
  	}.bind(this));
  	return (
			React.createElement("div", {className: "container"}, 
				React.createElement("table", null, 
					domainNodes
				)
			)
  	);
  }
});

var DomainCard = React.createClass({displayName: "DomainCard",
  render: function() {
  	return (
			React.createElement("tr", {className: "domain-card"}, 
				React.createElement("td", null, this.props.domain), 
				React.createElement("td", {style: {textAlign: "right"}}, this.props.sumTime), 
				React.createElement("td", null, "sec.")
			)
  	);
  }
});

React.render(React.createElement(Container, null), document.getElementById("content"));