import {gql} from '@apollo/client'

export const CHANGE_PROJECT_STATUS = gql`
    mutation($id: ID!, $username: String!, $isApprove: Boolean!) {
        changeProjectStatus(id: $id, username: $username, isApprove: $isApprove) {
            ok
        }
    }

`