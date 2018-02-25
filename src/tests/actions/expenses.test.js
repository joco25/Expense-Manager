import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, startEditExpense, removeExpense,startRemoveExpense,setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'mytestuid';
const defaultAuthState = {auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done)=> {
    const data = [];
    expenses.forEach(({ id, description,note, amount, createdAt})=>{
        data[id]={description,note,amount,createdAt};
    });
    database.ref(`users/${uid}/ expenses`).set(data)
            .then(()=> done())
            .catch((e)=> console.log(e));
});

test('should setup remove expense action object',()=>{
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should remove expense from firebase',(done)=>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect((snapshot.val())).toBeFAlsy();
        done();
    })
})

test('should setup edit expense action object',()=>{
    const action = editExpense('123abc',{name:'abc'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {name:'abc'}
    })
});

test('should edit expense from firebase',()=>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[0];
    const updates = {amount: 21845};
    store.dispatch(startEditExpense(id,updates)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

test('should setup add expense action object with provided values',()=>{
    const action = addExpense(expenses[1]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    })
})

test('should add expense to database and store', (done)=>{
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'biro',
        amount: 1000,
        note: 'This works best',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData))
            .then(()=>{
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: 'ADD_EXPENSE',
                    expense:{
                        id: expect.any(String),
                        ...expenseData
                    }
                }).catch((e)=> console.log("first error"));;
                return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
                }).then((snapshot)=>{
                    expect(snapshot.val()).toEqual(expenseData); 
                    done();
                }).catch((e)=> console.log('second error'));;       
});

test('should add expense with defaults to database and store', ()=>{
    const store = createMockStore(defaultAuthState);
    const expenseDefault = {  
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
      }
    store.dispatch(startAddExpense({}))
            .then(()=>{
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: 'ADD_EXPENSE',
                    expense: {
                        id: expect.any(String), 
                        ...expenseDefault
                    }
                });
                return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
                }).then((snapshot)=>{
                    expect(snapshot.val()).toEqual(expenseDefault); 
                    done();
                });      
});

test('should setup set expense action with data',()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch then expenses from firebase', (done)=>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
        });
        done();
    });

})