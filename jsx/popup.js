var Container = React.createClass({
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
  			<DomainCard domain={app.domain} sumTime={app.sumTime} />
  		)
  	}.bind(this));
  	return (
			<div className="container">
				<table>
					{domainNodes}
				</table>
			</div>
  	);
  }
});

var DomainCard = React.createClass({
  render: function() {
  	return (
			<tr className="domain-card">
				<td>{this.props.domain}</td>
				<td style={{textAlign: "right"}}>{this.props.sumTime}</td>
				<td>sec.</td>
			</tr>
  	);
  }
});

React.render(<Container />, document.getElementById("content"));