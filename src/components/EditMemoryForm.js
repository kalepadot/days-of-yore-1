import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditMemoryForm (props) {
  const { memory } = props;
  const firestore = useFirestore();  //hook

  function handleEditMemoryFormSubmission(event) {
    event.preventDefault();
    props.onEdit();
    const propertiesToUpdate = {
      front: event.target.front.value,
      back: event.target.back.value,
      image: event.target.image.value
    }
    return firestore.update({collection: 'memories', doc: memory.id}, propertiesToUpdate)
  }

  return (
    <React.Fragment>
      <form onSubmit={() => handleEditMemoryFormSubmission(event)}> 
        <input
          type='text'
          defaultValue = {memory.front}
          placeholder='memory subject' />
        <textarea
          type='text'
          defaultValue={memory.back}
          placeholder='memory content' />
        <input
          type='text'
          defaultValue={memory.image}
          placeholder='word to describe image' />
      </form>
    </React.Fragment>
  );
}

EditMemoryForm.propTypes = {
  onEdit: PropTypes.function,
  memory: PropTypes.obj
}

export default EditMemoryForm;