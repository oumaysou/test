import { REGISTER, SIGNIN, GETALLMATCHES, USERNAMECLICKED, GETINFOSUSER, EDITUSER } from '../constantes';

const initialeState = {
    clicked: false
}

const reducer = (state = initialeState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                register: action.data
            };
        case SIGNIN:
            return {
                ...state,
                connected: true,
                username: action.data.username
            };
        case GETALLMATCHES:
            return {
                ...state,
                matches: action.data
            };
        case USERNAMECLICKED:
            return {
                ...state,
                usernameClicked: action.data,
                clicked: true

            };
        case GETINFOSUSER:
            return {
                ...state,
                userInfos: action.data
            };
        case EDITUSER:
            return {
                ...state,
                updated: true
            };
        default: return state
    }
}

export default reducer