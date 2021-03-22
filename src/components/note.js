import React, {useState} from 'react';
import editIcon from './../img/edit.svg'
import rubbishIcon from './../img/rubbish.svg'
import moment from "moment";
import Tag from "./tag";
import PropTypes from 'prop-types'

const Note = ({noteData, onDelete, onEdit, onFilter}) => {

    const [edit, setEdit] = useState(false)

    const {title, body, createdAt, tags} = noteData;

    const editNote = () => {
        onEdit(noteData);
        setEdit(true)
    }

    return (
        <div className={edit ? 'note note__edit' : 'note'}>
            <div className="note__first">
                <span className="note__title">{title ? title : 'Untitled'}</span>
                <span className="note__date">{moment(createdAt).format("MMM Do YY")}</span>
            </div>
            <div className="note__body">{body}</div>
            <div className="note__footer">
                <div className="note__tags">
                    <span className="note__tags-title">Tags:</span>
                    {tags.map(tag => <Tag edit={false} value={tag} key={tag} onFilter={onFilter}/>)}
                </div>
                <div className="note__btns">
                    <button className="note__btn btn-reset" onClick={editNote}>
                        <img src={editIcon} width={12} alt="edit"/>
                    </button>
                    <button className="note__btn btn-reset" onClick={() => onDelete(createdAt)}>
                        <img src={rubbishIcon} width={12} alt="remove"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

Note.propTypes = {
    noteData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired
    }),
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired
}

export default Note;
