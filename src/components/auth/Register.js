import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import "./Login.css"
import { Input, Radio, FormControlLabel, Button, ThemeProvider } from "@material-ui/core"
import { theme } from "../theme.js"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const avatarURL = useRef()
    let userTypeId = useRef()
    // const password = useRef()
    // const verifyPassword = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    const [ userTypeIdState, setUserTypeIdState ] = useState(0)

    const existingUserCheck = () => {
        return fetch(`https://swipehome-d73a6-default-rtdb.firebaseio.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleClick = event => {
        if (parseInt(event.target.value) === userTypeIdState) {
          setUserTypeIdState("");
        } else {
          setUserTypeIdState(event.target.value);
        }
      }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://swipehome-d73a6-default-rtdb.firebaseio.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            avatarURL: `https://i.pravatar.cc/150?u=${firstName.current.value}${lastName.current.value}`,
                            userTypeId: userTypeIdState,
                            firstTimeUser: true
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("swipeHome_user", createdUser.id)
                                history.push("/new")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <ThemeProvider theme={theme}>
        <main style={{ textAlign: "center" }} className="LoginCard__container">

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <div className="LoginCard2">
            <form className="form--login" onSubmit={handleRegister}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <fieldset>
                  <label htmlFor="userName"></label>
                  <Input inputRef={firstName} type="text" name="firstName" className="form-control" placeholder="First Name" required autoFocus />
              </fieldset>
              <fieldset>
                  <label htmlFor="lastName"></label>
                  <Input inputRef={lastName} type="text" name="lastName" className="form-control" placeholder="Last Name" required />
              </fieldset>
              <fieldset>
                  <label htmlFor="inputEmail"></label>
                  <Input inputRef={email} type="email" name="email" className="form-control" placeholder="your@email.com" required />
              </fieldset>
              
              {/* <fieldset>
                  <label htmlFor="inputAvatarUrl"> AvatarURL </label>
                  <input ref={avatarURL} type="text" name="avatarURL" className="form-control" placeholder="https://i.pravatar.cc/150?u=FirstNameLastName" />
              </fieldset> */}
              {/* <fieldset onChange={
                    (e) => {
                      setUserTypeIdState(parseInt(e.target.value))
                    }
                  }>
                <div className="form-group radios">
                  <label htmlFor="userTypeId">Renter:</label>
                  <input ref={userTypeId} 
                        name="userType" 
                        type="radio" 
                        id="userTypeId" 
                        className="form-control" 
                        value="1"
                        required />
                </div>
                <div className="form-group radios">
                  <label htmlFor="userTypeId">Buyer:</label>
                  <input ref={userTypeId} 
                        name="userType" 
                        type="radio" 
                        id="userTypeId" 
                        className="form-control" 
                        value="2"
                        required  />
                </div>
                <div className="form-group radios">
                  <label htmlFor="userTypeId">Agent:</label>
                  <input ref={userTypeId} 
                        name="userType" 
                        type="radio" 
                        id="userTypeId" 
                        className="form-control" 
                        value="3"
                        required  />
                </div>
              </fieldset> */}
              <fieldset  onChange={
                    (e) => {
                      setUserTypeIdState(parseInt(e.target.value))
                    }
                  }>
                {/* <div className="form-group radios">
                  <label htmlFor="userTypeId">Renter:</label>
                  <input ref={userTypeId} 
                        name="userType" 
                        type="radio" 
                        id="userTypeId" 
                        className="form-control" 
                        value="1"
                        required />
                </div>
                <div className="form-group radios">
                  <label htmlFor="userTypeId">Buyer:</label>
                  <input ref={userTypeId} 
                        name="userType" 
                        type="radio" 
                        id="userTypeId" 
                        className="form-control" 
                        value="2"
                        required  />
                </div>
                <div className="form-group radios">
                  <label htmlFor="userTypeId">Agent:</label>
                  <input ref={userTypeId} 
                        name="userType" 
                        type="radio" 
                        id="userTypeId" 
                        className="form-control" 
                        value="3"
                        required  />
                </div> */}
                <div className="radios">
                <FormControlLabel className="radio" inputRef={userTypeId} id="userTypeId"  value="1" control={<Radio />} label="Renter" onClick={handleClick} />
                <FormControlLabel className="radio" inputRef={userTypeId} id="userTypeId"  value="2" control={<Radio />} label="Buyer" onClick={handleClick} />
                <FormControlLabel className="radio" inputRef={userTypeId} id="userTypeId"  value="3" control={<Radio />} label="Agent" onClick={handleClick} />
                </div>
              </fieldset>
              <div className="register_buttons">
                <fieldset className="register_buttons">
                    <Button variant="contained" color="secondary" onClick={() => history.push("/login")}> Go Back </Button>
                    <Button variant="contained" color="primary" type="submit"> Sign in </Button>
                </fieldset>
                {/* <fieldset className="register_button">
                </fieldset> */}
              </div>
            </form>
            </div>
        </main>
        </ThemeProvider>
    )
}

