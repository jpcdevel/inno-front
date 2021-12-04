import {gql} from '@apollo/client'

export const GET_STARTUPS_BY_FILTERS = gql`
    query($stage: Int!, $pilot: Int!, $inculcation: Int!, $teamNumber: Int!, $scaling: Int!, $problems: Int!, $solutions: Int!) {
        getStartupsByFilters(stage: $stage, pilot: $pilot, inculcation: $inculcation, scaling: $scaling, problems: $problems, solutions: $solutions, teamNumber: $teamNumber) {
            id
            name
            description
            isMin
            productName
            category {
                name
                id
            }
            stage
        }
    }

`