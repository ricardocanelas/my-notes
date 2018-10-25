

Go to the `/etc/apache2/sites-available` directory and create a new file.
For example, a file named example.com with the contents:

```
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com/trunk
</VirtualHost>
```