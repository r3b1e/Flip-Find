import React, { useEffect, useRef } from 'react'
import RegularButton from './RegularButton'

export const ErrorCard = ({handleSubmit}) => {
    const divRef = useRef(null)

    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus()
        }
    }, [])


  return (
    <div className='wrapper wrapper--accent' ref={divRef} tabIndex={-1}>
        <p className='p--large'>Sorry, there was an error.</p>
        <p className='p--regular'>Please come back later or click the button below to try restarting the game.</p>
        <RegularButton handleClick={handleSubmit}>
                        Restart The Game
                    </RegularButton>
    </div>
  )
}
