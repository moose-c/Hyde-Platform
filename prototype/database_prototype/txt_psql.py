"""Module for getting txt data into a PostgreSQL database

Reads all files in a folder, insert each txt file in a different table, structured as:
example_indicator:
    isocode | BCE_year1 | BCE_year2 | ... | CE_year1 | CE_year2 | ...
    int        float       float     ...     float      float     ...

"""

import psycopg2 # psql driver
import os # interact with operating system
import sys
# add parent directory to path for this file
sys.path.append('../../Hyde-Platform')
from passwords import postgresql_username, postgresql_password

def create_table(name, header):
    # create psql command, table as isocode, BCE_year1, BCE_year2, ..., CE_year1, CE_year2, ...
    table_command = f"CREATE TABLE {name} (iso_code int PRIMARY KEY" # Perhaps you want to change this to serial id & iso_code referencing another table
    for col in header[0:-1].split(' ')[1:]:
        if col[0] == '-':
            table_command += f", BCE_{col[1:]} float" # BCE_year1
        else:
            table_command += f", CE_{col} float" # CE_year1
    table_command += ')'
    cur.execute(table_command)

def clean_database(conn, cur):
    conn.autocommit = True # for some reason this has to be here.
    cur.execute('DROP DATABASE timeseries')
    cur.execute('CREATE DATABASE timeseries')

    conn.commit()
    cur.close()
    conn.close()

    conn = psycopg2.connect(host="localhost", 
                        database = "timeseries",
                        user=postgresql_username,
                        password=postgresql_password)
    cur = conn.cursor()
    return conn, cur


if __name__ == "__main__":
    # connection to psql, to temporary database to first clean final database
    conn = psycopg2.connect(host="localhost", 
                            database = "temp",
                            user=postgresql_username,
                            password=postgresql_password)
    cur = conn.cursor()
    
    # clean timeseries database and connects to timeseries db.
    conn, cur = clean_database(conn, cur)

    # path to all txt files
    folder = "/home/moos/Documents/Hyde-Platform/data/lower/txt/"
    files = os.listdir(folder) # list all within the folder

    for file in files:
        # only do it for countries not for 'r'egions.
        if file.split('.')[0][-1] != 'r':
            # Change the last line to ISO_code = 1000, otherwise it does not fit 
            f = open(os.path.join(folder, file), 'r')
            lines = f.readlines()
            lines[-1] = lines[-1].replace('Total', '1000')
            with open(os.path.join(folder, file), 'w') as f:
                f.writelines(lines)

            with open(os.path.join(folder,file), 'r') as f:
                name = file.split('_c')[0]
                create_table(name, next(f)) # create the table
                cur.copy_from(f, name, sep=' ') # insert data into table

    conn.commit()
    conn.close()


