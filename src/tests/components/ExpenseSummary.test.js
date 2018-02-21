import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseSummary} from '../../components/ExpenseSummary';

test('should display singular for one expense',()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={3000}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should display singular for one expense',()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount={14} expenseTotal={35748000}/>);
    expect(wrapper).toMatchSnapshot();
});