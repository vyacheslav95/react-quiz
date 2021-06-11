import React, {Component} from 'react'
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle"
import Drawer from "../../components/Navigation/Drawer/Drawer"
import {connect} from "react-redux"

class Layout extends Component {
  state = {
    menu: false
  }

  menuToggleHandler = () => this.setState(prevState => {
    return {
      menu: !prevState.menu
    }
  })

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuToggleHandler}
          isAuthenticated={this.props.isAuthenticated}
        />

        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.menuToggleHandler}
        />

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps, null)(Layout)