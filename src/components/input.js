import React, {createRef} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import NewTags from "./new-tags";
import addIcon from './../img/add.svg'
import saveIcon from './../img/save.svg'
import PropTypes from 'prop-types'

class Input extends React.Component {

    state = {
        title: '',
        body: '',
        tagsList: [],
        bodyHighlight: '',
        createdAt: '',
        edit: false
    }

    tagsRef = createRef();

    onTitle = (e) => {
        this.setState({title: e.target.value});
    }

    onBody = (e) => {
        this.setState({
            body: e.target.value
        }, () => {
            this.setState({
                bodyHighlight: this.state.body.replace(/#\w+/gu, '<span class="input__highlight-on">$&</span>')
            })
        })
    }

    setTags = (tags) => {
        this.setState({tagsList: tags});
    }

    getEditNoteData = (data) => {
        this.setState({
            title: data.title,
            body: data.body,
            tagsList: data.tags,
            createdAt: data.createdAt,
            edit: true
        }, () => this.tagsRef.current.onEdit(this.state.tagsList));
    }

    createNote = (e) => {
        e.preventDefault();
        if (this.state.body.trim() || this.state.title.trim()) {
            const notesList = [...this.props.notes];
            const hashtags = (this.state.body.match(/#\w+/gu) || []).map(ht => ht.slice(1));
            const uniqTags = new Set([...this.state.tagsList, ...hashtags]);
            const note = {
                title: this.state.title,
                body: this.state.body,
                tags: Array.from(uniqTags),
                createdAt: new Date().toISOString()
            }

            if (!this.state.edit) notesList.unshift(note)

            if (this.state.edit) {
                const index = notesList.findIndex(note => note.createdAt === this.state.createdAt)
                notesList.splice(index, 1, note)
                this.setState({edit: false})
            }

            localStorage.setItem('notes', JSON.stringify(notesList))
            this.props.refresh(notesList);
            this.setState({
                title: '',
                body: '',
                tagsList: [],
                bodyHighlight: ''
            })
            this.tagsRef.current.clearTags()
            this.tagsRef.current.clearTagInput()
        }
    }

    render() {
        const {title, body, tagsList, edit} = this.state;
        return (
            <div className="input">
                <div className="input__fields">
                    <input className="input__title input-reset"
                           value={title}
                           onChange={this.onTitle}
                           placeholder="Enter note title"/>
                    <div className="input__wrapper">
                        <TextareaAutosize className="input__body input-reset"
                                          value={body}
                                          onChange={this.onBody}
                                          placeholder="Enter note body"
                                          minRows={3}
                                          maxRows={10}/>
                        <div className="input__highlight"
                             dangerouslySetInnerHTML={{
                                 __html: this.state.bodyHighlight
                             }}>
                        </div>
                    </div>
                    <NewTags edit={true} setTags={this.setTags} tags={tagsList} ref={this.tagsRef}/>
                </div>
                <button className="input__add btn-reset"
                        onClick={this.createNote}>
                    <img src={edit ? saveIcon : addIcon} alt="Save"/>
                </button>
            </div>
        );
    }
};

Input.propTypes = {
    notes: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired
}

export default Input;
