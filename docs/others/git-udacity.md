# Aula 1 - O que é controle de versão?

Informações de VCS (Version Control Systems, ou sistemas de controle de versão). Três dos sistemas de controle de versão mais importantes são:

- Git
- Subversion
- Mercurial

Há dois tipos principais de modelos de sistema de controle de versão:

- o modelo centralizado - todos os usuários se conectam a uma central, em um repositório único
- o modelo distribuído - cada usuário possui um repositório inteiro em seu computador

## Terminologia

Um sistema de controle de versão (abreviado como VCS) é uma ferramenta que gerencia versões distintas do código-fonte. Um controlador de código-fonte (abreviado como SCM) é outro nome para o sistema de controle de versão.

O Git é um SCM (e, portanto, um VCS). A URL para o site do Git é https://git-scm.com/ (veja que ela contém "SCM" no domínio!).

[Fluxo de trabalho típico do controle de versão](https://www.youtube.com/watch?v=dVil8e0yptQ) [Resposta do quiz](https://www.youtube.com/watch?v=rFtUkk-sCqw)



### Commit (snapshot)

É como se ele tirasse uma foto de todos os seus arquivos naquele momento e armazenasse uma referência para essa foto.

### Índice de Preparação / Staging Index / Staging Area / Index

Um arquivo no diretório Git que armazena informações sobre o que vai entrar no seu próximo commit.

### Repositorio / Repository (repo)

Um repositório é um diretório que contém seu trabalho em um projeto. Um repositório é composto por commits.

### Diretório de trabalho / Working Directory

O diretório de trabalho são todos os arquivos que você encontra no sistema de arquivos de seu computador.

### Checkout

Um checkout acontece quando o conteúdo do repositório é copiado para o diretório de trabalho.

### SHA

O SHA é basicamente um número de identificação para cada commit. O SHA de commit deve ser algo semelhante a isto: `e2adf8ae3e2e4ed40add75cc44cf9d0a869afeb6` (composta por 40 caracteres (0–9 e a–f)). "SHA" é uma sigla para "Secure Hash Algorithm" (função de dispersão criptográfica).

### Branch

Um branch é quando uma nova linha de desenvolvimento é criada, que difere da linha principal de desenvolvimento. Essa linha alternativa de desenvolvimento pode continuar sem alterar a linha principal.

## Configuração

```
# configure o Git com seu nome
git config --global user.name "<Your-Full-Name>"

# configure o Git com seu e-mail
git config --global user.email "<your-email-address>"

# verifique se a saída do Git está colorida
git config --global color.ui auto

# exibe o estado original em um conflito
git config --global merge.conflictstyle diff3

git config --list
```

Configurando o git para usar um editor especifico

```
git config --global core.editor "atom --wait"
git config --global core.editor "'/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl' -n -w"
git config --global core.editor "code --wait"
```

# Aula 2 - Criando um repositório

Commandos necessários:

- `ls`: listar arquivos
- `mkdir`: criar um nova pasta
- `rm`: remover arquivos e diretórios


`git init`: inicializa um repositório Git vazio

## Conteúdo do diretório .git

- config file - onde todas as configurações específicas do projeto estão armazenadas.
- diretório hooks - aqui podemos colocar scripts tanto do client-side quanto do server-side, que podemos utilizar nos diferentes eventos do ciclo de vida do Git.
- diretório info - contém o arquivo global "excludes"
- diretório objects - este é o diretório que armazenará todos os commits que fazemos
- diretório refs - este é o diretório que possui os ponteiros para os commits (basicamente, "branches" e "tags")

Lembre que, além do diretório "hooks", você não deveria manipular nenhum conteúdo por aqui. O diretório "hooks" pode ser utilizado para realizar ações em momentos específicos ou eventos do workflow Git.

# Aula 3 - Revisando o histórico de um repositório

- `git log`
- `git log --oneline`
- `git log --stat` ("stat" é a abreviação de "statistics")
- `git log -p` ("p" é a abreviação de "patch")
- `git shortlog` Uma maneira rápida em que podemos ver quantos commits cada colaborador adicionou ao repositório
- `git show <SHA>`
- `git show <SHA> -p`
- `git log --oneline --decorate --graph --all`

O sinalizador `--graph` adiciona os marcadores e as linhas na parte à esquerda do resultado. Isso mostra o branching realmente acontecendo. O sinalizador `--all` é o que mostra todos os branches no repositório.

- para rolar para baixo, aperte
    - `j` ou ↓ para descer uma linha por vez
    - `d` para descer metade da página
    - `f` para descer toda a página

- para rolar para cima, aperte
    - `k` ou ↑ para subir uma linha por vez
    - `u` para subir metade da página
    - `b` para subir a página inteira

- aperte `q` para sair do log

# Aula 4 - Adicionando commits

- `git add index.html style.css`
- `git add .`
- `git commit`
- `git commit -m "Initial commit"` (Ignore o editor com a flag -m)

## Como eu escrevo uma boa mensagem de commit?

Artigos: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/), [What’s with the 50/72 rule?](https://medium.com/@preslavrachev/what-s-with-the-50-72-rule-8a906f61f09c#.jwprsco0n), [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

Faça

- mantenha a mensagem curta (menos de 60 caracteres)
- explique o que o commit faz (não como ou por que!)

Não faça

- não explique por qual motivo as mudanças são feitas (mais sobre isso abaixo)
- não explique como as mudanças são feitas (para isso, temos o comando git log -p!)
- não utilize a palavra “e”
    - se você precisa utilizar a palavra “e”, sua mensagem de commit provavelmente está se referindo a mais de uma mudança no projeto - separe as mudanças em commits diferentes

Se você realmente necessitar incluir o motivo pelo qual um commit precisa ser realizado, você pode!. Quando você está escrevendo a mensagem de commit, a primeira linha é a própria mensagem. Depois da mensagem, deixe uma linha em branco e, então, digite o corpo da explicação, incluindo detalhes sobre por que motivo este commit é necessário (ex: links para URLs).

![motivo](https://d17h27t6h515a5.cloudfront.net/topher/2017/February/58a38f2f_ud123-l4-git-commit-details-section/ud123-l4-git-commit-details-section.png)

## Diff

O comando `git diff` é utilizado para verificar mudanças que foram feitas, porém ainda sem commit:

![diff](https://d17h27t6h515a5.cloudfront.net/topher/2017/February/58a3901f_ud123-l4-git-diff/ud123-l4-git-diff.png)

## .GitIgnore

.gitignore usa um conceito chamado globbing. O [Globbing](https://en.wikipedia.org/wiki/Glob_(programming)) permite que você utilize caracteres especiais para identificar padrões/caracteres. No arquivo .gitignore, você pode usar o seguinte:

- utilize linhas em branco para o espaçamento
- `#` - marca uma linha como comentário
- `*` - corresponde a um ou mais caracteres
- `?` - corresponde a um caractere
- `[abc]` - corresponde a a, b, ou c
- `**` - corresponde aos diretórios aninhados - a/**/z corresponde a
    - a/z
    - a/b/z
    - a/b/c/z

```
samples/*.jpg

```

# Aula 5 - Tagging, branching e merging

## Tagging

[Vídeo explicando](https://www.youtube.com/watch?v=D4VdXT72ASE), [2](https://www.youtube.com/watch?v=Px6EUylw8Uw)

- `git tag -a v1.0`
- `git tag` (vai exibir todas as tags que estão no repositório.)
- `git tag -d v1.0` (vai remover a tag v1.0)
- `git tag -a v1.0 a87984` (vai acrescentando uma tag a um commit anterior)

## Branching

[Vídeo explicando](https://www.youtube.com/watch?v=ywcOC6CLG4s)

## Branching

Default nome do branch sempre será 'master'

[Vídeo explicando]()

- `git branch sidebar` criando um branch chamado 'sidebar'
- `git checkout sidebar` para fazer a troca entre branches
- `git checkout -b menu` vai criar um branch e trocar o branch (commando dois em um)
- `git branch` vai exibir o branch ativo
- `git branch alt-footer 42a69f` cria um novo branch, chamado 'alt-footer', e indica o novo commit com o SHA.
- `git branch -d sidebar` vai deletar o branch 'sidebar' (É importante observar que você não pode deletar o branch em que se encontra.) (O Git não permite que exclua um branch se ele tiver commits que não estejam em nenhum outro branch )
- `git branch -D sidebar` forçar a exlusão de um branch.

## Merging

A combinação de branches é chamada de merging. [Vídeo explicando](https://www.youtube.com/watch?v=gQiWicrreJg)`

`git merge <name-of-branch-to-merge-in>`

## Conflitos

Observe que, logo após o comando git merge heading-update, ele tenta fazer o merge do arquivo que foi alterado em ambos os branches (index.html), mas houve o conflito. Além disso, note que ele diz o que aconteceu - "Falha no merge automático; resolva os conflitos e faça o commit do resultado."

Explicação dos indicadores do conflito de merge
O editor tem os seguintes indicadores do conflitos de merge:

- `<<<<<<< HEAD` tudo abaixo desta linha (até o próximo indicador) mostra o que está no branch atual
- `||||||| merged common ancestors` tudo abaixo desta linha (até o próximo indicador) mostra quais eram as linhas originais
- `=======` é o final das linhas originais, tudo que vem depois disso (até o próximo indicador) é o que está no branch que vai passar pelo processo de merge
- `>>>>>>> heading-update` é o indicador final do que está no branch que vai passar pelo processo de merge (neste caso, o branch heading-update)

# Aula 6 - Desfazendo as alterações

- `git commit --amend`
    - Modificando o último commit
    - Se o seu Diretório de Trabalho estiver limpo (o que significa que não há nenhuma alteração sem commit no repositório), a execução do comando git commit --amend permitirá que você informe uma nova mensagem de commit.
    -

- `git revert <SHA-of-commit-to-revert>`
    - É utilizado para reverter um commit feito anteriormente:
    - Vai criar um novo commit

- `git reset <reference-to-commit> <sinalizadores>` or `git reset --mixed HEAD^`
    - O comando git reset é usado para redefinir (apagar) commits
    - Referencia de origin:
        - `HEAD^` (indica o commit pai),
        - `HEAD~` (indica o primeiro commit pai)
    - Pode ser utilizada para
        - mover o HEAD e o ponteiro do branch atual para o commit tomado como referência
        - apagar commits
        - mover as alterações que receberam o commit para o índice de preparação
        - não selecionar as alterações que receberam o commit
    - Sinalizadores: `--mixed` (default), `--soft`, `--hard`
    - Lembre-se de que o comando git reset apagará os commits do branch atual.

[Vídeo explicando sobre o Reset](https://www.youtube.com/watch?v=UN7ki2G2yKc)

## Redefinir x reverter

À primeira vista, a redefinição pode parecer muito semelhante à reversão, mas elas são bem diferentes. A reversão cria um novo commit que reverte ou desfaz um commit anterior. Por outro lado, a redefinição apaga os commits!

A redefinição pode ser perigosa!! Para aliviar um pouco o estresse, o Git monitora tudo por aproximadamente 30 dias antes de apagar qualquer coisa por completo. Para acessar este conteúdo, você precisará usar o comando git reflog.

# Aula 7 - Trabalhando com repositórios remotos

- `git remote` deixará você gerenciar e interagir com repositórios remotos. Se você não configurou um repositório remoto, este comando não exibirá nada. Uma ressalva: se este repositório tiver sido clonado. Neste caso, ele automaticamente terá um remoto pois foi clonado de uma URL que você forneceu.

- `git remove -v` vai visualizar o caminho completo dos repositórios remotos.

- `git remote add <remote-shortname> <url.git>` vai adicionar um repositorio remoto.

- `git remote rename mine origin` renomear o "origin" para "mine"

- `git push <remote-shortname> <branch>` enviar os commits ao repositório remoto no GitHub

- `git pull <remote-shortname> <branch>` receber os commitos do repositório remoto

- `git fetch <remote-shortname> <branch>` O comando git fetch é utilizado para recuperar commits de um repositório remoto, porém sem fazer o merge automático do branch local com o tracking branch após o recebimento dos commits. É importante notar que o branch local não sofre modificações. Um ponto principal onde você deveria utilizar o comando `git fetch` é quando tanto o seu branch remoto quanto o branch local tiverem mudanças que não estão no outro branch. [Como funciona](https://www.youtube.com/watch?v=jwyQUfE1Eqw)

# Aula 8 - Trabalhando no repositório de um outro desenvolvedor

[O que é fork?](https://www.youtube.com/watch?v=z4mkVwqVztc)

Fazer um fork de um repositório estará fornecendo uma cópia do repositório em sua conta, você pode clonar em seu computador, fazer alterações e depois encaminhar essas alterações de volta ao repositório gerado pelo fork. Mas você precisa ter em mente que estará fazendo o push das mudanças de volta para o seu repositório remoto e não para o repositório remoto original que você obteve.

# Aula 9 - Ficando em sincronia com um repositório remoto

Uma solicitação pull é um pedido ao mantenedor do repositório original ou de origem para incluir alterações que você fez em seu fork para o projeto dele. Você está solicitando que eles efetuem o pull em alterações que você fez.

[Vídeo 1](https://www.youtube.com/watch?&v=twLr9ndsf90)

[Vídeo 2](https://www.youtube.com/watch?v=VvoC6hN6FjU)

- `git remote add upstream https://github.com/udacity/course-collaboration-travel-plans.git`
- `git fetch upstream master`

```
# para ter certeza de que estou no branch correto para o merge
$ git checkout master

# faça o merge nas alterações da Lam
$ git merge upstream/master

# envie as alterações da Lam para o *meu* remoto
$ git push origin master
```

## Rebase

Introdução: [vídeo](https://www.youtube.com/watch?v=mRbeT2XVL9w)

Primeiramente, vamos ver como o squashing funciona a partir de um contexto mais amplo. Em seguida, faremos o squash com o comando git rebase. [vídeo](https://www.youtube.com/watch?v=H5JqcdIB5y0)

```
git branch backup
git rebase -i HEAD~3
```

Como funciona na pratica: [vídeo](https://www.youtube.com/watch?v=cL6ehKtJLUM)

### Comandos de rebase

Vamos dar outra olhada nos diversos comandos que você pode fazer com o git rebase:

- use `p` ou `pick` – para manter como commit do jeito que está
- use `r` ou `reword` – para manter o conteúdo do commit, mas alterar a mensagem do commit
- use `e` ou `edit` – para manter o conteúdo do commit, mas parar antes da realização do commit para que possa:
    - acrescentar novo conteúdo ou arquivos
    - remover conteúdo ou arquivos
    - alterar o conteúdo que sofreria o commit
- use `s` ou `squash` – para combinar as alterações do commit no commit anterior (o commit acima dele na lista)
- use `f` ou `fixup` – para combinar a alteração do commit no anterior, mas remover a mensagem do commit
- use `x` ou `exec` – para executar o comando de shell
- use `d` ou `drop` – para apagar o commit
