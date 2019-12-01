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
	
	state = { width: 50, users: [], shops: [] };
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
		}).then( users => this.setState ({users: users}));

		fetch(url.BASE_URL + '/api/shops')
		.then((response) => {
		  return response.json()
		}).then( shops => this.setState ({shops: shops}));

	  }

    render() {
        return(
            <React.Fragment className="align-center">
                <h2> Stats </h2>
				<Chart options={this.getOptions()} series={this.getSeries(this.state)} type="bar" width={500} height={320} />
            </React.Fragment>
                
        );
    }
}

export default StatsPage;