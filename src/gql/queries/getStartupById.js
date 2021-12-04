import {gql} from '@apollo/client'

export const GET_STARTUP_BY_ID = gql`
    query($id: ID!) {
        getStartupById(id: $id) {
            id
            name
            user {
                firstName
                username
                id
            }
            category {
                id
                name
            }
            tracker {
                username
                contactFio
                contactPhone
                contactTg
                contactEmail
                contactSkype
            }
            inculcation
            comment {
                heading
                text
            }
            ip
            websiteUrl
            description
            stage
            inculcationCases
            pilotThoughts
            teamDescr
            contactFio
            contactPhone
            contactTg
            contactEmail
            contactSkype
            pilot
            teamNumber
            type
            isStrong
            isApproved
            scaling
            problem
            solution
            inn
            urName
            productBenefit
            isMin
            productName
            presentation {
                url
                name
            }
            application {
                url
                name
            }
            pilots {
                id
                org {
                    orgName
                    orgDescr
                    contactFio
                    contactPosition
                    contactPhone
                    contactTg
                    contactEmail
                    contactSkype
                }
            }
            pendingPilots {
                id
                org {
                    orgName
                    orgDescr
                    contactFio
                    contactPosition
                    contactPhone
                    contactTg
                    contactEmail
                    contactSkype
                }
            }
        }
    }

`