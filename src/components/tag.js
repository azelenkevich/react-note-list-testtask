import React from 'react';
import remove from './../img/remove.svg'
import PropTypes from 'prop-types'

const Tag = ({edit, value, onRemove, onFilter}) => {

    const removeIcon = edit ? <img src={remove}
                                   width={10}
                                   alt="remove"
                                   className="tag__remove"
                                   onClick={(e) => onRemove(value)}/> : null;

    return (
        <span className="tag" onClick={() => onFilter ? onFilter(value) : null}>
            {value}
            {removeIcon}
        </span>
    );
};

Tag.propTypes = {
    edit: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onRemove: PropTypes.func,
    onFilter: PropTypes.func
}

export default Tag;
