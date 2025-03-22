import React, { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

const GameOver = ({ reset, play }) => {
  const some = useRef(null);
  useEffect(() => {
    some.current.focus();
  }, []);

  return (
    <div className="wrapper wrapper--accent" ref={some} tabIndex={-1}>
      <p className="p--large">You've matched all the memory cards!</p>
      {/* <button className="btn btn--text" onClick={()=>play()}>
        Play Again
      </button> */}
      <RegularButton handleClick={() => play()}>Play Again</RegularButton>
      {/* <button className='btn btn--text' onClick={()=>reset()}>Restart</button> */}
      <RegularButton handleClick={() => reset()}>Restart</RegularButton>
    </div>
  );
};

export default GameOver;
