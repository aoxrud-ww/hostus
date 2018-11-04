import React, { Component } from 'react';
import styles from './CustomerProfile.module.scss';
import { connect } from "react-redux";
import Button from '../Button/Button.js';
import PageHeader from '../PageHeader/PageHeader.js';
import CustomerForm from '../CustomerForm/CustomerForm.js';
import { updateWaitlistVisit } from '../../actions';
import * as routes from '../../routes';
import PropTypes from 'prop-types';

class CustomerProfile extends Component {

  constructor(props) {
    super(props);

    this.updatedCustomerForm = this.updatedCustomerForm.bind(this);
    this.save = this.save.bind(this);
    this.state = {};
  }

  updatedCustomerForm(customer) {
    this.setState({
      customer
    });
  }

  save() {
    const customer = Object.assign({}, this.props.customer, this.state.customer);
    this.props.update(customer);
    this.props.history.push(routes.HOME);
  }

  render() {
    return (
      <div className={styles.container}>
        <PageHeader title="Profile" />

        <div className={styles.customer}>
          <div className={styles.form}>
            <CustomerForm onChange={this.updatedCustomerForm} {...this.props.customer} />
          </div>
          <Button theme="primary" onClick={this.save}>Save</Button>
        </div>
      </div>
    );
  }
}

CustomerProfile.propTypes = {
  customer: PropTypes.object.isRequired,
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
