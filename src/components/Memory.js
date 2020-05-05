import React from 'react';
import PropTypes from 'prop-types';

function Memory(props){

  let imgSource = "http://source.unsplash.com/250x150/?" + props.image;

  return (
    <React.Fragment>
      <div onClick = {() => props.whenMemoryClicked(props.id)}> {/* div triggers MemoryClick */}
        <img src={imgSource} alt="memory image" />
        <h3>{props.front}</h3>
        <h3>{props.back}</h3>
        <p>{props.date}</p>
      </div>
      <button>Delete</button>
      <button>Edit</button>
    </React.Fragment>
  );
}

Memory.propTypes = {
  front: PropTypes.string,
  back: PropTypes.string,
  date: React.PropTypes.instanceOf(Date),
  image: PropTypes.string
}