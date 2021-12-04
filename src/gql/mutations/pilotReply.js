import {gql} from '@apollo/client'

export const PILOT_REPLY = gql`
    mutation($id: ID!, $ids: ID!, $action: Boolean!) {
        pilotReply(id: $id, ids: $ids, action: $action) {
            ok
        }
    }

`