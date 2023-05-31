import psycopg2
import os
import sys
import fileinput

conn = psycopg2.connect(host="localhost", 
                        database = "test",
                        user="test",
                        password="12345678")
cur = conn.cursor()

folder = "/home/moos/Documents/HYDE Platform/prototype/data-investigation/lower/txt/"
files = os.listdir(folder)

def create_table(file, header):
    table_command = f"CREATE TABLE {name} (iso_code int PRIMARY KEY NOT NULL"

    for col in header[0:-1].split(' ')[1:]:
        if col[0] == '-':
            table_command += f", BCE_{col[1:]} float"
        else:
            table_command += f", CE_{col} float"
    table_command += ')'
    cur.execute(table_command)

for file in files:
    if file.split('.')[0][-1] != 'r':
        # quite some effort and time perhaps to change the last line 
        f = open(os.path.join(folder, file), 'r')
        lines = f.readlines()
        lines[-1] = lines[-1].replace('Total', '1000')
        with open(os.path.join(folder, file), 'w') as f:
            f.writelines(lines)

        with open(os.path.join(folder,file), 'r') as f:
            name = file.split('.')[0]
            create_table(name, next(f))
            cur.copy_from(f, name, sep=' ')
        # sql code to COPY into database

conn.commit()
conn.close()



# utilize pandas to insert
# read_file = pd.read_csv(r'/home/moos/Documents/HYDE Platform/prototype/data-investigation/lower/txt/popc_c.txt', sep=' ', header=1)
