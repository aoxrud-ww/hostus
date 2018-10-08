import React, { PureComponent } from 'react';
import styles from './CustomerForm.module.scss';
import Textfield from '../Textfield/Textfield.js';
import PartySizePicker from '../PartySizePicker/PartySizePicker.js';

class CustomerForm extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      partySize: this.props.partySize,
      phone: this.props.phone,
      note: this.props.note
    };
    this.changedName = this.changedAttribute.bind(this)('name');
    this.changedPhone = this.changedAttribute.bind(this)('phone');
    this.changedPartySize = this.changedAttribute.bind(this)('partySize');
    this.changedNote = this.changedAttribute.bind(this)('note');
  }

  changedAttribute(attributeName) {
    return (attributeValue) => {
      this.setState(prevState => {
        prevState[attributeName] = attributeValue;
      }, () => {
        this.props.onChange(this.state);
      });
    }
  }

  render() {
    return (
      <div>
        <div className={styles.row}>
          <div className={styles.twoColumn}>
            <Textfield placeholder="ie. Jane Doe" label="Customer Name" onChange={this.changedName} value={this.props.name}  />
            <Textfield label="Phone" mask="(999) 999 - 9999" onChange={this.changedPhone} value={this.props.phone} />
          </div>
        </div>
        <div className={styles.row}>
          <PartySizePicker onChange={this.changedPartySize} value={this.props.partySize}  />
        </div>
        <div className={styles.row}>
          <Textfield value={this.props.note} onChange={this.changedNote}  label="Notes" placeholder="ie. Special requirements" />
        </div>
      </div>
    );
  }
}

CustomerForm.defaultProps = {
  name: '',
  partySize: 1,
  phone: '',
  note: '',
  onChange: () => {}
};


export default CustomerForm;
