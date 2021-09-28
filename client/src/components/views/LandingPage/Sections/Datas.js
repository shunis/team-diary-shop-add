const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }

]

const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "$0 to $19",
        "array": [0, 19]
    },
    {
        "_id": 2,
        "name": "$20 to $24",
        "array": [20, 24]
    },
    {
        "_id": 3,
        "name": "$25 to $27",
        "array": [25, 27]
    },
    {
        "_id": 4,
        "name": "$28 to $29",
        "array": [28, 29]
    },
    {
        "_id": 5,
        "name": "More than $30",
        "array": [30, 1500000]
    }
]




export {
    continents,
    price
}
