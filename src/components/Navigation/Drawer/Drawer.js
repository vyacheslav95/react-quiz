import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  {to: '/', label: 'Список тестов', exact: true},
  {to: '/auth', label: 'Авторизация', exact: false},
  {to: '/quiz-creator', label: 'Создание теста', exact: false},
]

class Drawer extends Component {

  renderLinks() {
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
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.closed)
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClose={this.props.onClose}/> : null}
      </>
    )
  }
}

export default Drawer