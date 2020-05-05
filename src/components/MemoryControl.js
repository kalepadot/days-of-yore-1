import React from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

class MemoryControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flippedOver = [];
      selectedMemory = null
    };
  }

  handleClick = () => {

  }

  handleAddingNewMemoryToList = () => {

  }

  handleChangingSelecteMemory = (id) => {

  }

  handleDeletingMemory = (id) => {

  }

  handleEditingMemoryInList = () => {

  }

  render() {

    return ();
  }
}

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

MemoryControl = connect(mapStateToProps)(MemoryControl);

export default withFirestore(MemoryControl);
