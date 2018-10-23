import React, { PureComponent } from 'react';
import styles from './TagsList.module.scss';
import Tag from '../Tag/Tag.js';
import PropTypes from 'prop-types';

class TagsList extends PureComponent {

  toggleTag(tag, isActive) {
    this.props.onChange({
      ...this.props.selected,
      [tag.label]: isActive
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.tags.map(tag => (
          <Tag key={tag.label} isActive={this.props.selected[tag.label]} onToggle={this.toggleTag.bind(this, tag)}>
            {tag.label}
          </Tag>
        ))}
        {this.props.children}
      </div>
    );
  }
}

TagsList.defaultProps = {
  onChange: () => {}
};

TagsList.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default TagsList;

