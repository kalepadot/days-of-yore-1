import React from "react";
import PropTypes from "prop-types";
import Memory from "./Memory";
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function MemoryList(props) {
  useFirestoreConnect([
    { collection: 'memories' }
  ]);
const memories = useSelector(state => state.firestore.ordered.memories);
if (isLoaded(memories)) {
  return (
    <React.Fragment>
      {memories.map((memory) => {
          return <Memory 
          onClickingDelete={props.onClickingDelete}
          onClickingEdit={props.onClickingEdit}
          whenMemoryClicked={props.onMemorySelection}
          content={props.flippedOver.includes(memory.id) ? memory.back : memory.front}
          date={memory.date}
          image={memory.image}
          front={memory.front}
          back={memory.back}
          id={memory.id}
          key={memory.id} />
      })}
    </React.Fragment>
  );
} else{
  return (
    <React.Fragment>
      <h3>Remembering...</h3>
    </React.Fragment>
    )
  }
}

MemoryList.proptypes = {
  onMemorySelection: PropTypes.func,
  flippedOver: PropTypes.array
};

export default MemoryList;