import {gql} from '@apollo/client'

export const GET_ALL_SUPERIOR_CATS = gql`
    query {
        getAllSuperiorCats {
            id
            name
            childrenCats {
                name
                id
            }
        }
    }

`