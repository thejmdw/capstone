import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    
    const userTypeId = useRef()
    // const password = useRef()
    // const verifyPassword = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

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
                            avatarURL: `https://www.tinygraphs.com/squares/${firstName.current.value}%20${lastName.current.value}?theme=heatwave&numcolors=4&size=220&fmt=svg`,
                            userTypeId: 0
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("swipeHome_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
              <h1 className="h3 mb-3 font-weight-normal">Please Register for Swipe Home</h1>
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
                <div className="form-group">
                  <label htmlFor="userTypeId">Renter:</label>
                  <input ref={userTypeId} type="radio" id="userTypeId" className="form-control" 
                  onChange={
                    (e) => {
                      userTypeId = !userTypeId
                    }
                  }
                  checked={parseInt(userTypeId) === 1 ? true : false} value="1"  />
                </div>
                <div className="form-group">
                  <label htmlFor="userTypeId">Buyer:</label>
                  <input ref={userTypeId} type="radio" id="userTypeId" className="form-control" 
                  onChange={
                    (e) => {
                      userTypeId = !userTypeId
                    }
                  }
                  checked={parseInt(userTypeId) === 2 ? true : false } value="2"  />
                </div>
                <div className="form-group">
                  <label htmlFor="userTypeId">Agent:</label>
                  <input ref={userTypeId} type="radio" id="userTypeId" className="form-control" 
                  onChange={
                    (e) => {
                      userTypeId = !userTypeId
                    }
                  }
                  checked={parseInt(userTypeId) === 3 ? true : false} value="3"  />
                </div>
              </fieldset>
              <fieldset>
                <button type="submit"> Sign in </button>
              </fieldset>
            </form>
        </main>
    )
}

