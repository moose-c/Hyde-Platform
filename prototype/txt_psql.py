import psycopg2
import pandas as pd

conn = psycopg2.connect(host="localhost", 
                        database = "test",
                        user="test",
                        password="12345678")
cur = conn.cursor()

files = [r'/home/moos/Documents/HYDE Platform/prototype/data-investigation/lower/txt/popc_c.txt']

def create_table(file, header):
    name = file.split('/')[-1].split('.')[0]

    table_command = f"CREATE TABLE {name} (iso_code int PRIMARY KEY NOT NULL"
    for col in header[0:-1].split(' ')[1:]:
        if col[0] == '-':
            table_command += f", BCE_{col[1:]} float"
        else:
            table_command += f", CE_{col} float"
    table_command += ')'
    cur.execute(table_command)

for file in files:
    with open(file, 'r') as f:
       create_table(file, next(f))
    #    cur.copy_from(f, 'tablename', sep=' ')
    # sql code to COPY into database

conn.commit()
conn.close()



# utilize pandas to insert
# read_file = pd.read_csv(r'/home/moos/Documents/HYDE Platform/prototype/data-investigation/lower/txt/popc_c.txt', sep=' ', header=1)
