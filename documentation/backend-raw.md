## Learn Postgresql & PostGIS
### Initial leaning process: how does a database work, how is it structured and how can one manually insert values.
https://docs.qgis.org/3.28/en/docs/training_manual/
module 15: database concepts)
values organized by model of vertical columns (organized by name) & horizontal rows, nb of column specified, nb of collumns can be everything. 
- table = relation
- Field = particular cell. 
- Record is 1 row. 
- datatypes: (String, Integer, Real, Data, Boolean, null)

Id, country, city, streetname, number, postcode, possible extension.
Avoid data duplication (a lot in HYDE)

id, first_name, last_name, city, streetname, number
indexes allow you to quickly just to relevant information (**for our case country**)
map database usinn *Entity-relationship Diagram* (ER-diagram) 
streets relation: id, name
people relatioin: id, name, house_no, street_id

ER is then: People > streets (one to many)

Cities: id, city
Steets: id, (city_id,) street
Last_names: id, lastname
people: id, firstname, lastname_id, nb, street_id, phone

(City >) streets > people
City > people
last_names > people 
 
Constraints: 
- Primary key: that which makes a record unique (usually id and a sequence)
- Foreign key: used to refer to unique record on another table (using that table's prim key) ER linkage usually between Foreign keys linking to primary keys

transaction, create rollback position on where to return to if something fails

15.2 & [postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04):

- switch to postgress account: `sudo -i -u postgres`, enter prompt w/ `psql`, quit w/ `\q`, or directly w/ `sudo -u postgres psql`. switch back with `exit` 
- Created superuser with: `sudo -u postgres createuser -d -E -P -r -s moos`. Now i'm a superuser. 
- `psql -l` (lists current databases)
- `createdb [db] -O (owner) moos`.
- `dropdb [db]`
- `psql [db]` connect to psql database `\q` quit, help w `\?` or `\help`

table syntax: 
`CREATE TABLE table_name (
    column_name1 col_type (field_length) column_constraints,
    column_name2 col_type (field_length),
    column_name3 col_type (field_length)
);`
example
`create table streets (id serial not null primary key, name varchar(50));`
serial & varchar data types, serial integer sequence, varchar character field
delete: `drop table [tb]`

\d to display all things
\dt to display just tables
\d [table] to show schema 
SELECT * FROM testdb

connect tables:
- add foreign key after table has been created: `alter table people 
	add constraint people_streets_fk foreign key (street_id) references streets(id)`
- or when creating the table: create table people (..., street_id int references streets(id) not null, ...)

Search fast on particular columns (countries!):
`create index people_name_idx on people(name);`

15.3)
`INSERT INTO [tb] (columns) VALUES ('... ', '...'), ('...', '...');`
`DELETE FROM testdb WHERE [column] = '...';`

`ALTER TABLE testdb ADD last_maint date;`
`ALTER TABLE testdb DROP last_maint;`

`UPDATE testdb SET [columnn] = '...' WHERE [column] = '...';`
continued:
https://www.digitalocean.com/community/tutorials/introduction-to-queries-postgresql

