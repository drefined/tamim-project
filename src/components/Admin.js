import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/adminActions';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';

import '../sass/admin.scss';
import 'react-select/dist/react-select.min.css';

import RagaForm from '../components/RagaForm';

class AdminPage extends React.Component {
  componentWillMount() {
    this.actions = bindActionCreators(Actions, this.props.dispatch);
    this.actions.fetchRagas();
  }

  onFetchRaga(ragaName) {
    this.actions.fetchRaga(ragaName);
  }

  render() {
    let { adminStore } = this.props;

    if (adminStore.isInitializing) return <div className="loader"></div>;
    if (adminStore.initializationError) return <Alert bsStyle="danger">{adminStore.errorMessage}</Alert>;

    const ragas = adminStore.ragas;
    const raga = adminStore.raga;

    let ragaForm;

    if (!_.isEmpty(raga)) {
      ragaForm = (
        <div className="col-md-8">
          <label>Edit Raga: {raga.name}</label>
          <RagaForm />
        </div>
      );
    }

    return (
      <div className="form-page">
        <div className="row">
          <div className="col-md-4">
            <label>Select Raga</label>
            <div className="list-group">
              {
                ragas.map((ragaEntity) => {
                  return (
                    <button className={classNames('list-group-item', { 'active': ragaEntity.name === raga.name })}
                            onClick={this.onFetchRaga.bind(this, ragaEntity.name)}>{ragaEntity.name}</button>
                  );
                })
              }
            </div>
          </div>
          {ragaForm}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return { adminStore: state.adminStore };
})(AdminPage);
