import React from 'react';
import Tag from "./tag";
import PropTypes from 'prop-types'

class NewTags extends React.Component {

    state = {
        tagInput: '',
        tagsList: this.props.tags
    }

    onTag = (e) => {
        this.setState({tagInput: e.target.value})
    }

    clearTags = () => {
        this.setState({tagsList: []})
    }

    clearTagInput = () => {
        this.setState({tagInput: ''})
    }

    onEdit = (tags) => {
        this.setState({tagsList: tags})
    }

    removeTag = (value) => {
        const tempArr = [...this.state.tagsList];
        const index = tempArr.indexOf(value);
        tempArr.splice(index, 1);
        this.setState({tagsList: tempArr}, () => this.props.setTags(this.state.tagsList))
    }

    onTagAdd = (e) => {
        let value = this.state.tagInput.trim();
        if (value[0] === '#') value = value.slice(1)
        if (value) {
            if (e.code === 'Enter' || e.code === 'Space') {
                this.addTag(value)
            }
        }
    }

    addTag = (value) => {
        if (this.state.tagsList.find(tag => tag.toLowerCase() === value.toLowerCase())) return
        this.setState({tagInput: '', tagsList: [...this.state.tagsList, value]}, () => {
            this.props.setTags(this.state.tagsList);
        })
    }

    render() {

        const {tagsList, tagInput} = this.state;
        const {edit} = this.props;

        return (
            <div className="new-tags">
                <span className="new-tags__title">Tags:</span>
                {tagsList.map(tag => <Tag value={tag} edit={edit} key={tag} onRemove={this.removeTag}/>)}
                <input className="new-tags__input input-reset"
                               placeholder="New tag"
                               value={tagInput}
                               onChange={this.onTag}
                               onKeyDown={this.onTagAdd}/>

            </div>
        );
    }
};

NewTags.propTypes = {
    edit: PropTypes.bool.isRequired,
    tags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired
}

export default NewTags;
