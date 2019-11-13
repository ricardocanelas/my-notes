>> Working..

# Notes

- [Trouble with UTF 8 characters] (https://stackoverflow.com/questions/38363566/trouble-with-utf-8-characters-what-i-see-is-not-what-i-stored)
- [What is the best collation to use for MySQL with PHP](https://stackoverflow.com/questions/367711/what-is-the-best-collation-to-use-for-mysql-with-php)

- [Tipo de enginee](https://www.devmedia.com.br/tipos-de-tabelas-do-mysql/7035)

- [MyISAM vs InnoDB](https://stackoverflow.com/questions/47680213/what-are-the-current-differences-between-myisam-and-innodb-storage-engines-speci)

For newer versions, recommend *utf8mb4* and *utf8mb4_unicode_520_ci*. These give you the rest of Chinese, plus improved collation.

There is no big performance difference between *utf8* and *utf8mb4*

But if the collation not use default one, use like utf8mb4_unicode_520_ci, the sort performace will be 10-15% slower than use utf8mb4_general_ci

In 'unicode_520', for example, the two characters "ae" are treated as equal to the single character "æ". This is an example of where the the 'general' collation is a little faster -- because it takes less effort.

In most collations "lj" = "ǉ", but not in 'general'.

# Install (mac)

```
brew update
brew install mysql@5.6
brew services list
brew services start mysql@5.6
brew services stop mysql@5.6
```

```
brew link --force mysql@5.6
```

You might need to add the location to mysql to your path, to find the location of the package:

```
brew list mysql@5.6
```

Then add the location to the bin folder to the end of your ~/.profile or ~/.bash_profile file. For instance:

```
export PATH=$PATH:/usr/local/Cellar/mysql@5.6/5.6.43/bin
alias mstart='brew services start mysql@5.6'
alias mstop='brew services stop mysql@5.6'
```


# Acessar o mysql

```
mysql -u root -p (com senha)
mysql -u root
```

#### Visualizar os banco de dados

```
show databases;
```

#### Criar um database

```
create database <name-of-my-database>
```

#### Para acessar um database

```
use <name-of-my-database>
```

#### Visualizar as tabelas

```
show tables
```

#### Visualizar a estrutura de uma tabela

```
describe <name-of-table>
```

#### Visualizar dados globais

```
SHOW GLOBAL VARIABLES LIKE 'PORT';
```

#### Hostname

It usually be: '127.0.0.1:3306'

```
select @@hostname;
show variables where Variable_name like '%host%';
select host from information_schema.processlist;
```