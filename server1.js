/*Book Dictionary*/ 
import express from 'express';          //using express.js
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;
import { getBookList } from './example.js'
const BookList = getBookList();
app.get('/books',(req,res)=>{
    return res.status(200).send({
        success: 'true',
        Books: BookList
    })                  //getting data of all books at localhost 3000
});

app.get('/books/:id',(req,res)=>{
    console.log(req.params["id"]);
    var value;
    var flag=0;
    for (var x in BookList){
        if(BookList[x]["id"]==req.params["id"]){
            value=x;
            flag=1;
        }   
    }
    if (flag==0){
        return res.status(400).send({
            error: 'ID not available',  
        })
      }
      else return res.status(200).send({
        success: 'true',
        Books: BookList[value]
    }) 
        
    });              //getting data by id
                    
app.post('/books', (req, res) => {
    res.sendStatus(200);
    BookList.push(
        {
            id: req.body["id"],
            name: req.body["name"],
            price: req.body["price"]
        }
    ); 
    console.log(req.body["id"]);        //adding new data
});
app.put('/books',(req,res)=>{
    
    var flag=0;
    for (var x in BookList) {
        if(BookList[x]["id"]==req.body["id"]){
        BookList[x]["name"]=req.body["name"];
        BookList[x]["price"]=req.body["price"];
        flag=1;
      }}
      if (flag==0){
        return res.status(400).send({
            error: 'ID not available',  
        })
      }
      else res.sendStatus(200);
});                         // updaing existing data


app.delete('/books', (req, res) => {
    var index=-1;
    var flag=0;
    for (var x in BookList) {
        if(BookList[x]["id"]==req.body["id"]) {
            index=x;
            flag=1;
        }
      }
    if (flag) BookList.splice(index,1);
    if (flag==0){
        return res.status(400).send({
            error: 'ID not available',  
        })
      }
      else res.sendStatus(200);
});                             //deleting the data

app.listen(port, () => {
  console.log(`Dictionary app listening at http://localhost:${port}`);
});
/* End of Project*/