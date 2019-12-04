import React from 'react'
import url from './common/apilink.json';
import { toast } from 'react-toastify';
import Editable from './Editable'
class Rules extends React.Component {
    // constructor(props) {
    //     super(props);
    state = {
            rules: []
            
         }
    //     //this.handleEdit = this.handleEdit.bind(this);
    //   }

    state = {
        users: []
      };
      
      componentWillMount() {
    
        fetch(url.BASE_URL+`/api/admin/pricing`)
        .then((response) => {
          debugger
          return response.json()
        }).then( users => this.setState ({users: users}));
      }
    // componentWillMount() {
    
    // fetch(url.BASE_URL+`/api/admin/pricing`)
    // .then((response) => {
    //     return response
    // }).then(function(myJson) {
    //     debugger
    //     console.log(myJson);
    //     this.state.rules = myJson;
    //   })
    // }

    handleEdit(target){
        event.preventDefault();
        console.log(target)
        fetch(url.BASE_URL + `/api/admin/pricing`, {
            method: 'PUT',
            body:({
                rules: target
            })
        }).then(() => { 
            this.componentWillMount() 
            toast.success("Reglas cambiadas exitosamente");
        }).catch((e) => console.log(e));
    }


    setTask({target}){
    console.log(this.state.rules)
    this.setState({rules: target.value});
  }

 
    render() {
        return (
          <React.Fragment>
            <h2> Rules </h2>
            <Editable

                text={this.state.rules}
                placeholder={this.state.rules}
                type="input"
                >
                <inputRules
                    type="text"
                    name="task"
                    placeholder={this.state.rules}
                    value={this.state.rules}
                   onChange={e => this.setTask(e.target.value)}
                />
            </Editable>

            <button onClick={ this.handleEdit }>Save</button>
            
          </React.Fragment>
        );
  }
}
export default Rules;