### Creating Postgresql Database from our TXT file
As mentioned above, the database will be constructued from (at least) two seperate components: .txt files and the .netcdf files. Since the .txt files are certainly not spatial, we now probably have the tools to at least understand how this would fit into a dataset. 
The .txt file is structured as follows:
One for each indicator (conv_rangeland, )crop_land, population, etc.), per country (isocode) a timeseries
This leads to the following database:
- countries (id=isocode serial primary key not null, country varchar not null)
- indicator, (id (*linked to counries?*), all years)
I will use a python script, since it does not really matter which language you [use](https://stackoverflow.com/questions/2168045/which-language-to-use-for-scripting-postgresql)
### Python scripting for TXT into Postgresql
https://www.postgresqltutorial.com/postgresql-python/
create test psql user:
sudo -u postgres createuser -d -E -P -r -s test
password 12345678

install package`pip install psycopg2`
creating testingdb
connecting with:
`conn = psycopg2.connect(
    host="localhost",
    database="suppliers",
    user="test",
    password="12345678")`
or .ini file for automatic connection, not necessary for our purposes now.
create tables through python:
def create_tables():
	commands = (
	"""
	CREATE TABLE tb (jkhw)
	""",
	"""
	CREATE TABEL othertbl (jkhw)
	""")
	curr = conn.cursor()
	for command in commands:
		cur.execute(command)
	cur.close()
	cur.commit()

Develop script for reading .txt file, creating psql table and writing txt to psql, see txt_psql.py !
### Interacting with operating system to view files in folders 
import os
folder_path = ''
files = os.listdir(folder_path)
os.path.join(folder_path, file)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
**In all txt the final line is "Total", I gave this isocode 1000**
Remaining things for the txt database:
reference one more table where isocodes are mapped to countries, and include references in all tables.


15.4) How to create queries:
https://docs.qgis.org/3.28/en/docs/training_manual/database_concepts/queries.html
Create db:
`CREATE DATABASE [naam];
\c [naam]`

`SELECT [column1, column2, ...] FROM [table] WHERE [column] =,!=, <, <=, BETWEEN, IN, EXISTS, LIKE, IS NULL, IS NOT NULL;`

`SELECT column as c FROM table;`

`SELECT COUNT,AVG,SUM,MIN,MAX(column) FROM table `

https://postgis.net/workshops/postgis-intro/

## netcdf to database
For this, netcdf timeseries need to be translated to layers for each time step.
This needs to be done with a bash script, which requires a basic skill in bash scripting.
https://medium.com/@royalosyin/export-a-netcdf-data-as-a-time-series-of-geotiff-images-f8effe78d1b3
### bash scripting
https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/
`date`, `pwd`, `echo` prints text
`man [command]` gives manual with command
.sh files are bash scripts
start file with: `#![path_to_interpreter]` find with: `which bash`

add executation rights: `chmod u+x [file.sh]`
run: `sh [file.sh]` or `bash [file.sh]` or `./[file.sh]`

bash has typeless variables, 
assignment as usual: `country=Pakistan` and `new_country=$country`

gather input:
user: 
`echo -e "\nenter some text"`
`read [variable_where_it_will_be_stored]`

file:
`while read line;
do
	echo "line = $line"
done < input.txt`

display output:
overwriting file: echo $[variable] > [output.txt]
appending file: ls >> [output.txt]

classic commands:
cd, ls, mkdir, touch (create file), rm (remove), cp (copy), mv (move), cat (concatanate and print countents of file), grep (search for pattern in a file), chmod (change permissions), sudo, history

if/else:
`if [[ [condition] ]];
then
	statement
elif [ [condition] ]; then
	statement
else
	do default
fi`

logical operators: AND (-a), OR (-o), -gt (greater than), -le (less or equal)

looping:
`while [[ $i -le 10 ]]; do
	echo '$i'
	(( i += 1 ))
done`

`for i in {1..5}
do
	echo $i
done`

Debugging:
`set -x` at start prints each line in terminal

Being no a bit knowledgeable about bash scripts, we can investigate how to write one for transforming netcdf to .tiff (I found this a handy format for splitting timeseries) and importing in postGIS

