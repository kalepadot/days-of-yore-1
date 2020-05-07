import React from 'react';
import MemoryForm from './MemoryForm';
import MemoryList from './MemoryList';
import EditMemoryForm from './EditMemoryForm';
import { withFirestore, isLoaded } from 'react-redux-firebase';

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
    }
  }

  handleAddingNewMemoryToList = () => {
    this.setState({formVisibleOnPage: false});
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
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>Nah, sign in first bro!</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {

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
}

export default withFirestore(MemoryControl);
