import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { Text, View } from "react-native" 

const AllBtcTransaction = gql `
    query AllBtcTransaction ($cursor: Cursor) {
        btcWalletCollection(first : 10, after: $cursor) {
            edges{
                node{
                    nodeId
                    hash
                    amount
                }
            }
            pageInfo{
                endCursor
                hasNextPage
            }
        }
    }
`

