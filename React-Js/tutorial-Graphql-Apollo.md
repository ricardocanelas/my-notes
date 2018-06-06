As notações é baseado neste vídeo/curso - [https://www.youtube.com/watch?v=ed8SzALpx1Q](https://www.youtube.com/watch?v=ed8SzALpx1Q), do [The Net Ninja Youtube channel](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg/playlists)

[Código final](https://github.com/iamshaunjp/graphql-playlist/tree/lesson-36)

# Project Overview

- **Server (node.js)**: Express App, GraphQL Server, Graphiql
- **Database**: MongoDB (using mLab)
- **Client**: React, Apollo

![overview](https://github.com/ricardocanelas/my-notes/raw/master/_assets/js__graphql_apollo_overview.jpg)

# Start Server

```
npm install nodemon -g
npm install graphql express-graphql lodash cors
cd server
nodemon app.js
```

# A Simple ExpressApp

`server/app.js`

```
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()

app.use(cors())

app.use('graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}) )

app.listen(4000)
```

# A Simple Schema

`server/schema/schema.js`

```
const _ = require('lodash')
const graphql = require('graphql')
const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
    } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})
```

# A Simple RootQuery

`server/schema/schema.js`

```
const dummyBooks = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
]

var dummyAuthors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // TODO code to get data from db or other source
                // return BookModel.findById( args.id )
                return _.find(dummyBooks, { id: args.id });
            }
        },

        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                // TODO code to get data from db or other source
                // return AuthorModel.findById( args.id )
                return _.find(dummyAuthors, { id: args.id });
            }
        }
    }
})

module.export = new GraphQLSchema({
    query: RootQuery
})

/**
 * Example of a query:
 * book(id: "b1") {
 *   name
 *   genre
 * }
 **/
```

# Adding Relationship

`server/schema/schema.js`

```
const BookType = ({
    ...
    fields: () => ({
        ...
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // TODO code to get data from db or other source
                // return AuthorModel.findById(parent.authorId)
                return _.find(dummyAuthors, { id: parent.authorId });
            }
        }
    })
})
```

# Adding List


`server/schema/schema.js`

```
const AuthorType = ({
    ...
    fields: () => ({
        ...
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                // TODO code to get data from db or other source
                // return BookModel.find({ authorId: parent.id })
                return _.filter(dummyBooks, { authorId: parent.id });
            }
        }
    })
})
```

# More About RootQuery (video: 15)

```
const RootQuery = new GraphQLObjectType({
    ...
    fields: {
        ...
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // TODO code to get data from db or other source
                // return BookModel.find({})
                return dummyBooks
            }
        },
        author: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // TODO code to get data from db or other source
                // return AuthorBook.find({})
                return dummyAuthors
            }
        }
    }
})

/**
 * Example of a query:
 * books {
 *   name
 *   author {
 *     name
 *     age
 *   }
 * }
 **/
```

# Using mLab & MongoDB (video: 16, 17)

1. Go to mLab.com
2. Signup
3. Create a database
4. Create a user of that database
5. Install package `npm install mongoose`

`server/app.js`

```
const mongoose = require('mongoose')
mongoose.connect('mongodb://<my-dbuser>:<my-dbpassword>@<my-dburl>/<my-dbname>')
mongoose.connection.once('open', () => {
    console.log('connected to database')
})
```

`server/models/book.js`

```
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongoose.model('Book', bookSchema)
```

`server/models/author.js`

```
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Author', authorSchema)
```

# Adding Mutation (edit, update, delete) (video: 18)

`server/schema/schema.js`

```
const BookModel = require('../models/Book')
const AuthorModel = require('../models/Author')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let author = new AuthorModel({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    ...
    mutation: Mutation
})

/**
 * Example
 * mutation {
 *   addAuthor(name: "Shaun", age: 30) {
 *      name
 *      age
 *   }
 * }
 **/
```

# React (vídeo: 25, 26, 27)

```
npx create-react-app client
cd client
npm install apollo-boost react-apollo graphql
npm run start
```

`client/src/App.js`

```
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <...>
            </ApolloProvider>
        )
    }
}
```

`client/src/components/BookList.js`

```
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
{
    books {
        name
        id
    }
}
`

class BookList extends Component {
    displayBooks() {
        const data = this.props.data
        if (data.loading) {
            return (<div>Loading books..</div>)
        } else {
            return data.books.map(book => (
                <li key={ book.id }>{ book.name }</li>
            ))
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                { this.displayBooks() }
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)
```

# AddBook (vídeo: 31, 32)

`client/src/queries/queries.js`

```
export const addBookMutation = gql`
    mutation($name: String!, $genre:String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`

export const getBookQuery = gql`
    query($id:ID) {
        book(id:$id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`
```

`client/src/components/AddBook.js`

```
import { graphql, compose } from 'react-apollo'

class AddBook extends Components {
    displayAuthors() {
        const data = this.props.getAuthorsQuery
        ...
    }
    submitForm(e) {
        e.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetch: [{ query: getBooksQuery }]
        })
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
    graphql(addBookMutation, { name: "addBookMutation"}),
)(AddBook)
```

# GetBook

`client/src/components/BookDetails.js`

```
export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)
```