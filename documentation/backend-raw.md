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

