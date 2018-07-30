import React from 'react'

// Use semi transparent bg, or solid if that doesn't work
const background = {
    backgroundTrans: {background: '#dcdee0a8'},
    backgroundSolid: {background: '#dcdee0'}
}

const Conditions = (props) => {
    
    return (
        <div className='condition-wrapper'
            style={{...background.backgroundTrans} ||
                {...background.backgroundSolid}}
        >
            <div style={{textAlign:'center'}}>
            <h5>{props.title}</h5>
            </div>
            
            {props.url && 
            <div className='icon-wrapper'>
                <img src={props.url} alt='conditions icon'/>
            </div>}

            <div style={{textAlign:'center'}}>
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default Conditions;
