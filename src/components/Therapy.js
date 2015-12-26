import React                          from 'react';
import classnames                     from 'classnames';
import {bindActionCreators}           from 'redux';
import {connect}                      from 'react-redux';
import * as Actions                   from '../actions/therapyActions';
import {Alert}                        from 'react-bootstrap';
import _                              from 'lodash';
var Select = require('react-select');
import '../sass/therapy.scss';
import 'react-select/dist/react-select.min.css';

const TherapyPage = React.createClass({
  componentWillMount: function(){
    this.actions = bindActionCreators(Actions,this.props.dispatch);
    this.actions.fetchRagas();
  },
  onSelectRaga(raga){
    this.actions.selectRaga(raga);
  },
  onSelectMedicalCondition(condition){
    this.actions.selectCondition(condition);
  },
  onSaveForm(){
    this.actions.saveForm();
  },
  onUpdateUser(e){
    this.actions.updateUser(e.target.value);
  },
  render() {
    console.log(this.props);
    let {therapyStore} = this.props;
    if(therapyStore.isInitializing)
      return <div className="loader"/>

    if(therapyStore.initializationError)
      return <Alert bsStyle="danger">{therapyStore.errorMessage}</Alert>

    let medicalConditions = [];
    let summary = '';
    if(therapyStore.raga){
      let index = _.findIndex(therapyStore.ragas,{name : therapyStore.raga});
      medicalConditions = therapyStore.ragas[index].medicalConditions;
      summary = therapyStore.ragas[index].summary;
    }



    return (
      <div className="form-page">
        <div className="row">
          <div className="col-md-4">
            <label>Select Raga</label>
            <div className="list-group">
              {
                therapyStore.ragas.map(raga=>{
                  return (
                    <button
                      className={classnames('list-group-item',{'active' : therapyStore.raga === raga.name})}
                      onClick={this.onSelectRaga.bind(this,raga.name)}>
                      {raga.name}
                    </button>
                  )
                })
              }
            </div>
          </div>
          <div className="col-md-4">
            <label>Select Raga</label>
            <div className="list-group">
              {
                medicalConditions.map(condition=>{
                  return (
                    <button
                      className={classnames('list-group-item',{'active' : therapyStore.medicalCondition === condition})}
                      onClick={this.onSelectMedicalCondition.bind(this,condition)}>
                      {condition}
                    </button>
                  )
                })
              }
            </div>
          </div>
          <div className="col-md-4">
            <label>Summary</label>
            <pre>
              {summary}
            </pre>
          </div>
        </div>
      </div>
    )
  }
});


export default connect(state=>{return {therapyStore: state.therapyStore}})(TherapyPage);
