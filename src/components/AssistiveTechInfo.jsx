import React from 'react'

export const AssistiveTechInfo = ({emojisData, matchedCards}) => {
  return (
    <div className="sr-only">
        <h2>Game status</h2>
        <p>Number of matched pairs: {matchedCards.length/2}.</p>
        <p>Number of cards left to match: {emojisData.length - matchedCards.length}.</p>
    </div>
  )
}
