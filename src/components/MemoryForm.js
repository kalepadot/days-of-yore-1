import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
 
function MemoryForm(props) {
  const firestore = useFirestore(); // the hook

  function addMemoryToFirestore(event) {
    event.preventDefault();
    props.onMemoryCreation();

    return firestore.collection('memories').add(
      {
        front: event.target.front.value,
        back: event.target.back.value,
        date: event.target.date.value,
        image: event.target.image.value,
      }
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={() => addMemoryToFirestore(event)}> 
        <input
          type='text'
          name='front'
          placeholder='memory subject' />
        <textarea
          type='text'
          name='back'
          placeholder='memory content' />
        <input
          type='text'
          name='image'
          placeholder='word to describe image' />
      </form>
    </React.Fragment>
  );
}


MemoryForm.propTypes = {
  onMemoryCreation: PropTypes.func
};

export default MemoryForm;