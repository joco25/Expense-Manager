import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense,setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done)=> {
    const data = [];
    expenses.forEach(({ id, description,note, amount, createdAt})=>{
        data[id]={description,note,amount,createdAt};
    });
    database.ref('expenses').set(data)
            .then(()=> done())
            .catch((e)=> console.log(e));
});

test('should setup remove expense action object',()=>{
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup edit expense action object',()=>{
    const action = editExpense('123abc',{name:'abc'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {name:'abc'}
    })
})

test('should setup add expense action object with provided values',()=>{
    const action = addExpense(expenses[1]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    })
})

test('should add expense to database and store', (done)=>{
    const store = createMockStore({});
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
                return database.ref(`expenses/${actions[0].expense.id}`).once('value')
                }).then((snapshot)=>{
                    expect(snapshot.val()).toEqual(expenseData); 
                    done();
                }).catch((e)=> console.log('second error'));;       
});

test('should add expense with defaults to database and store', ()=>{
    const store = createMockStore({});
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
                return database.ref(`expenses/${actions[0].expense.id}`).once('value')
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
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'SET_EXPENSES',
            expenses
        });
        done();
    });

})