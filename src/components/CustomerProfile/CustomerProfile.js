import React, { Component } from 'react';
import styles from './CustomerProfile.module.scss';
import { connect } from "react-redux";
import CustomerForm from '../CustomerForm/CustomerForm.js';
import { updateWaitlistVisit } from '../../actions';
import * as routes from '../../routes';
import PropTypes from 'prop-types';

class CustomerProfile extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.state = {};
  }

  save(customer) {
    const customerData = Object.assign({}, this.props.customer, customer);
    this.props.update(customerData);
    this.props.history.push(routes.HOME);
  }

  render() {
    return (
      <div className={styles.container}>

        <div className={styles.customer}>
        <div className='card'>
          <div className={styles.form}>
            <CustomerForm onSave={this.save} {...this.props.customer} />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

CustomerProfile.propTypes = {
  customer: PropTypes.object,
  update: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    customer: state.customer
  };
};


const mapDispatchToProps = {
  update: updateWaitlistVisit
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
