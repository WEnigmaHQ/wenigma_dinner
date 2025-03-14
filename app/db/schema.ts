import { gql } from 'graphql-tag';


//  Schema handle all graphql schemas
const SCHEMA = gql`

  type BtcTransaction {
        "The id of the transaction"
        id: ID!
        "The input of transaction e.g 0.1"
        input: Float!
        "The hash of the transaction e.g 0x123456"
        hash: String!
        "The time of the transaction e.g 1m ago"
        age: Time!
        "The fee of the transaction e.g 0.0001 collect from the input"
        fee: Float!
        "The output of the transaction e.g 0.1001 {input + fee}"
        output: Float!
        "The size of the transaction e.g size of bytes of the transaction"
        size: Int!
        "The blocktime of the transaction"
        locktime: Int!
        "This transaction send from coinbase or not"    
        coinbase: Boolean!
        "sender address"
        to: String!
        "receiver address"
        from: String!
        "The current price of the transaction e.g 10000"
        cuurentprice: Float!
        "The confirm of the transaction e.g transacation complete or not"
        confirm: Boolean!
        "The spent of the transaction e.g spent or not to avoid double spending"
        spent: Boolean!
        "createdAt of the transaction time e.g 0:00"
        createdAt: Time!
        "updatedAt of the transaction time e.g 0:05"
        updatedAt: Time!
    }`;

export default SCHEMA;