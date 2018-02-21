import selectExpenseTotal from '../../selectors/expenses-total.js';
import expenses from '../fixtures/expenses';


test('should return 0 if no expenses',()=>{
    const data = [];
    const result = selectExpenseTotal(data);
    expect(result).toBe(0);
});

test('should correctly add up a single expense',()=>{
    const data = [expenses[0]];
    const result = selectExpenseTotal(data);
    expect(result).toBe(183);
});

test('should correctly add up multiple expenses',()=>{
    const data = expenses;
    const result = selectExpenseTotal(data);
    expect(result).toBe(335866);
});

