import React, {useContext} from 'react'
import { LogInContext } from "../helper/Context";
const Reserve = () => {
    const{loggedIn, setLogIn}=useContext(LogInContext)

    return (
        <div>
            {!loggedIn &&
                <div className="container">
                <h1> Welcome Guest User!</h1>
                <p> Please consider registering before reserving your table. There is so many many benefits that it doesnt make sense not to register!!!</p>
                </div>
            }

            {loggedIn && 
                <div className="container">
                <h1> Welcome Registered User!</h1>
                </div>
            }
        </div>
    )
}

export default Reserve
