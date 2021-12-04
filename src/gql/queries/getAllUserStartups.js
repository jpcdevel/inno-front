import {gql} from '@apollo/client'

export const GET_ALL_USER_STARTUPS = gql`
    query($username: String!) {
        getUserInfo(username: $username) {
            startups {
                id
                name
                description
                isMin
                productName
                category {
                    name
                }
                stage
            }
            firstName
        }
    }

`