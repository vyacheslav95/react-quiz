import React, {Component} from 'react'
import {NavLink} from "react-router-dom"

import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop"

class Drawer extends Component {

  renderLinks(links) {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={link.exact}
          onClick={this.props.onClose}
        >
          {link.label}
        </NavLink>
      </li>
    ))
  }

  render() {
    const links = [
      {to: '/', label: 'Список тестов', exact: true},
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Создание теста', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false})
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    return (
      <>
        <nav className={`${classes.Drawer} ${this.props.isOpen ? null : classes.closed}`}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClose={this.props.onClose}/> : null}
      </>
    )
  }
}

export default Drawer