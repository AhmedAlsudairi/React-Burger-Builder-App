import React , {Component} from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {

    state={
        controls: {
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validaiton: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validaiton: {
                    required: true,
                    maxLength: 10,
                    minLength: 3
                },
                valid: false,
                touched: false
            }
        },
        formIsvalid:false,
        isSignup: true
    }

    checkValidity(value, rules){
        let validity = true;

        if(rules.required){
            validity = value !== '' && validity;
        }
        if(rules.minLength){
            validity= value.length >= rules.minLength && validity;
        }
        if(rules.maxLength){
            validity= value.length <= rules.maxLength && validity;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            validity = pattern.test(value) && validity;
        }

        return validity;
    }

    changeHandler = (event,inputID)=> {

        const updatedFormInputElement = {
            ...this.state.controls[inputID]
        }

        updatedFormInputElement.value= event.target.value;
        const validity = this.checkValidity(updatedFormInputElement.value,updatedFormInputElement.validaiton);
        updatedFormInputElement.valid=validity;
        updatedFormInputElement.touched=true;
        console.log(updatedFormInputElement);
        
        const updatedForm= {
            ...this.state.controls
        }
        
        updatedForm[inputID] = updatedFormInputElement;
        
        
        let formVilidity = true;

        for(let inputID in updatedForm){
            formVilidity= updatedForm[inputID].valid && formVilidity;

        }


        this.setState({controls: updatedForm, formIsvalid: formVilidity});

        
    }

     authHandler = (event) => {
        
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthMethodHandler = () => {
            this.setState(prevState => {
                return {
                    isSignup: !prevState.isSignup
                }
            })
    }
    render(){

        const formArr = [];
        for(let key in this.state.controls){
            formArr.push({
                id: key,
                config: this.state.controls[key]
            })

        }

        

        let form = ( <form onSubmit={this.authHandler}>
            
           {formArr.map(inputForm=>{
               return (
                <Input 
                key={inputForm.id} 
                elementType={inputForm.config.elementType} 
                elementConfig={inputForm.config.elementConfig} 
                value={inputForm.config.value}
                invalid={!inputForm.config.valid}
                shouldValidate={inputForm.config.validaiton}
                touched={inputForm.config.touched}
                changed={(event)=>{this.changeHandler(event,inputForm.id)}}/>
               );
           })}
            <Button btnType='Success'  disabled={!this.state.formIsvalid}>SUBMIT</Button>
            
        </form>);

           if(this.props.loading){
               form = <Spinner /> 
           }

           let errorMessage = null;
           if(this.props.error){
            errorMessage= <p style= {{color:'red'}}>{this.props.error} </p>
           }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                <Button btnType='Danger' clicked={this.switchAuthMethodHandler} >{this.state.isSignup? 'SWITCH TO SIGNIN' : 'SWITCH TO SIGNUP'} </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);