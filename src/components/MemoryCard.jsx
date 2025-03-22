import { decode } from "html-entities";
import { useEffect, useState } from "react";
import EmojiButton from "./EmojiButton";
export default function MemoryCard({
  handleClick,
  data,
  selectedCards,
  matchedCards,
}) {
  const emojiArray = [
    "🐶",
    "🐷",
    "🐙",
    "🐛",
    "🐵",
    "🐶",
    "🐷",
    "🐙",
    "🐛",
    "🐵",
  ];

  const emojiEl = data.map((emoji, index) => {

    const selectedCardEntry = selectedCards.find(
        (emoji) => emoji.index === index
      );
      const matchCardEntry = matchedCards.find(
        (emoji) => emoji.index === index
      );

      const cardStyle = matchCardEntry ? "card-item--matched" : (selectedCardEntry ? "card-item--selected" :"")
    // console.log(btnStyle)

    return (
      <li key={index} className={`card-item ${cardStyle}`}>
        <EmojiButton
          handleClick={()=>handleClick(emoji.name, emoji.unicode, index)}
          emoji={emoji}
          style="btn btn--emoji"
          selected={selectedCardEntry}
          matched={matchCardEntry}  
          index={index}
        />
      </li>
    );
  });

  return <ul className="card-container">{emojiEl}</ul>;
}
