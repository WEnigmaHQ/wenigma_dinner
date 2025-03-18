import { gql } from "@apollo/client";


// GET_BTX_TO_MEMPOOL allow "to" return account holder bitcoin addresses.
// --------------------------------------------------------------------------
//  In a response following data fields return [nodeID, hash, to, user_token]
// ---------------------------------------------------------------------------


const GET_BTX_TO_MEMPOOL : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    hash
                    to
                    user_token
                }
            }
        }
    }
`;


// GET_BTX_FROM_AND_AMOUNT_MEMPOOL allow user to retreiver wallet addresses.
// --------------------------------------------------------------------------
//  In a response following data fields return [nodeID, hash, from, amount, user_token]
// ---------------------------------------------------------------------------


const GET_BTX_FROM_AND_AMOUNT_MEMPOOL : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    hash
                    from
                    amount
                    user_token
                }
            }
        }
    }
`;


// GET_BTX_COINBASE_MEMPOOL return whether sender transaction should be coinbase or not 
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, hash, to, from, coinbase, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_COINBASE_MEMPOOL : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    hash
                    to
                    from
                    coinbase
                    user_token
                }
            }
        }
    }
`;


// GET_BTX_AGE_MEMPOOL return how many seconds before this transaction happen. 
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, hash, to, from, age, amount, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_AGE_MEMPOOL : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    hash
                    to
                    from
                    age
                    amount
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_CREATED_AT return when transaction happen. 
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, hash, to, from, created_at, fees, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_CREATED_AT : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    hash
                    to
                    from
                    fees
                    created_at
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_HASH_OF_MEMBER return blockchain transaction placement in a block. 
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, hash, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_HASH_OF_MEMBER : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    hash
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_CLOSE_BALANCE return close or current balance
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, amount, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_CLOSE_BALANCE : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    amount
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_TO return all sender addresses that share by
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, to, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_TO : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    to
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_FROM return all receiver addresses that share by
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, from, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_FROM : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    from
                    user_token
                }
            }
        }
    }
`;


// GET_BTX_TRANSACTION_LOCKBLOCKRIME return lock block time
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, locktime, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_LOCKBLOCKTIME : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    locktime
                    user_token
                }
            }
        }
    }
`;


// GET_BTX_TRANSACTION_TO_FEES return how much fees paid by sender for boardcast payment
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, to, fees, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_TO_FEES : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    to
                    fees
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_TO_AND_INPUT return all sender addresses along with input
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, to, input, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_TO_AND_INPUT : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    to
                    input
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_FROM_OUTPUT return all receiver addresses along with output
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, from, output, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_FROM_OUTPUT : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    from
                    output
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TRANSACTION_UPDATED_AT return updated transaction 
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, hash, to, from, amount, fees, input, 
//  output, coinase, rbf, locktime, spent, confirm, currentprice , user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TRANSACTION_UPDATED_AT : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    hash
                    to
                    from
                    input
                    output
                    spent
                    confirm
                    locktime
                    rbf
                    amount
                    fees
                    currentprice
                    user_token
                }
            }
        }
    }
`;

// GET_BTX_TODAY_PRICE return today price
// ------------------------------------------------------------------------------------------
//  In a response following data fields return [nodeID, currentprice, user_token]
// ------------------------------------------------------------------------------------------


const GET_BTX_TODAY_PRICE : any = gql`
    query{
        bTMempoolCollection{
            edges{
                node{
                    nodeId
                    currentprice
                    user_token
                }
            }
        }
    }
`;

export default {
    GET_BTX_TO_MEMPOOL, GET_BTX_FROM_AND_AMOUNT_MEMPOOL, 
    GET_BTX_COINBASE_MEMPOOL, GET_BTX_AGE_MEMPOOL,
    GET_BTX_TRANSACTION_CREATED_AT, GET_BTX_TRANSACTION_HASH_OF_MEMBER,
    GET_BTX_TRANSACTION_CLOSE_BALANCE, GET_BTX_TRANSACTION_TO,
    GET_BTX_TRANSACTION_FROM, GET_BTX_TRANSACTION_LOCKBLOCKTIME,
    GET_BTX_TRANSACTION_TO_FEES, GET_BTX_TRANSACTION_TO_AND_INPUT,
    GET_BTX_TRANSACTION_FROM_OUTPUT, GET_BTX_TRANSACTION_UPDATED_AT,
    GET_BTX_TODAY_PRICE
};