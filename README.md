# fusta2018-puhelinluettelo-backend

University of Helsinki Full stack open 2018 course assignments

[puhelinluettelo herokuapp](https://fusta2018puhlu.herokuapp.com)
[puhelinluettelo frontend](https://github.com/nigoshh/fusta2018/tree/master/puhelinluettelo)

NB: to deploy this software (backend, frontend or both) with your own MongoDB database, please create a unique index for the field "name". Otherwise the uniqueness of the name field isn't enforced, therefore the software doesn't work as intended.

As explained here, you can create a unique index directly from the mongo shell by running the following command. Here _db_ is your database's name, and _people_ is the collection that contains people's data (name and number):

```
db.people.createIndex( { "name": 1 }, { unique: true } )
```

Alternatively if you use [mlab](https://mlab.com) you can [create an index through the mLab management portal](https://docs.mlab.com/indexing/#add-index-via-mlab-portal); type _{ "name": 1 }_ in the _Keys_ field and check the _Unique_ option.
