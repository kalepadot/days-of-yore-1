import React from 'react';
import MemoryForm from './MemoryForm';
import MemoryList from './MemoryList';
import EditMemoryForm from './EditMemoryForm';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

class MemoryControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flippedOver: [],
      selectedMemory: null,
      editing: false,
      formVisibleOnPage: false
    };
  }

  handleClick = () => {
    if (this.state.selectedMemory != null) {
      this.setState({
        selectedMemory: null,
        editing: false
      });
    } else {
      this.setState({formVisibleOnPage: !this.state.formVisibleOnPage});
      // const { dispatch } = this.props;
      // const toggleAction = a.toggleForm();
      // dispatch(toggleAction);
    }
  }

  handleAddingNewMemoryToList = () => {
    this.setState({formVisibleOnPage: false});
    // const { dispatch } = this.props;
    // const action = a.toggleForm();
    // dispatch(action);
  }

  handleFlippingCard = (id) => {
    if (this.state.flippedOver.includes(id)) {
      const newFlippedOver = this.state.flippedOver.filter((x) => x !== id);
      this.setState({flippedOver: newFlippedOver});
    } else {
      const newArray = [...this.state.flippedOver, id];
      this.setState({flippedOver: newArray});
    }
  }

  handleDeletingMemory = (id) => {
    this.props.firestore.delete({collection: 'memories', doc: id}); 
    this.setState({selectedMemory: null});
  }

  handleEditClick = (memory) => {
    this.setState({
      editing: true,
      selectedMemory: memory
    });
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
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <MemoryForm onMemoryCreation={this.handleAddingNewMemoryToList} />;
      buttonText = "Return to memory list";
    } else {
      currentlyVisibleState = <MemoryList onMemorySelection={this.handleFlippingCard} onClickingDelete={this.handleDeletingMemory} onClickingEdit={this.handleEditClick} flippedOver={this.state.flippedOver} />;
      buttonText = "Add memory";
    }

    return (
      <React.Fragment>
        <div>
          {currentlyVisibleState}
        </div>
        <div className="mainBody">
          <button onClick={this.handleClick}>{buttonText}</button>
        </div>
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
