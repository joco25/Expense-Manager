import moment from 'moment'
import {setStartDate, setEndDate,sortByDate, sortByAmount, setTextFilter} from '../../actions/filters'

test('should generate set start date action',()=>{
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    })
})

test('should generate set end date action object',()=>{
    const action= setEndDate(moment(0))
    expect(action).toEqual({
        type:'SET_END_DATE',
        date: moment(0)
    })
})

test('should generate sort by date parameters',()=>{
    const action= sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    })
})

test('should generate sort by amount parameters',()=>{
    const action= sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    })
})

test('should generate Text filter with provided parameters',()=>{
    const action = setTextFilter('word')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'word'
    })
})

test('should generate Text filter with default parameters',()=>{
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})