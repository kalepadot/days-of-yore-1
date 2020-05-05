import React from 'react';
import MemoryForm from './MemoryForm';
import MemoryList from './MemoryList';
import EditMemoryForm from './EditMemoryForm';
import * as a from './../actions';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

class MemoryControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flippedOver = [],
      selectedMemory = null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedMemory != null) {
      this.setState({
        selectedMemory: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const toggleAction = a.toggleForm();
      dispatch(toggleAction);
    }
  }

  handleAddingNewMemoryToList = () => {

  }

  handleFlippingCard = (id) => {
    if (this.state.flippedOver.includes(id)) {
      const newFlippedOver = this.state.flippedOver.filter(x => x !== id);
      this.setState({flippedOver: newFlippedOver});
    } else {
      this.state.flippedOver.push(id);
    }
  }

  handleDeletingMemory = (id) => {

  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingMemoryInList = () => {
    this.setState({
      editing: false,
      selectedMemory: null
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditMemoryForm memory={this.state.selectedMemory} onEdit={this.handleEditingMemoryInList} />;
      buttonText = "Return to memory list";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <MemoryForm onNewMemoryCreation={this.handleAddingNewMemoryToList} />;
      buttonText = "Return to memory list";
    } else {
      currentlyVisibleState = <MemoryList onMemorySelection={this.handleFlippingCard} flippedOver={this.state.flippedOver} />;
      buttonText = "Add memory";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

MemoryControl = connect(mapStateToProps)(MemoryControl);

export default withFirestore(MemoryControl);
