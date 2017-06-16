import React from 'react'
import ReactDOM from 'react-dom'

import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
import Example5 from './Example5'
import Example6 from './Example6'

import Homework1 from './Homework1'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Homework1 sortMethod="id" />, document.getElementById('root'))
})
