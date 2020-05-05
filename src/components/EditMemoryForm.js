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
  console.log("MEMORY props", memory);

  return (
    <React.Fragment>
      <form onSubmit={() => handleEditMemoryFormSubmission()}> 
        <input
          type='text'
          defaultValue = {memory.front}
          placeholder='memory subject' /><br />
        <textarea
          type='text'
          defaultValue={memory.back}
          placeholder='memory content' /><br />
        <input
          type='text'
          defaultValue={memory.image}
          placeholder='word to describe image' /><br />
        <button type="submit">Update memory</button>
      </form>
    </React.Fragment>
  );
}

EditMemoryForm.propTypes = {
  onEdit: PropTypes.func,
  memory: PropTypes.object
}

export default EditMemoryForm;