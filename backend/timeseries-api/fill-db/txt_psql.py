"""Module for getting txt data into a PostgreSQL database

Reads all files in a folder, insert each txt file in a different table, structured as:
example_indicator:
    iso_code | BCE_year1 | BCE_year2 | ... | CE_year1 | CE_year2 | ...
    int        float       float     ...     float      float     ...

"""

import psycopg2  # psql driver
import os  # interact with operating system

password = os.environ["POSTGRES_PASSWORD"]  # retrieve password


def create_table(name, header):
    # Construct postgres command to create a table with desired columns, then execute command
    # Table will have the following collumns: iso_code, BCE_year1, BCE_year2, ..., CE_year1, CE_year2, ...
    table_command = f"CREATE TABLE {name} (iso_code int PRIMARY KEY"

    # Parse each year into a prety name
    for col in header[0:-1].split(" ")[1:]:

        # If year contains a minus, it is BCE
        if col[0] == "-":
            table_command += f", BCE_{col[1:]} float"  # BCE_year

        # If not, it is CE
        else:
            table_command += f", CE_{col} float"  # CE_year
    table_command += ")"

    # Execute Create table command within timeseries database
    cur.execute(table_command)


# connection to timeseries postgres database
# host is so easy because within the same docker-compose.yml file means within the same network, and can contact other containers easily.
conn = psycopg2.connect(
    host="timeseries-database",
    database="timeseries",
    user="postgres",
    password=password,
)

# cur object allows for executiion of commands.
cur = conn.cursor()

# path to all txt files
folder = "/data/txt/"
files = os.listdir(folder)  # list all within the folder

# If already populated, catch error and quit.
try:
    for file in files:  # for each individual text file, do the following
        # Only do it for countries not for 'r'egions.
        if (
            file.split(".")[0][-1] != "r"
        ):  # last letter is not r, it is c for country, continue

            # Change the last line (Total) to iso_code = 10000, otherwise it does not fit into the database
            f = open(os.path.join(folder, file), "r")
            lines = f.readlines()
            lines[-1] = lines[-1].replace("Total", "10000")
            with open(os.path.join(folder, file), "w") as f:
                f.writelines(lines)

            # Having succesfully altered the final line, create and populate table from each file.
            with open(os.path.join(folder, file), "r") as f:
                name = file.split("_c")[0]
                create_table(name, next(f))  # create the table
                cur.copy_from(f, name, sep=" ")  # insert data into table
    conn.commit()
    conn.close()

except (
    psycopg2.errors.DuplicateTable
):  # If database has already been created previously, don't give an error just don't execute the code.
    pass
