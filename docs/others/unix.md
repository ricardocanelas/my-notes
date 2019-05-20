
# Commands

## PHP

Get the place where is the PHP

```
php -i | grep 'php.ini'
php --ini
php -r "phpinfo();" | grep php.ini
```

## Current Directory (pwd)

```
$ pwd
```

## Rename (rm)

To remove a file

* -r files and directories
* -f force

```
rm {file}
rm -r {mydir}
rm -rf {mydir}
```

## Symbolink

(create)

* -s soft link
* -r relative to link location
* -t no target directory

```
$ ln -s {/path/to/file-name} {link-name}
$ ln -s /shared/sales/data/file.txt sy-sales.data.txt
$ ln -sr {currentdirectory} {/path/link-name}
```

(delete)

```
$ rm {link-name}
$ rm sy-sales.data.txt
```


# Windows

```
$ mklink
$ mklink /D Link Target
```
