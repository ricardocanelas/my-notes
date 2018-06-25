

# Editor Config

```
npm install eslint`
./node_modules/.bin/eslint --init
./node_modules/.bin/eslint .
./node_modules/.bin/eslint --fix
```

```
"scripts":{
    "lint": "./node_modules/.bin/eslint ."
}
```

`.editorconfig`

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
insert_final_newline = false

[*.{css,scss}]
indent_size = 2

[*.md]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

# Instalando o ESLint

1. Instale o plugin no seu editor de texto. [VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. Instale o Eslint globalmente `npm install -g eslint` ou local `npm install eslint` (*Note: You will need to install ESLint if you are not using Create React App*)

3. Crie o arquivo `.eslintignore` e adicione `*.min.js`

4. Instale a configuração do Airbnb:
    - [Javascript + JSX](https://www.npmjs.com/package/eslint-config-airbnb)
        - `npm info "eslint-config-airbnb@latest" peerDependencies`
        - or `npx install-peerdeps --dev eslint-config-airbnb` for npm 5+
    - [Javascript](https://www.npmjs.com/package/eslint-config-airbnb-base)
        - `npm info "eslint-config-airbnb-base@latest" peerDependencies`
        - or `npx install-peerdeps --dev eslint-config-airbnb-base` for npm 5+

5. Adicione o arquivo `.eslintrc`

```
{
  "extends": "airbnb"
}
```

ps: se você usar algum plugin js importado através de um CDN (como jQuery ou axios), você precisará avisar ao ESLint que você está utilizando isso, pois caso contrário ele acusará erro. Para isso, basta deixar seu .eslintrc da seguinte maneira:

```
{
  "extends": "airbnb",
  "env": {
   "jQuery": true
  }
}
```

6. Adicione um script no package.json

```
"scripts":{
    "lintLocal": "./node_modules/.bin/eslint ."
    "lint": "eslint ."
}
```

# Prettier

Não precisa instalar pluging para editor de texto.

1. Instalar `prettier`

```
yarn add prettier --dev --exact
npm install --save-dev --save-exact prettier

# or globally
yarn global add prettier
npm install --global prettier
```

2. Instalar o plugin

```
yarn add --dev eslint-plugin-prettier
```

3. Adicione extensão no arquivo `.eslintrc`

```
{
  "extends": [
      "airbnb",
      "prettier",
      "prettier/react"
  ],
  "plugins": [
      "prettier"
  ],
  "prettier/prettier": [
      "error:,
      {
          "trailingComma": "es5", // "all"
          "singleQuote": true,
          "printWidth": 120,
      }
  ],
}
```

3. Configuração para seu editor de texto

- VSCode:

```
"editor.formatOnSave": true,
"[javascript]" : {
    "editor.formatOnSave": false
},
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
```

# Lista de configurações usando Linters

- [Wesbos](https://github.com/wesbos/dotfiles/blob/master/.eslintrc)
- [Marked](https://github.com/markedjs/marked/blob/master/.eslintrc.json)

# Lista de configurações usando editorconfigs

- [Marked](https://github.com/markedjs/marked/blob/master/.editorconfig)