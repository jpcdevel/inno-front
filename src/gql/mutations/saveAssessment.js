import {gql} from '@apollo/client'

export const SAVE_ASSESSMENT = gql`
    mutation($id: ID!, $heading: String!, $text: String!, $scaling: Int!, $problem: Int!, $inculcation: Int!, $ip: Int!, $solution: Int!) {
        saveAssessment(id: $id, heading: $heading, text: $text, scaling: $scaling, problem: $problem, inculcation: $inculcation, ip: $ip, solution: $solution) {
            ok
        }
    }

`