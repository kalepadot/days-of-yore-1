import React from 'react';
import PropTypes from 'prop-types';

function Memory(props){

  let imgSource = "http://source.unsplash.com/250x150/?" + props.image;

  return (
    <React.Fragment>
      <div onClick = {() => props.whenMemoryClicked(props.id)}> {/* div triggers MemoryClick */}
        <img src={imgSource} alt="memory vibes" />
        <h3>{props.content}</h3>
        <p>{props.date}</p>
      </div>
      <button onclick={() => props.onClickingDelete(props.id)}>Delete</button>
      <button onClick={() => props.onClickingEdit(props)}>Edit</button>
    </React.Fragment>
  );
}

Memory.propTypes = {
  content: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
}

export default Memory;