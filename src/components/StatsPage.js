import React from 'react';
import Chart from 'react-apexcharts'
import url from './common/apilink.json';

class StatsPage extends React.Component {

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
		options: {
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
		series: [],
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
		}).then( users => this.setState ({users: users, users_ready: true}));

		fetch(url.BASE_URL + '/api/shops')
		.then((response) => {
		  return response.json()
		}).then( shops => this.setState ({shops: shops}));

	  }

    render() {
		var series = [0, 0]
		if (this.state.users_ready && !this.state.users_done) {
			var users = this.state.users.filter(x => x.role=="user").length
			var deliveries = this.state.users.length - users
			//this.setState({series: [users, deliveries]})
			series = [users, deliveries]
		}
        return(
            <React.Fragment className="align-center">
                <h2> Stats </h2>
				<Chart options={this.state.options} series={series} type="donut" width={500} height={320} />
            </React.Fragment>
                
		);
    }
}

export default StatsPage;