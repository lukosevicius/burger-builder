import React, {Component,Fragment} from 'react'

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render(){
        return(
            <Fragment>
                <Toolbar 
                    toggle={this.toggleSideDrawerHandler}/>
                <Sidedrawer 
                    open={this.state.showSideDrawer}
                    toggle={this.toggleSideDrawerHandler}
                    />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout;