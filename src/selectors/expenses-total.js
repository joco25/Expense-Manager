export default (expenses)=>{
    // const data = expenses.map((expense)=> expense.amount);
    // return data.reduce((a,b)=>a+b,0);

    return expenses.map((expense)=> expense.amount)
                   .reduce((a,b)=>a+b,0);
};