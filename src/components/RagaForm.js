import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ragaFormValidation from '../validation/ragaFormValidation';

export const fields = [
  'name',
  'summary',
  'medicalConditions[]',
  //'asc',
  //'desc',
  //'ascWestern',
  //'descWestern',
  //'histogram[]',
  //'audio[]',
];

class RagaForm extends Component {
  render() {
    const {
      fields: {
        name,
        summary,
        medicalConditions,
        //asc,
        //desc,
        //ascWestern,
        //descWestern,
        //histogram,
        //audio,
        },
      handleSubmit,
      resetForm,
      invalid,
      submitting,
      } = this.props;

    return (<form onSubmit={handleSubmit}>
        <div>
          <label>Raga Name</label>
          <div>
            <input type="text" placeholder="Raga Name" {...name} />
          </div>
        </div>
        <div>
          <label>Raga Summary</label>
          <div>
            <input type="text" placeholder="Raga Summary" {...summary} />
          </div>
        </div>
        <div>
          <button onClick={(event) => {
                event.preventDefault();
                medicalConditions.addField();
              }}><i/> Add Medical Condition
          </button>
        </div>
        {!medicalConditions.length && <div>No Medical Conditions</div>}
        {medicalConditions.map((medicalCondition, medicalConditionIndex) => <div key={medicalConditionIndex}>
          <div>
            <label>Medical Condition #{medicalConditionIndex + 1}</label>
            <div>
              <input type="text" placeholder="Medical Condition" {...medicalCondition} />
            </div>
            <div>
              <button onClick={(event) => {
                  event.preventDefault();
                  medicalConditions.removeField(medicalConditionIndex);
                }}><span className="glyphicon glyphicon-trash"></span></button>
            </div>
          </div>
        </div>)}
        <div>
          <button disabled={submitting || invalid} onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

RagaForm = reduxForm({
  form: 'raga',
  fields,
  ragaFormValidation,
})(RagaForm);

export default RagaForm;
