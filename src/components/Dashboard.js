import React from 'react';
import * as API       from '../api/api';
import moment from 'moment';

export default React.createClass({
  getInitialState:function() {
    API.getAllForms().then(res=>{
      this.setState({
        forms : res.entity
      })
    }).then(res=>{

    });
    return {
      forms : []
    };
  },
  render () {
    let {forms} = this.state;
    return (
      <div>
        <h4>Submitted Forms</h4>
        <table className="table">
          <thead>
            <tr>
              <th>
                ID
              </th>
              <th>
                USER
              </th>
              <th>
                DATE SUBMITTED
              </th>
            </tr>
          </thead>
          <tbody>
            {
              forms.map(form=>{
                return (
                  <tr key={form.id} onClick={this.onEditForm}>
                    <td>{form.id}</td>
                    <td>{form.user}</td>
                    <td>{moment(form.createdAt).format('MM/DD/YY HH:mm')}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
})
