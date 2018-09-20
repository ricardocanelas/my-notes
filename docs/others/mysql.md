
- [Trouble with UTF 8 characters] (https://stackoverflow.com/questions/38363566/trouble-with-utf-8-characters-what-i-see-is-not-what-i-stored)
- [What is the best collation to use for MySQL with PHP](https://stackoverflow.com/questions/367711/what-is-the-best-collation-to-use-for-mysql-with-php)

- [Tipo de enginee](https://www.devmedia.com.br/tipos-de-tabelas-do-mysql/7035)

- [MyISAM vs InnoDB](https://stackoverflow.com/questions/47680213/what-are-the-current-differences-between-myisam-and-innodb-storage-engines-speci)

For newer versions, recommend *utf8mb4* and *utf8mb4_unicode_520_ci*. These give you the rest of Chinese, plus improved collation.

There is no big performance difference between *utf8* and *utf8mb4*

But if the collation not use default one, use like utf8mb4_unicode_520_ci, the sort performace will be 10-15% slower than use utf8mb4_general_ci

In 'unicode_520', for example, the two characters "ae" are treated as equal to the single character "æ". This is an example of where the the 'general' collation is a little faster -- because it takes less effort.

In most collations "lj" = "ǉ", but not in 'general'.


Acessar o mysql

```
mysql -u root -p (com senha)
mysql -u root
```

Visualizar os banco de dados

```
show databases;
```

Criar um database

```
create database <name-of-my-database>
```

Para acessar um database

```
use <name-of-my-database>
```

Visualizar as tabelas

```
show tables
```

Visualizar a estrutura de uma tabela

```
describe <name-of-table>
```