With this knowledge and the script provided [here](https://medium.com/@royalosyin/export-a-netcdf-data-as-a-time-series-of-geotiff-images-f8effe78d1b3) the script for converting a .netcdf to a .tiff file is easy enough.
Pretty big files: 70 mb * 70 files* 30 indicators = 150000 mb, ook veel redundancy
Perhaps just one big .netcdf file better

have setup 2-fac auth
is now synched with utrecht?

Importing now all tiff into database, let's see the resulting size
But also, just what is tiff: Tag image file format. Store raster graphics  & image information.
It is probably a lot more memory efficient to just make 1 large .nc file:
google 'Merging netCDF files with NCO/CDO'.
But does this fit in a postgres database? Do you even want it in postGIS? Or imediately into geoserver.
# 10-June-2023

## Netcdf
Hmm it is indeed probably more efficient to make 1 large NetCDF. But the question remains how to query this. Geoserver can be used to display NetCDF files: https://docs.geoserver.org/stable/en/user/extensions/netcdf/netcdf.html

But ncWMS is also promising https://stackoverflow.com/questions/25393611/netcdf-format-to-openlayers-map I got this working.
https://github.com/Reading-eScience-Centre/ncwms/blob/master/docs/02-installation.md
For now the standalone version to just use it. Go to website, Insert netcdf as specified in Config and view with the interface.

https://stackoverflow.com/questions/21833255/is-there-a-way-to-read-a-local-netcdf-file-from-a-web-application
https://github.com/cheminfo/netcdfjs
https://github.com/Reading-eScience-Centre/ncwms/blob/master/docs/02-installation.md

At least, there seem to be enough options to load a netcdf. Therefore, I think it is wise to try and combine the netcdf into 1 large netcdf, and see what this can do for space saving purposes.

Learning:
WMS (Web Map Service) server: 
WMS Client: Software/application that interacts with WMS Server to retrieve and display map data.

To assess the quality of how well the data is served from each of the above two methods, I think it is necessary to have some (bare) frontend in place. Than you can really experiment with how to make requests etc. 
Therefore, 
**Todo**: 
- make frontend for displaying data, how this all is done is the part that is most unknown.
- merge NetCDF into 1 big one

**Merging doesn't work well as of yet, and resulting files does not seem to be noticably smaller than original files. Keep like this for now, in theory is accessing a netcdf as is also not too bad.**

Great! That means this part is done for now

### Python Annotations
https://peps.python.org/pep-0008/
Follow def func(args):
by # explain method
if a public method write a **docstring** also for modules classes

## Create tests. 
`import unittest
import file

class TestFile(unittest.TestCase):
	def setUp(self):
		# called first
		self.something = ...

	def tearDown(self):
		# called at the end
		self.seomthing.remove()
`		
execute using
`python -m unittest (test_module1(.TestClass(.test_method)))`

# Django 
After discussing with a former colleague.. .
Django for beginers
Ch2:
`__init__.py` indicates that we're in a python package. For importing.
asgi.py -> Allows for option Asynchronous Servet Getaway Interface to be run
settings.py -> overall djanngo settigns
urls.py -> which pages to build in response to a browser or url request
wsgi.py -> WEb Server Getaway Interface helps serve django our eventual webpages.

## The Django Book
First 1 .cgi file to do everything (cool example).
Division of labour, modularity, automation -> Web Frameworks. 
Web frameworks provides infrastructure for application, then I only write clean code.
models.py -> description of objects as a class (model).
views.py -> business logic as function (view)
urls.py -> which view called for given URL pattern.
latest_books.html -> described page design
Folow Model-View-Controller (MVC) design: seperated define and access data (model), request routing logic (controller), seperate from user interface (view)
______
### Ch2
**pip install psycopg**
change django port: python manage.py runserver 2019
_____
### Ch3 Dynamic Web Page basics:
1) View: takes web request, returns web response (can be anything, Html contents, redirect, 404, XML document, image, or whatever).
2) Use with URLconfs (mapping between URL patterns and corresponding views)

*Basic what happens*: python3 manage.py runserver imports settings.py, containing ROOT_URLCONF (pointing to urls.py). Request made (to URL /time/)-> Django loads URLconf pointed to by ROOT_URLCONF, checks each of the URLpatterns in URLconf in order, comparing each until it maches, upon match -> calls view function associated with that pattern, passing HTTPRequest as first param.

*Detailed*: All sorts of middleware, augmenting request objects, handling of specific types, exception can help with bugs.

Loose coupling: changes to 1 piece of code does not change the other. 

Dynamic URLs: /time/plus/1, gives time+1 hour
patterns append -> `time/plus/<int:offset>/, hours_ahead`, parenthesis to capture data

Insert `assert False` to trigger debug page.

### Ch4 Django Template system

{{ variable }}
% template tag % (do something, for example for loop)
{{ filter }}: {{ var|filter:" "}}

