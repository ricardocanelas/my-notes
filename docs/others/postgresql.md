
# MacOS

## Installing & Setup

```bash
brew update
brew install postgresql
postgres --version
```

Creating a global physical Database. In others words, you need it to create a "cluster" or "data directory".

There is an implied hierarchy: host -> cluster[] -> database[] -> schema[] -> table[] -> column[]

```bash
initdb /usr/local/var/postgres
```

.bash_profile

```
alias pstart='pg_ctl -D /usr/local/var/postgres start'
alias pstop='pg_ctl -D /usr/local/var/postgres stop'
```

```bash
pstart
pstop
```

## Info

```
waiting for server to start....2019-06-07 15:55:54.178 -03 [11006] LOG:  listening on IPv6 address "::1", port 5432
2019-06-07 15:55:54.178 -03 [11006] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2019-06-07 15:55:54.178 -03 [11006] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2019-06-07 15:55:54.193 -03 [11007] LOG:  database system was shut down at 2019-06-07 12:05:44 -03
2019-06-07 15:55:54.197 -03 [11006] LOG:  database system is ready to accept connections
```

- HOST: 127.0.0.1
- PORT: 5432

## Commands

Creating database

```bash
createdb mydatabasename
dropdb mydatabasename
```

Connecting to databases to execute SQL statements.

```bash
psql
# or...
psql mydatabasename
```

## Shell

- `\list` - List all of your actual databases.
- `\c mydatabasename` - Connect to another database.
- `\d - List the relations of your currently connected database.
- `\d` mytablename` - Shows information for a specific table.
- `\du` - Show informations for roles
- `\du+` - Show more informations for roles
- `\dt` - To list all tables in the current database
- `\dn` - To list all schemas of the currently connected database
- `\g` - To execute the previous command
- `\s` - History
- `\i filename` - To execute psql commands from a file
- `\e` - To execute a SQL in a editor
- `\?` - To get help
- `\q` - To quit

### Roles

List of roles

```
SELECT rolname FROM pg_roles;
```

Create a role

```
CREATE ROLE role_name;
CREATE ROLE big_boss SUPERUSER;
```

Create password

```
CREATE ROLE doe WITH PASSWORD 'pgSecpas1970' VALID UNTIL '2020-01-01';
```

Removing roles

```
DROP ROLE role_name;
```

## Recipes

- [https://gist.github.com/lxneng/741932](https://gist.github.com/lxneng/741932)
