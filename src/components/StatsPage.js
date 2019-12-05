import React from 'react';
import Chart from 'react-apexcharts'
import url from './common/apilink.json';
import Card from 'react-bootstrap/Card';


const MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

class StatsPage extends React.Component {
	constructor(props){
		super(props);
		this.parse_bar = this.parse_bar.bind(this);
	}

	getOptions() {
		return (
			{xaxis:{
				categories: ['Users', 'Shops' ]
			},
		})
	}

	getSeries(state){
		return(
			
			[ {name: 'Cantidades',
				data: [state.users.length, state.shops.length]
			}]

		)
	}
			
	margin = {top: 20, right: 20, bottom: 30, left: 40};
	
	state = { 
		width: 50, 
		users: [],
		users_ready: false,
		users_done: false, 
		shops: [],
		dummy: null,
		donut_options: {
            dataLabels: {
			  enabled: true,
            },
			labels: ["Users", "Deliveries"],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  show: false
                }
              }
            }],
            legend: {
                position: 'right',
                offsetY: 0,
                height: 230,
			},
			plotOptions: {
				pie: {
				  donut: {
					labels: {
					  show: true,
					  name: {
						show: true
					  },
					  value: {
						show: true
					  },
					  total: {
						  show:true
					  }
					}
				  }
				}
			  }
          },
		donut_series: [],
		radar_options: {
			labels: this.last_6_months()[1],
		},
		radar_series: [{
			name: 'Series 1',
			data: [1, 2, 3, 4, 5, 6],
		  }],
		bar_options: {
			xaxis: {
				categories: this.last_6_months()[1],
			}
		},
		bar_series: [
			{
				name: 'Cantidades',
				data: [55, 44]
			}
		],
		months: this.last_6_months()[0]

    };
	getInitialState() {
		return { width: 50 };
	  };
	 
	handleBarClick(element, id){ 
	console.log(`The bin ${element.text} with value ${element.value} was clicked`);
	}

	componentWillMount() {

		fetch(url.BASE_URL+`/api/admin/users`)
		.then((response) => {
		  return response.json()
		}).then( users => this.setState ({users: users, users_ready: true})).then(
			users => this.parse_radar(users)
		).then(
			users => this.parse_bar(users)
		);

		fetch(url.BASE_URL + '/api/shops')
		.then((response) => {
		  return response.json()
		}).then( shops => this.setState ({shops: shops}));

		//this.setState({radar_options: {labels: this.last_6_months()}})
	  }

	last_6_months(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()
		var prev = []
		var months = []
		//prev.push(month)
		for(var i = 5; i> 0; i -= 1) {
			var d = new Date(year, month-i, 1)
			prev.push(d.getMonth())
		}
		prev.push(month)
		console.log(prev)
		prev.map(e => {months.push(MONTHS[e])})
		console.log(months)
		//this.setState({months: prev})
		return [prev, months]
	}

	parse_radar(users){
		console.log("llegue mama")
		console.log(this.state.users)
		console.log("me fui mama")
	}

	parse_bar(users){
		var new_prop = [{
			'name': 'Cantidades',
			'data': [1, 2, 3, 4, 5, 6]
		}]
		
		var created = new Array(6).fill(0)
		var prev_months = this.state.months;

		this.state.users.forEach( user => {
			var timestamp = user.creation_date;
			var date = new Date(timestamp);
			var month = date.getMonth()

			var index = prev_months.indexOf(month)
			if (index >= 0) {
				created[index] +=1;
			}
		})
		var new_prop = [{
			'name': 'Cantidades',
			'data': created
		}]
		this.setState({bar_series: new_prop})
		this.setState({dummy: 1})
		console.log("hola")
	}

    render() {
		var donut_series = [0, 0]
		if (this.state.users_ready && !this.state.users_done) {
			var users = this.state.users.filter(x => x.role=="user").length
			var deliveries = this.state.users.length - users
			//this.setState({series: [users, deliveries]})
			donut_series = [users, deliveries]
		}
		//<Chart options={this.state.radar_options} series={this.state.radar_series} type="radar" height={350} />
		//<Chart options={this.state.donut_options} series={donut_series} type="donut" width={500} height={320} />
        return(
            <div>
                <Card style={{ width: '100em' }} >
					<Card.Body>
						<Card.Title> <h2> Stats </h2></Card.Title>
					
					</Card.Body>
				</Card>
				<div id="chartContainer1" style={{display: "inline-block"}}>
					<Chart options={this.state.donut_options} series={donut_series} type="donut" width={500} height={320} />
				</div>
				<div id="chartContainer2" style={{display: "none"}}>
					<Chart options={this.state.radar_options} series={this.state.radar_series} type="radar" height={320} />
				</div>
				<div id="chartContainer3" style={{display: "inline-block"}}>
					<Chart options={this.state.bar_options} series={this.state.bar_series} type="bar" width={500} height={320} />
				</div>
            </div>                
		);
    }
}

export default StatsPage;