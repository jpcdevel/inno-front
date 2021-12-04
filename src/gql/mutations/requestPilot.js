import {gql} from '@apollo/client'

export const REQUEST_PILOT = gql`
    mutation($id: ID!, $username: String!) {
        requestPilot(id: $id, username: $username) {
            ok
        }
    }

`