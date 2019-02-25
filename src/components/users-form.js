import React, { Component } from 'react'
import { connect } from 'react-redux'
import { insertUser, updateUser, cancelUser } from '../ac'
import { userCurrentSelector, userCurrentIdSelector } from '../selectors'
import PropTypes from 'prop-types'

class UserForm extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      login: PropTypes.string,
      email: PropTypes.string
    })
  }
  
  state = {
    id: null,
    name: '',
    lastname: '',
    email: '',
    login: ''
  }

  componentDidMount(){
    const { userCurrentId, user } = this.props;
    if (userCurrentId !== null) {
      this.setState({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        login: user.login
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onReset={this.handleReset} className='entityForm'>
        <label className='entityField'>login:
          <input
            value={this.state.login}
            onChange={this.handleChange('login')}
            className={this.getClassName('login')}
          />
        </label>
        <label className='entityField'>email:
          <input
            value={this.state.email}
            onChange={this.handleChange('email')}
            className={this.getClassName('email')}
          />
        </label>
        <label className='entityField'>name:
          <input
            value={this.state.name}
            onChange={this.handleChange('name')}
            className={this.getClassName('name')}
          />
        </label>
        <label className='entityField'>lastname:
          <input
            value={this.state.lastname}
            onChange={this.handleChange('lastname')}
            className={this.getClassName('lastname')}
          />
        </label>
        <div>
          <input type="submit" value="Submit" className='control' disabled={!this.isValidForm()} />
          <input type="reset" value="Cancel" className='control'/>
        </div>
      </form>
    )
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    if (this.props.userCurrentId !== null){
      this.props.updateUser(this.state)  
    } else {
      this.props.insertUser(this.state)
    }
    this.setState({
      id: null,
      name: '',
      lastname: '',
      email: '',
      login: ''
    })
  }

  handleReset = (ev) => {
    ev.preventDefault()
    this.props.cancelUser(this.state)
  }

  isValidForm = () => ['name', 'lastname', 'email', 'login'].every(this.isValidField)

  isValidField = (type) => this.state[type].length >= limits[type].min

  getClassName = (type) => (this.isValidField(type) ? '' : 'inputError')

  handleChange = (type) => (ev) => {
    const { value } = ev.target
    if (value.length > limits[type].max) return
    this.setState({
      [type]: value
    })
  }
}

const limits = {
  name: {
    min: 2,
    max: 50
  },
  lastname: {
    min: 2,
    max: 50
  },
  email: {
    min: 6,
    max: 50
  },
  login: {
    min: 5,
    max: 50
  }
}

export default connect(
  (state, props) => ({
    user: userCurrentSelector(state),
    userCurrentId: userCurrentIdSelector(state)
  }),
  (dispatch, props) => ({
    insertUser: (user) => dispatch(insertUser(user)),
    updateUser: (user) => dispatch(updateUser(user)),
    cancelUser: () => dispatch(cancelUser())
  })
)(UserForm)
