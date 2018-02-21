import React from 'react';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';
import {connect} from 'react-redux';

export const ExpenseSummary=({expenseCount,expenseTotal})=> {
    const expenseWord = expenseCount === 1 ? 'expense': 'expenses';
    const formattedExpensesTotal = numeral(expenseTotal/ 100).format('$0,0.00');
    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    )
};

const mapStateToProps=(state)=>{
    const visibleExpenses= selectExpenses(state.expenses,state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: selectExpensesTotal(visibleExpenses)
    }
};

export default connect(mapStateToProps)(ExpenseSummary);