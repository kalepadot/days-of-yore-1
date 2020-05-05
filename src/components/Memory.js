import React from 'react';
import PropTypes from 'prop-types';

function Memory(props){

  let imgSource = "http://source.unsplash.com/250x150/?" + props.image;

  return (
    <div className="memoryCard">
      <div className="clickable" onClick = {props.whenMemoryClicked(props.id)}>
        <img src={imgSource} alt="memory vibes" />
        <h3>{props.content}</h3>
        <p>{props.date}</p>
      </div>
      <button onClick={() => props.onClickingDelete(props.id)}>Delete</button>
      <button onClick={() => props.onClickingEdit(props)}>Edit</button>
    </div>
  );
}

Memory.propTypes = {
  content: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  whenMemoryClicked: PropTypes.func,
  id: PropTypes.string,
  front: PropTypes.string,
  back: PropTypes.string
}

export default Memory;