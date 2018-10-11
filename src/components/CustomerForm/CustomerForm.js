import React, { PureComponent } from 'react';
import styles from './CustomerForm.module.scss';
import Textfield from '../Textfield/Textfield.js';
import PartySizePicker from '../PartySizePicker/PartySizePicker.js';
import StatusPicker from '../StatusPicker/StatusPicker.js';
import IncrementInput from '../IncrementInput/IncrementInput.js';
import PartySizeWaitTimes from '../PartySizeWaitTimes/PartySizeWaitTimes.js';


class CustomerForm extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      partySize: this.props.partySize,
      phone: this.props.phone,
      note: this.props.note,
      status: this.props.status,
      quoted: this.props.quoted
    };
    this.changedName = this.changedAttribute.bind(this)('name');
    this.changedPhone = this.changedAttribute.bind(this)('phone');
    this.changedPartySize = this.changedAttribute.bind(this)('partySize');
    this.changedNote = this.changedAttribute.bind(this)('note');
    this.changedStatus = this.changedAttribute.bind(this)('status');
    this.changedQuotedWaitTime = this.changedAttribute.bind(this)('quoted');
  }

  changedAttribute(attributeName) {
    return (attributeValue) => {
      this.setState({
        [attributeName]: attributeValue
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
        <hr />
        <div className={styles.row}>
          <IncrementInput value={this.props.quoted} onChange={this.changedQuotedWaitTime} step={5} label="Quoted Wait" suffix="min" allowZero={true} />
          <PartySizeWaitTimes partySize={this.state.partySize} />
        </div>
        <hr />
        <div className={styles.row}>
          <Textfield value={this.props.note} onChange={this.changedNote}  label="Notes" placeholder="ie. Special requirements" />
        </div>
        <div className={styles.row}>
          <StatusPicker value={this.props.status} onChange={this.changedStatus} />
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
  quoted: 0,
  onChange: () => {}
};


export default CustomerForm;
