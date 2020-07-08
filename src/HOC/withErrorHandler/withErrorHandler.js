import React , { Component}  from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliry from '../Auxiliry/Auxiliry';
const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{
        state={
            error: null
        }
        componentWillMount(){
            this.resInter=axios.interceptors.response.use(response=>response,error=>{
                this.setState({error: error});
                
            });

           this.reqInter= axios.interceptors.request.use(request=>{
                this.setState({error:null},null);
                return request;
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.resInter);
        }

        closeErrorMassageHandler = ()=>{
            this.setState({error: null});
        }
        render(){
             return (
            <Auxiliry>
                <Modal show={this.state.error} 
                cancel={this.closeErrorMassageHandler}>
                    {this.state.error? this.state.error.message:null}
                </Modal>
        <WrappedComponent {...this.props}/>
            </Auxiliry>
        
        );
        }
       
    }
}

export default withErrorHandler;