import React from 'react'

const Card = ({title, name, description, category, time}) => {
  return (
    <div>
        <div className="card">
            <h5 className="card-header text-center">
                <span style={{float:"left", fontSize:"14px"}}>Category:- {category}</span>
                <u> 
                {title} 
                </u>
                <span style={{float:"right", fontSize:"16px"}}>By:- {name}</span>
            </h5>
            <div className="card-body">
                <p className="card-text">{description}</p>
                <span style={{float:"right", fontSize:"12px"}}>Posted :- {time}</span>

            </div>
        </div>
    </div>
  )
}

export default Card