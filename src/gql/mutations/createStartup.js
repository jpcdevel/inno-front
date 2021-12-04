import {gql} from '@apollo/client'

export const CREATE_STARTUP = gql`
    mutation($username: String!) {
        createStartup(username: $username) {
            startup {
                id
            }
        }
    }

`