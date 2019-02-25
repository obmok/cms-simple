import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { deleteUser, editUser } from '../../ac'
import { createUserSelector } from '../../selectors'


class User extends PureComponent{

  static propTypes = {
    user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
    login: PropTypes.string,
    email: PropTypes.string
    })
  }

  handleEdit = () => {
    const {editUser} = this.props
    editUser()
  }

  handleDelete = () => {
    const {deleteUser} = this.props
    deleteUser()
  }

  render(){
    const { user } = this.props
    return(
      <tr className='entity'>
        <td>{user.name}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td>{user.login}</td>
        <td><button onClick={this.handleEdit}>Edit</button></td>
        <td><button onClick={this.handleDelete}>Delete</button></td>
      </tr>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const userSelector = createUserSelector()
    return (state, ownProps) => ({
      user: userSelector(state, ownProps)
    })
  },
  (dispatch, props) => ({
    deleteUser: () => dispatch(deleteUser(props.id)),
    editUser: () => {
      dispatch(editUser(props.id))
    }
  })
  )(User)