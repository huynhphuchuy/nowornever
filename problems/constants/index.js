module.exports = {
    rules: [
        {
            id: 1,
            name: 'Current Account',
            income: 0,
            age: 17
        },
        {
            id: 2,
            name: 'Current Account Plus',
            income: 40000,
            age: 17
        },
        {
            id: 3,
            name: 'Junior Saver Account',
            age: [0, 18]
        },
        {
            id: 4,
            name: 'Student Account',
            student: true,
            age: 17
        },
        {
            id: 5,
            name: 'Debit Card',
            includes: [1, 2, 4]
        },
        {
            id: 6,
            name: 'Credit Card',
            income: 12000,
            age: 17
        },
        {
            id: 7,
            name: 'Gold Credit Card',
            income: 40000,
            age: 17
        }
    ],
    
    bundles: [
        {
            id: 1,
            name: 'Junior Saver',
            includes: [3],
            age: [0, 18],
            value: 0
        },
        {
            id: 2,
            name: 'Student',
            includes: [4, 5, 6],
            age: 17,
            student: true,
            value: 0
        },
        {
            id: 3,
            name: 'Classic',
            includes: [1, 5],
            age: 17,
            income: 0,
            value: 1
        },
        {
            id: 4,
            name: 'Classic Plus',
            includes: [1, 5, 6],
            age: 17,
            income: 12000,
            value: 2
        },
        {
            id: 5,
            name: 'Gold',
            includes: [2, 5, 7],
            age: 17,
            income: 40000,
            value: 3
        }
    ]
}