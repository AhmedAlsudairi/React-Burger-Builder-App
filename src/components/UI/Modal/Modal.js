import React, {Component} from 'react';
import classes from './Modal.css';
import Auxiliry from '../../../HOC/Auxiliry/Auxiliry';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(prevProps,prevState){
        return prevProps.show!==this.props.show || prevProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('[Modal] willUpdate');
    }

    render(){
         return (
        <Auxiliry>
            <Backdrop show={this.props.show} closed={this.props.cancel}/>
        <div className={classes.Modal}
        style={{transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)' ,
                opacity: this.props.show ? '1' : '0'}}>
            {this.props.children}
        </div>
        </Auxiliry>
       
    );
    }
   
}

export default Modal;