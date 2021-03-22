import React from 'react';
import Note from "./note";
import Tag from "./tag";
import PropTypes from 'prop-types'

class NotesList extends React.Component {

    state = {
        notesList: [],
        visibleNotes: [],
        filter: false,
        filterTags: []
    }

    componentDidMount() {
        this.setState({notesList: this.props.notes})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.notes !== this.props.notes) {
            this.setState({notesList: this.props.notes})
        }
    }

    filterNotes = () => {
        const tempNotes = [...this.state.notesList].filter(note => {
            return this.state.filterTags.every(tag => note.tags.includes(tag))
        })
        this.setState({visibleNotes: tempNotes})
    }

    onDelete = (key) => {
        const index = this.state.notesList.findIndex(note => note.createdAt === key)
        const tempNotes = [...this.state.notesList];
        tempNotes.splice(index, 1)
        this.setState({notesList: tempNotes}, () => {
            localStorage.setItem('notes', JSON.stringify(this.state.notesList))
            this.props.refresh(this.state.notesList)
        })

    }

    onFilter = (value) => {
        const tempTags = new Set([...this.state.filterTags]);
        tempTags.add(value)
        this.setState({filterTags: Array.from(tempTags)}, () => {
            this.filterNotes();
        })
    }

    onFilterRemove = (value) => {
        const tempTags = [...this.state.filterTags]
        const index = tempTags.indexOf(value)
        tempTags.splice(index, 1)
        this.setState({filterTags: tempTags}, () => {
            this.filterNotes();
        })
    }

    render() {

        const noteData = this.state.filterTags.length > 0 ? this.state.visibleNotes : this.state.notesList;

        return (
            <div className="notes-list">
                <div className="notes-list__filter">
                    <span className="notes-list__filter-title">Filter by:</span>
                    <div>
                    {this.state.filterTags.map(tag => <Tag value={tag}
                                                           key={tag}
                                                           edit={true}
                                                           onRemove={this.onFilterRemove}/>)}
                    </div>
                </div>
                {noteData.map(note => <Note noteData={note} key={note.createdAt}
                                            onDelete={this.onDelete}
                                            onEdit={this.props.onEdit}
                                            onFilter={this.onFilter}/>)}
            </div>
        );
    }
};

NotesList.propTypes = {
    notes: PropTypes.array.isRequired,
    refresh: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default NotesList;
