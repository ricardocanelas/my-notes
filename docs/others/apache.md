>> Working..

# Notes

Go to the `/etc/apache2/sites-available` directory and create a new file.
For example, a file named example.com with the contents:

```
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com/trunk
</VirtualHost>
```

# Links

- https://www.cheatography.com/davechild/cheat-sheets/mod-rewrite/
- https://mod-rewrite-cheatsheet.com/

## Articles

### A simple way to understand mod rewrite

```
# mod_rewrite script
RewriteCond %{REQUEST_URI} ^/media/
RewriteCond %{HTTP_HOST} ^www\.canelas\.com [OR]
RewriteCond %{REQUEST_URI} /index\.html$
RewriteRule (.*?)(index\.html)?$ http://canelas.com$1 [NE,R=301,L]

# pseudo-code of that script
# if (path starts with "/media/") {
#    if (host begins with "www.canelas.com" or path ends with "/index.html") {
#        redirect to "http://canelas.com" + the path excluding "index.html"
#    }
# }
```

Key ideas:

1. RewriteCond’s are if-statements
2. A RewriteCond creates a code block that doesn’t get closed until we reach a RewriteRule with an [L] flag
3. Multiple RewriteCond if-statement’s, in a row, wrap around each other (AND’ed together), but if you use an [OR] flag, it OR’s the next RewriteCond with the current one
4. Since this forms one code block, you can put separate mod_rewrite scripts before or after it
5. You have to understand regular expressions

Just one if-statement:

```
# mod_rewrite script
RewriteRule (.*?/)(index\.html)$ $1 [NE,R=301,L]

# psuedo-code of that script
# if (path ends with "/index.html") {
#     redirect to the path without "index.html"
# }
```

RewriteCond / Supported conditions

* `-d` check if path is an existing directory
* `-f` check if path is an existing file
* `-s` check if path is an existing file larger than 0 bytes
* `-l` check if path is an symbolic link
* `-F` check if path is an existing file and user is authorized to access it
* `-U` checks if test string is a valid url and user is authorized to access it

RewriteCond / Flags

* `NC` / nocase	case-insensitive matching (default: case-sensitive)
* `OR` / ornext	combine conditions via logical or (default: logical and)

RewriteRule / Flags

* chain / `C`	group rewrite rules in a chain. later rules are executed, only if the previous ones are matching
* forbidden / `F` 	send HTTP status header FORBIDDEN (403) immediately
* gone / `G`	send HTTP status header GONE (410)
* last / `L`	stop processing rewrite rules after this one
* next / `N`	abort current rewrite directive and restart rewriting
* nocase / `NC`	perfom case-insensitive matching
* noescape / `NE`	disable automatic url-encoding
* nosubreq / `NS`
* redirect / `R[=301|302|303]`	perform a HTTP redirect to destination and send HTTP status header (default: 302)
* etc...