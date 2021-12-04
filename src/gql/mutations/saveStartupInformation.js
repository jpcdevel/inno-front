import {gql} from '@apollo/client'

export const SAVE_STARTUP_INFORMATION = gql`
    mutation($startupId: ID!, $productName: String!, $teamName: String!, $cat: String!, $inn: String!, $urName: String!, $teamNumber: Int!, $stage: String!, $websiteUrl: String!, $briefDescription: String!, $pilotThoughts: String!, $productBenefit: String!, $inculcationCases: String!, $teamDescr: String!, $fio: String!, $phone: String!, $email: String!, $tg: String!, $skype: String!) {
        saveStartupInformation(startupId: $startupId, productName: $productName, teamName: $teamName, cat: $cat, inn: $inn, urName: $urName, teamNumber: $teamNumber, stage: $stage, websiteUrl: $websiteUrl, briefDescription: $briefDescription, pilotThoughts: $pilotThoughts, teamDescr: $teamDescr, productBenefit: $productBenefit, inculcationCases: $inculcationCases, fio: $fio, phone: $phone, email: $email, tg: $tg, skype: $skype) {
            ok
        }
    }

`