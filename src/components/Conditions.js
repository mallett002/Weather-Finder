import React from 'react'

// Use semi transparent bg, or solid if that doesn't work
const background = {
    backgroundTrans: {background: '#dcdee0ab'},
    backgroundSolid: {background: '#dcdee0'}
}

const Conditions = (props) => {
    
    return (
        /*----Card For Current Conditions--------*/
        <div className='condition-wrapper'
            style={{...background.backgroundTrans} ||
                {...background.backgroundSolid}}
        >
            {/*------Title of Card--------*/}
            <div style={{textAlign:'center'}}>
                <h5>{props.title}</h5>
            </div>

            {/*------Icon for condition type-------*/}
            <div style={{textAlign:'center'}}>
                <img className='weather-type-icon' src={props.icon} 
                    alt='weather type' />
            </div>

            {/*----if is "DESCRIPTION", show condition icon--*/}
            {props.url && 
            <div className='icon-wrapper'>
                <img className='conditions-icon' src={props.url} alt='conditions icon' />
                <p className='description'>{props.description}</p>
            </div>}

            {/*-----if CLOUDS, show cloud %-------*/}
            {props.title === 'CLOUDS' &&
            <div className='description-wrapper'>
                <p>The sky is {props.weather.clouds.all}% cloudy</p>
            </div>}

            {/*--If WIND, show wind speed and direction----*/}
            {props.title === 'WIND' &&
            <div className='description-wrapper'>
                <p>{props.wind}</p>
            </div>}
            
        </div>
    )
}

export default Conditions;
