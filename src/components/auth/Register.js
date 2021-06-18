import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import "./Login.css"

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
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
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
        <main style={{ textAlign: "center" }} className="LoginCard__container">

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <div className="LoginCard">
            <form className="form--login" onSubmit={handleRegister}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <fieldset>
                  <label htmlFor="userName"> First Name </label>
                  <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First Name" required autoFocus />
              </fieldset>
              <fieldset>
                  <label htmlFor="lastName"> Last Name </label>
                  <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last Name" required />
              </fieldset>
              <fieldset>
                  <label htmlFor="inputEmail"> Email address </label>
                  <input ref={email} type="email" name="email" className="form-control" placeholder="Email Address" required />
              </fieldset>
              <fieldset>
                  <label htmlFor="inputAvatarUrl"> AvatarURL </label>
                  <input ref={avatarURL} type="text" name="avatarURL" className="form-control" placeholder="https://i.pravatar.cc/150?u=FirstNameLastName" />
              </fieldset>
              <fieldset onChange={
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
              </fieldset>
              <div className="register_buttons">
                <fieldset className="register_button">
                    <button type="submit"> Sign in </button>
                </fieldset>
                <fieldset className="register_button">
                    <button onClick={() => history.push("/login")}> Go Back </button>
                </fieldset>
              </div>
            </form>
            </div>
        </main>
    )
}

