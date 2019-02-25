import React, { Component } from 'react'
import User from './user'
import UsersForm from './users-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { usersListSelector, userEditingSelector } from '../selectors'
import { addUser, loadUsers } from '../ac'

class UsersList extends Component{
  static propTypes = {
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func,
    addUser: PropTypes.func,
    editing: PropTypes.boolean
  }

  render(){
    let addUserButton, usersForm
    if (!this.props.editing){
      addUserButton = 
        <form onSubmit={this.handleSubmit} className='entityForm'>
          <input type="submit" value="Add user" className='control' />
        </form>  
    } else {
      usersForm = <UsersForm />
    }
    return  (
      <>
        <table className='entities'>
        <tbody>
          {this.body}
        </tbody>
        </table>
        {usersForm}
        {addUserButton}
      </>
    )
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.addUser()
  }

  get body(){
    const { users } = this.props;
    return users.map((user) => (
        <User id={user.id} key={user.id}/>
    ))  
  }

  componentDidMount() {
    const { fetchUsers } = this.props
    fetchUsers && fetchUsers()
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    editing: userEditingSelector(state),
    users: usersListSelector(state)
  }), 
  (dispatch, ownProps) => ({ //mapDispatchToProps
    addUser: () => dispatch(addUser()),
    fetchUsers: () => dispatch(loadUsers())
  })
)(UsersList)