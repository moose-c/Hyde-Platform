import unittest
import psycopg2
import os

# Import the module containing the functions to be tested
import txt_psql  # Replace 'your_script_name' with the actual name of your script

class Txt_psql(unittest.TestCase):
    def setUp(self):
        # Set up a test database connection
        self.conn = psycopg2.connect(host="localhost", 
                                     database="test",
                                     user="test",
                                     password="12345678")
        self.cur = self.conn.cursor()

    def tearDown(self):
        # Close the database connection after each test
        self.cur.close()
        self.conn.close()

    def test_database_connection(self):
        # Test the database connection
        self.assertIsNotNone(self.conn, "Database connection not established")
        self.assertIsNotNone(self.cur, "Cursor not created")

    def test_table_content(self):
        # Test the contents of a PostgreSQL table
        table_name = "popc_c"  # Replace with the actual name of your table

        # Define the expected data that should be present in the table
        expected_data = (4, 0.0, 510.1346, 1412.682, 2934.032, 5416.659, 9374.972, 45937.52, 94062.55, 153750.2, 224999.5, 499999.0, 628677.0, 772057.4, 845590.1, 919118.8, 992646.5, 1066176.0, 1105514.0, 1140443.0, 1183820.0, 1224264.0, 1362135.0, 1507354.0, 1106616.0, 1240809.0, 1382350.0, 1801471.0, 1874998.0, 1946836.0, 2017281.0, 2089924.0, 2164823.0, 2242049.0, 2321666.0, 2403750.0, 2488367.0, 2575569.0, 2665476.0, 2758120.0, 2853594.0, 2982164.0, 3183599.0, 3398224.0, 3626874.0, 3870442.0, 4191339.0, 4589438.0, 5024772.0, 5466412.0, 6069292.0, 6676980.0, 7289522.0, 7906915.0, 9366252.0, 11701622.0, 13930355.0, 12849745.0, 22627774.0, 23474804.0, 24321734.0, 25168752.0, 26015684.0, 26862762.0, 27709598.0, 28556708.0, 29403698.0, 30250622.0, 31097660.0, 32007482.0, 33249836.0, 34168760.0, 35087796.0, 36006844.0, 36926004.0, 37844952.0)

        # Execute a SELECT query to retrieve the data from the table
        query = f"SELECT * FROM {table_name}"
        self.cur.execute(query)
        actual_data = self.cur.fetchall()
        # Assert that the actual data matches the expected data
        self.assertEqual(actual_data[3], expected_data, "Table content does not match expected data")


if __name__ == "__main__":
    unittest.main()
