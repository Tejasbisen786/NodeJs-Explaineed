<!-- *******MongoDb******** -->

- No-Sql Document Based database
- Strong Support for aggregation Pipes
- wroks on bson format
- Best for node applications

 <!-- ***Architecture** -->

Collections - " users" [ it's like tables]
-> Doucument-1 [ inside the collections and may have more thousands applications]

show dbs
use db_name
show coll_name
db.users.find()
db.users.create({
    name:tejas
})
