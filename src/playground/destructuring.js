const book = {
    title: "okay, Now you see",
    author: "James Blunt",
    publisher:{
        name: 'Penguine'
    }
}
const {name: publisherName="Self published"} = book.publisher
console.log(publisherName)

const item = ['Coffe (hot)', '$2.0','$2.50','2.75'];

const {product,small,medium}= item;
console.log(`A medium ${product} costs ${medium}`)