export const loginData = (data) => dispatch => {
    dispatch({
        type: "LOGIN",
        payload:data
    })
}

export const logOut = () => dispatch => {
    dispatch({
        type:"LOGOUT"
    })
}