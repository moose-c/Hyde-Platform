"""Module for obtaining al years from the PostgreSQL database

Largely stolen from txt_psql.
"""

import psycopg2 # psql driver
import pandas as pd 
import sys
# add parent directory to path for this file
sys.path.append('../Hyde-Platform')
from passwords import postgresql_username, postgresql_password

if __name__ == "__main__":
    # connection to psql, to temporary database to first clean final database
    conn = psycopg2.connect(host="localhost", 
                            database = "timeseries",
                            user=postgresql_username,
                            password=postgresql_password)
    cur = conn.cursor()

    table = pd.read_sql_query('SELECT * FROM popc',conn);
    
    year_select = ""
    for column in table.columns:
        split_column = column.split('_')
        if split_column[0] == 'bce':
            year_select += f'<option value="{column}">-{split_column[1]}</option>\n'
        else:
            year_select += f'<option value="{column}">{split_column[1]}</option>\n'
    print(year_select)