import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

export default function Form({ handleSubmit, handleChange, isRender }) {

  const some = useRef(null)

  useEffect(() => {
    if (!isRender) {
      some.current.focus()
    }
  }, [isRender])

  return (
    <div className="form-container" ref={some} tabIndex={-1}>
      <form className="wrapper">
      <div className="form__inner-wrapper">
        <label htmlFor="category">Choose a category:</label>
        <select name="category" id="category" onChange={handleChange}>
            <option value="animals-and-nature">Animals & Nature</option>
            <option value="food-and-drink">Food & Drink</option>
            <option value="travel-and-places">Travel & Places</option>
            <option value="objects">Objects</option>
            <option value="symbols">Symbols</option>
          
        </select>
      </div>
      <div className="form__inner-wrapper">
      <label htmlFor="number">Choose a category:</label>
      <select name="number" id="number" onChange={handleChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      </div>
        <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
      </form>
    </div>
  );
}