Using this by: 
1) Create Template object, by providing raw code as string
2) call render() method of Template object with a set of variables.

#### Template Objects:
(played with by instigating python3 manage.py shell): 
`django.template import Template`
t = Template("My name is {{ name }}")
c = Context({"name": "Moos"}) (still usable as dictionary)
t.render(c)

Using dictionaries is nice: 
`person = {'name': 'Moos', 'age':39}`
`t = Template('{{ person.name }} is {{ person.age }} years old.')`
`c = Context('person': person)`
`t.render(c)`

or to class attributes:
`d = datetime.date(...)`
`t = Template('The month is {{ date.month }} and the year is {{ date.year }}.')`

or to methods:
`t = Template('{{ var }} -- {{ var.upper }} -- {{ var.isdigit }}')`
but to prevent access to method: `method.alters_data = True`

or list indices:
`t = Template('Item 2 is {{ items.2 }}.')`

#### example tags and filter
{% if and/or/not %}
{% else %}
{% endif %}
{% for %}
{% ifequal %}
{% endifequal %}
forloop.counter

{% endfor %}

[], (), {}, '', 0 and None are False, everythig else is True

filters..

Load templates, within settings.py, add dir to DIRS in TEMPLATE
then create template within dir as .html
`from django.template.loader import get_template`
get_template('template.html') looks at directory

`
    t = get_template('current_datetime.html')
    html = t.render({'current_date': now})
    return HttpResponse(html)`
or 
`from django.shortcuts import render_to_response`
`now = datetime.datetime.now()`
`return render_to_response('current_datetime.html', {'current_date': now}`

#### sick trick
locals() return dictionary of all local veriables mapping their names to their values
`current_date = datetime.datetime.now()
return render_to_response('current_datetime.html', locals())`

#### include other template within template:
{% include %}
& Inheritance: base.html, basic template, children overwrite if inncluded.
Usually: 
`base.html`, `base_section.html`, `section.html`
- `block.super` -> include parent content

### CH5: Database Interactions
Can be done within a view, but is not smart.
#### MTV Development pattern
as with templates, that can be split from a view, same with database layer
data access logic, business logic, presentation logic (Model-View-Controller) patter
View: views and templates
Controller: framework itself + URLconf
Also revered to as MTV framework (Model, Template, View (bridges models and templates))

#### Database configuration
within settings.py, DATABASES, see google and created example
Test in shell: `python3 manage.py shell`
>>> from django.db import connection
>>> cursor = connection.cursor()

#### First app
Bundle to package represention full application.
Project: instance of set of Django apps, plus configuration of those apps
App: portable set of Django functionality, usually including models and views, lives in a single python package
Apps not strickly necessary except for when working with databases: Models must live within an app:
`python manage.py startapp [appname]`
Tables both within database and within django framework, have be manually kept in synch.
#### Create model:

`class Publisher(models.Model):
	name = models.CharField(maxlength=30)
	address = models.CharField(maxlength=50)
	city = models.CharField(maxlength=60)
	state_province = models.CharField(maxlength=30)
	country = models.CharField(maxlength=50)
	website = models.URLField()`

`class Author(models.Model):
	salutation = models.CharField(maxlength=10)
	first_name = models.CharField(maxlength=30)
	last_name = models.CharField(maxlength=40)
	email = models.EmailField()
	headshot = models.ImageField(upload_to='/tmp')`
	
`class Book(models.Model):
	title = models.CharField(maxlength=100)
	authors = models.ManyToManyField(Author)
	publisher = models.ForeignKey(Publisher)
	publication_date = models.DateField()`
	
#### installing:
app into settings.py: add mysite.books to INSTALLED_APPS
`python manage.py validate`
https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-20-04
creating superuser with: python3 manage.py createsuperuser
### Production
Server option: Gunicorn or uWSGI
Hosting provider: Heroku
Create deployment checklist:
- Gunicorn
- requirements.txt (python -m pip freeze > requirements.txt)
- Update Allowed_Hosts (host/domain names our Django can serve, *)
- create Procfile (Heroku specific, website information)
- create runtime.txt file (Contains python version)

