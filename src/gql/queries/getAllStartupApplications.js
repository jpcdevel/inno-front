import {gql} from '@apollo/client'

export const GET_ALL_STARTUP_APPLICATIONS = gql`
    query {
        getAllStartupApplications {
            id
            user {
                firstName
            }
            name
            description
            isMin
            productName
            category {
                name
            }
            stage
        }
    }

`