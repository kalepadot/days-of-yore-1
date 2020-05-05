import React from "react";
import PropTypes from "prop-types";
import Memory from "./Memory";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

function MemoryList(props) {
  useFirestoreConnect([
    { collection: 'memories' }
  ]);
const memories = useSelector(state => state.firestore.ordered.memories);
if (isLoaded(memories)) {
  return (
    <React.Fragment>
      <hr/>
      {memories.map((memory) => {
        if (props.flippedOver.includes(memory.id)) {
          return <Memory 
          whenMemoryClicked={ props.onMemorySelection(memory.id) }
          back={memory.back}// back = content
          date={memory.date}
          image={memory.image}
          id={memory.id}
          key={memory.id} />
        } else {
          return <Memory
          whenMemoryClicked= { props.onMemorySelection(memory.id) }
          front={memory.front}// front = subject
          date={memory.date}
          image={memory.image}
          id={memory.id}
          key={memory.id} />
        }
      })}
    </React.Fragment>
  );
} else{
  return (
    <React.Fragment>
      <h3>Loading...</h3>
    </React.Fragment>
    )
  }
}

MemoryList.proptypes = {
  onMemorySelection: PropTypes.func,
  flippedOver: PropTypes.array
};

export default MemoryList;