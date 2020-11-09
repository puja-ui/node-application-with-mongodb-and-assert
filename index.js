const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { brotliDecompress } = require('zlib');
const url = 'mongodb://127.0.0.1:27017/';
const dbname = 'hello';
const dboper = require('./operations');
MongoClient.connect(url, { useUnifiedTopology: true })
.then((err, client) =>{
    assert.strictEqual(err, null);
    console.log('connected correctly to the server');
    const db = client.db(dbname);
    dboper.insertDocument(db, {name:"puja", description:"a girl struggling through mongodb"}, 'dishes')
    .then((result)=>{
        console.log("Insert document: \n", result.ops);
        
        return dboper.findDocument(db, 'dishes')
    })
    .then((docs)=>{
        console.log('Found documents: \n', docs);
            
        return dboper.updateDocument(db,{name:'Puja'},{description:'a girl learning updating document with mongodb'},'dishes')
    })
    .then((result)=>{
        console.log('Updated document: \n',result.result);
        return dboper.findDocument(db, 'dishes')
    })
    .then((docs)=>{
        console.log('found updated document: \n',docs);
        return db.dropCollection('dishes')
    })
    .then((result)=>{
        console.log('dropd document: \n',result);
        client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));
