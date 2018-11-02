import React, { PureComponent } from 'react';
import styles from './TagsPicker.module.scss';
import { connect } from "react-redux";
import addIcon from '../../assets/add.svg';
import ReactSVG from 'react-svg';
import Tag from '../Tag/Tag';
import TagsList from '../TagsList/TagsList';
import PopoutSearch from '../PopoutSearch/PopoutSearch';
import PropTypes from 'prop-types';

class TagsPicker extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags,
      selected: this.props.value.reduce((selected, tagLabel) => {
        selected[tagLabel] = true;
        return selected
      }, {})
    };

    this.updatedTags = this.updatedTags.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  updatedTags(selected, tags) {
    this.updateSelected(selected);

    if(tags) {
      this.setState({ tags });
    }
  }

  updateSelected(selected) {
    this.setState({ selected }, () => {
      this.props.onChange(this.state.selected);
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <TagsList tags={this.state.tags} selected={this.state.selected} onChange={this.updateSelected}>
          <PopoutSearch list={this.state.tags} selected={this.state.selected} onChange={this.updatedTags}>
            <Tag>
              <div className={styles.inlineButton}>
                <div className={styles.iconContainer}>
                  <ReactSVG src={addIcon} svgClassName={styles.addIcon} />
                </div>
                Add
              </div>
            </Tag>
          </PopoutSearch>
        </TagsList>
      </div>
    );
  }
}

TagsPicker.defaultProps = {
  tags: [],
  value: [],
  onChange: () => {}
};

TagsPicker.propTypes = {
  tags: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func
};

const mapStateToProps = state => ({
  tags: state.tags
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TagsPicker);

