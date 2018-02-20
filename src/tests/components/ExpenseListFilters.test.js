import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altfilters} from '../fixtures/filters';
import moment from 'moment'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=>{
    setTextFilter= jest.fn();
    sortByDate= jest.fn();
    sortByAmount= jest.fn();
    setStartDate= jest.fn();
    setEndDate= jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDAte={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render ExpenseListFilters correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt datacorrectly',()=>{
    wrapper.setProps({
        filters: altfilters
    });
    expect(wrapper).toMatchSnapshot();
});

// test('should handle Text change',()=>{
//     const value = 'rent';
//     wrapper.find('input').simulate('change',{
//         target: {value}
//     });
//     expect(setTextFilter).toHaveBeenLastCalledWith(value);
// })

test('should handle sortbyDate',()=>{
    const value = 'date';
    wrapper.setProps({
        filters: altfilters
    });
    wrapper.find('select').simulate('change',{
        target: {value}
    });
    expect(sortByDate).toHaveBeenCalled();
})

test('should handle sortbyAmount',()=>{
    const value = 'amount';
    wrapper.find('select').simulate('change',{
        target: {value}
    });
    expect(sortByAmount).toHaveBeenCalled();
})

// test('should handle date changes',()=>{
//     const startDate = moment(0).add(4, 'years');
//     const endDate = moment(0).add(8, 'years');

//     wrapper.find('DateRangePicker').prop('onDatesChange')({startDate,endDate});
//     expect(setStartDate).toHaveBeenLastCalledWith(startDate);
//     expect(setEndDate).toHaveBeenLastCalledWith(endDate);
// })

test('should handle date focus changes',()=>{
    const calenderFocused = 'startDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
})