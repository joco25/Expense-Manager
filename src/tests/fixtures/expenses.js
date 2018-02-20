import moment from "moment";

export default [
    {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 183,
        createdAt: 0
    },
    {
        id: '2',
        description: 'flag',
        note: '',
        amount: 135383,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: '3',
        description: 'Razor',
        note: '',
        amount: 200300,
        createdAt: moment(0).add(4, 'days').valueOf()
    },
];