## apache
httpd.apache.org: getting started.
### Clients, Servers, and URLs
adresses on web expressed by URLs (Uniform Resource Locators), consist of protocol (http), servername (www.apache.org) and URL path (/docs/current/getting-started.html), and possibly query string (?arg=value). Client (a browser) connects to a server with the specified protocol , and makes a **request** for a resource using the URL path.
URL path may point to any number of things: file (.html), handler or program file (index.php). Server will send a **response** consisting of a status code and optionally a response body. Details of transaction and error conditions are written in log files.

### Hostnames and DNS
To connect to server, client needs to resolve servername to IP adress (actual location). Therefore, servername needs to be in DNS.
Many hostname can point to the same IP-adres, more than 1 Ip-adresses can be attached to the same physical server. Possible to run more than 1 website on the same server
For local production: put host name in /etc/hosts

### Configuration Files and Directives
Unclear, switch to: https://www.guru99.com/apache.html
Most widely user Web Server application (>50% commercial web server market). Modular, process-based web server application.
unclear, now:loca
https://geek-university.com/what-is-apache-http-server/: 
robust web server tha can handle large volumes of traffic. 
Many different websites hostable using virtual hosts.
###What is a webserver
Web server: software with primary funnction to store, process and deliver web pages to clients, through HTTP protocol. HTTP: Client-Server protocol. Webserver running appache receives request and responds with contents. Usually use TCP port 80 
### Install:
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install apache2
service apache2 status
localhost:80
Located at: 
/etc/apache2

https://ubuntu.com/tutorials/install-and-configure-apache#1-overview
https://www.fosstechnix.com/how-to-install-apache2-on-ubuntu-22-04-lts/
However, only available at localhost:80.
https://www.digitalocean.com/community/tutorials/apache-configuration-error-ah00558-could-not-reliably-determine-the-server-s-fully-qualified-domain-name
Geen idee, niet te doen.
Ook, wijzen naar directory within /home/ mag niet blijkbaar

# PHP
https://www.strato.nl/hosting/php-tutorial-voor-beginners/
Serverbased scripttaal voor Dynamische Webpaginas. PHP: Hypertext Preprocessor. Javascript etc op webbrowser draaien, PHP draait op server. PHP maakt HTML pagina's die de server naar de webbrowser stuurt, ontvangt dus niet PHP. 79% vd websites begruikt PHP. 
`sudo apt install php`


## installeren
WEbserver die scripttaal kan interpreteren: PHP-interpreter. Gebruikt vaak met Apache HTTP Server. XAMPP: Apache, MariaDB, PHP & Perl

https://httpd.apache.org/docs/2.4/getting-started.html

https://www.phptutorial.net/php-tutorial/install-php/

https://www.wikihow.com/Install-XAMPP-on-Linux
Xampp also doesn't work, installer gets stuck...
F* this for now, 
from folder where files:
`php -S localhost:2019 `
Now server running, acces files as urls.

https://www.phptutorial.net/php-tutorial/php-syntax/
spacing doesn't matter
sudo apt-get install php-pgsql
pg_connect("host=localhost dbname=timeseries user=postgres password=Papaver_rhoeas");
pg_query("pg code")

https://code-boxx.com/use-html-css-javascript-php-mysql/?utm_content=cmp-true

# Javascript to PHP:
https://stackoverflow.com/questions/23740548/how-do-i-pass-variables-and-data-from-php-to-javascript
Try all things with php supported local server: php -S localhost:8000
`npm start` doesn't, this give a vite local server which doesn't support php.

Population Count
Population Density
Urban Population
Rural Population
Build Area
Cropland
Grazig
Pasture 
Rangeland
Conventional Rangeland
Rice Irrigated
Rice Rainfed
Total Rice
Other Irrigated
Other Rainfed
Total Irrigated
Total Rainfed

  

popc
popd
urbc
rurc
uopp
cropland
grazing
pasture
rangeland
conv_rangeland
ir_rice
rf_rice
tot_rice
ir_norice
rf_norice
tot_irri
tot_rainfed


