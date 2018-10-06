import React, { Component } from 'react';
import styles from './AddParty.module.scss';
import { connect } from "react-redux";
import Button from '../Button/Button.js';
import Textfield from '../Textfield/Textfield.js';


class AddParty extends Component {
  render() {
    return (
      <div className={styles.container}>

        <div class={styles.form}>
          <div class={styles.twoColumn}>
            <Textfield placeholder="ie. Jane Doe" label="Customer Name" />
            <Textfield label="Phone" mask="(999) 999 - 9999"/>
          </div>
          <Textfield label="Party Size" placeholder="ie. 1" mask="9[9]" />
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return { };
};


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddParty);
