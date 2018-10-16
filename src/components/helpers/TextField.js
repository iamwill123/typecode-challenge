import React from 'react'

const TextField = ({ 
  text,
  className,
  highlightText
}) => {
  return (
    <div className={ className }>
      <span className={ highlightText }>
        { text || '' }
      </span>
    </div>
  )
};

export { TextField };