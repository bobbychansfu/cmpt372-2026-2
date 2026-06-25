# Mongo Basic commands

### Connecting to MongoDB

```bash
mongosh < DB_URL > --username < DB_USERNAME > --password < DB_PASSWORD >
``` 

### Working with DBs and Collections

> show dbs
> use <DB_NAME>
> show collections

### Inserting Documents

```javascript
db.users.insert({"fname":"bobby"})
db.users.insert({"fname":"sara","lname":"smith"})
db.users.createIndex( { fname: 1 } ) // 1: asc order
```

```javascript
db.users.insertMany([
    {"fname":"bobby"},
    {"fname":"sara","lname":"smith"},
    {"fname":"alice","lname":"jones"}
])
```

### dropping docs

```javascript
db.users.drop()
```
### Importing Data
https://www.mongodb.com/docs/database-tools/mongoimport/

### Finding Documents

```javascript
db.donuts.find()
db.donuts.find({"name":"Cake"})
db.donuts.find({"batters.batter":"Devil's Food"})
db.donuts.find( { item: null } )
db.donuts.find( { item: { $exists: false } } )
db.donuts.find({$or: [{"id":"0001"},{"id":"0002"}] })

db.donuts.find({sweetness: {$gte:4}})
```

#### Projection

```javascript
db.donuts.find({type:"donut"},{name:1,topping:1,ppu:1})
db.donuts.find({type:"donut"},{name:0,topping:0,_id:0})

```

### Querying Arrays

```javascript
db.donuts.find({"batters.batter":["Regular","Chocolate"]})   
db.donuts.find({"batters.batter":["Chocolate","Regular"]})

```

### Updating Documents

```javascript
db.donuts.updateOne({"id":"0001"},{$set: {"name":"Coke"}})
db.donuts.updateOne({"id":"0001"},{$addToSet: {"topping": "sprinkles"}})
db.donuts.replaceOne({"id":"0002"}, {"id":"0006","name":"Raised"})
db.donuts.insertMany( [
{ "id": "0004", "type": "donut", "name": "Yeast",
  "ppu": 0.45, "batters": { "batter": ["Regular","Chocolate"]}},
{ "id": "0005", "type": "donut", "name": "Baked",
  "ppu": 0.55, "batters": { "batter": ["Regular","Blueberry"]}}
] )

```

### Delete

```javascript
db.donuts.deleteOne({"id":"0001"})
db.donuts.deleteMany({"type":"donut"})
```


# Mongo Aggregations

```javascript
db.donuts.aggregate([
  { $match: { type:"donut" }},
  { $group: {_id: "$id", avg: { $avg: "$ppu"}}},
  { $sort: { _id: -1 }}
])
```

```javascript
db.donuts.aggregate([ {$match:{type:"donut"}},{$group: { _id: "$type", avg: {$avg: "$ppu"} }}  ])
```
