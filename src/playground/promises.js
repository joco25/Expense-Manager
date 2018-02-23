const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject('This is my resolved data');
    },1500)
});

console.log('before');

promise.then((data)=>{
    console.log(data);
}).then((data)=>{
    console.log('2',data)
}).catch((error)=>{
    console.log('error',error);   
});

console.log('after');