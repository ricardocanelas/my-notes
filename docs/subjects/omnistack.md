

# Aula 01

- event-loop
- serverless
- microservices

MongoDB Atlas -> Build a Cluster -> Security -> Connect -> Drive: Node.js

Heroku -> New App ('omnistack-backend')
Heroku -> omnistack-backend -> Deploy -> Github
Heroky -> omnistack-backend -> Settings -> Config Vars (URL, PORT)

```
mkdir backend
cd backend
yarn init -y
yarn add express mongoose multer socket.io cors
yarn add --dev nodemon
touch src/server.js
```

.gitignore

```
node_modules
tmp/*
!tmp/.gitkeep
```

Procfile

```
web: npm start
```

package.json

```
"scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
}
```

```
+ src
  + config
    multer.js
  + controllers
  + models
  routes.js
  server.js
```

multer.js

```
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

module.exports = {
    dest: tmpPath,
    storage: pmulter.diskStorage({
        destination: (req, file, cb) => {
            cb(null, tmpPath)
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    })
}
```

routes.js

```
const express = require('express');
const multer = require('multer');
const multerConifg = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.get('/hello', (req, res) =>{
    return res.send('Hello World');
})

router.post('/boxes', BoxController.store);
router.post('/boxes/:id', BoxController.show);
router.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
```

server.js

```
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

mongoose.connect('mongodb+srv://...',
   { useNewUrlParser: true }
});

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

// creating a new middleware
app.use((req, res, next) =>{
    req.io = io;
    next();
});

 app.use(express.json()); // permite uso de json
app.use(express.urlencoded({ extended: true})); // permite o envio de arquivo
app.use('/ files', express.static(tmpPath));

app.use(require('./routes'));

app.listen(process.env.PORT || 3001);
```


models/File.js

```
const mongoose = require('moongose');

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type:String,
        required: true,
    }
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

File.virtual('url').get(function () {
    const url = process.env.URL || 'http://localhost:3001';

    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);
```

models/Box.js

```
const mongoose = require('moongose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Box", Box);
```

controllers/BoxControllers.js

```
const Box = require('../models/Box');

class BoxController {
    async store(req, res) {
        const box = await Box.create({ title: req.body.title });
        return res.json(box);
    }
    async show(req, res) {
        const box = await Box.findById(req.params.id);
        return res.json(box);
    }
}

module.exports = new BoxController();
```


controllers/FileControllers.js

```
const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
    async store(req, res) {
        // const box = await Box.findById(req.params.id).populate('files');
        const box = await Box.findById(req.params.id)
            .populate({
                path: 'files',
                options: {sort: { createAt: -1 }}
            });

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();
```

# Aula 03

```
yarn add react-navigation axios
yarn add react-native-gesture-handler
react-native link react-native-gesture-handler
react-native run-ios
yarn add @react-native-community/async-storage
react-native link @react-native-community/async-storage
yarn add react-native-vector-icons
react-native link react-native-vector-icons
yarn add react-native-fs
react-native link react-native-fs
yarn add react-native-image-picker
react-native link react-native-image-picker
yarn add react-native-file-viewer
react-native link react-native-file-viewer
react-native run-ios

yarn add react-native-iphone-x-helper
```

ios/mobile/info.plise
android/app/src/main/AndroidManifest.xml

android/src/main/res/xml/file_viewer_provider_paths.xml to res/xml


# Aula 04

```
yarn add eslint -D
yarn eslint --init
  -- To check syntax, find problems, and enforce code style
  -- CommonJS (backend)
  -- None
  -- Nodejs
  -- Use a popular style guide
  -- Airbnb
  -- JavaScript
```

- install the extend ESLint, vscode

```
yarn add eslint-config-prettier eslint-plugin-prettier prettier -D
```


settings.json

```
"eslint.autoFixOnSave": true
```

.eslintrc

```
{
  "env": {
    "es6": true,
    "node": true
  },
  "extends": ['prettier', "airbnb-base"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "semi": [2, "never"],
    "class-methods-use-this": ["error", { "exceptMethods": ["store", "show"] }]
  }
}

```

- Typescript
- Docker
- [CodePush](https://microsoft.github.io/code-push/)
