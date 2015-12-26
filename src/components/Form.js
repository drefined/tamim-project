import React                          from 'react';
import {bindActionCreators}           from 'redux';
import {connect}                      from 'react-redux';
import * as Actions                   from '../actions/formActions';
var Select = require('react-select');
import '../sass/form.scss';
import 'react-select/dist/react-select.min.css';

const Form = React.createClass({
  componentWillMount: function(){
    this.actions = bindActionCreators(Actions,this.props.dispatch);

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
    let {formStore} = this.props;

    let ragas = Object.keys(formStore.ragas).map(raga=>{
      return {
        value : raga,
        label : formStore.ragas[raga].name
      }
    });

    let medicalConditions = [];
    if(formStore.form.raga){
      console.log(formStore.ragas[formStore.form.raga]);
      medicalConditions = formStore.ragas[formStore.form.raga].medicalConditions.map(condition=>{
        return {
          value : condition,
          label : condition
        }
      })
    }

    return (
      <div className="form-page">
        <div className="row">
          <div className="col-md-4">
            <label>Raga</label>
            <Select
              value={formStore.form.raga}
              options={ragas}
              onChange={this.onSelectRaga}
            />
          </div>
          <div className="col-md-4">
            <label>Symptoms</label>
            <Select
              value={formStore.form.medicalCondition}
              options={medicalConditions}
              onChange={this.onSelectMedicalCondition}
            />
          </div>
          <div className="col-md-4">
            <label>XYZ</label>
            <Select


            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 buttons-container">
            <div className="input-group">
              <input
                value={formStore.form.user}
                placeholder="Name"
                type="text"
                className="form-control"
                onChange={this.onUpdateUser}
              />
              <div className="input-group-btn">
                <button
                   onClick={this.onSaveForm}
                   className="btn btn-primary">
                    Save Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});


export default connect(state=>{return {formStore: state.formStore}})(Form);
