import React from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
 
function MemoryForm(props) {
  const firestore = useFirestore(); // the hook

  const addMemoryToFirestore = (event) => {
    event.preventDefault();
    props.onMemoryCreation();
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;

    return firestore.collection('memories').add(
      {
        front: event.target.front.value,
        back: event.target.back.value,
        date: dateTime,
        image: event.target.image.value,
      }
    );
  }

  return (
    <React.Fragment>
      <form onSubmit={addMemoryToFirestore}> 
        <input
          type='text'
          name='front'
          placeholder='memory subject' /><br />
        <textarea
          type='text'
          name='back'
          placeholder='memory content' /><br />
        <input
          type='text'
          name='image'
          placeholder='word to describe image' /><br />
        <button type="submit">Add memory</button>
      </form>
    </React.Fragment>
  );
}


MemoryForm.propTypes = {
  onMemoryCreation: PropTypes.func
};

export default MemoryForm;