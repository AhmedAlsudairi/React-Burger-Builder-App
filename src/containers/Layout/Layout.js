import React, {Component} from 'react';
import Auxiliry from '../../HOC/Auxiliry/Auxiliry';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component  {
    state= {
        showSideDrawer: false
    }

    sideDrawerCloseHandler =() =>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerOpenHandler =() =>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return( <Auxiliry>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
             <Toolbar opened={this.sideDrawerOpenHandler}/>
             <main className={classes.content}>
                 {this.props.children}
             </main>
         </Auxiliry>);
    }
   
    
}

export default Layout;
