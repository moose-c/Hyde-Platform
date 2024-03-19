## Setup Flask application
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import os

app = Flask(__name__)
api = Api(app)
CORS(app)  # Mitigate CORS error

# Database configuration
password = os.environ["POSTGRES_PASSWORD"]
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"postgresql://postgres:{password}@timeseries-database/timeseries"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


def get_safe_columns():
    """Fetch and validate column names from a given table to ensure they're safe for dynamic queries."""
    query = db.session.execute(
        text(
            "SELECT column_name FROM information_schema.columns WHERE table_name ='popc'"
        )
    )
    return [row[0] for row in query.fetchall()]


def construct_query(indicator, columns, isocode):
    """Constructs a safe SQL query string using validated columns."""
    safe_columns = ", ".join(
        [f'"{column}"' for column in columns if column in get_safe_columns()]
    )
    if not safe_columns:  # No valid columns found, return None or handle as appropriate
        return (None,)
    query_str = text(f"SELECT {safe_columns} FROM {indicator} WHERE iso_code={isocode}")
    return query_str


# query and return timeseries of interest
class Timeseries(Resource):
    def get(self, indicator, isocode, start, end):
        # This assumes 'indicator' is a valid table name. You must validate this!
        if indicator not in [
            "popc",
            "popd",
            "urbc",
            "rurc",
            "uopp",
            "cropland",
            "grazing",
            "pasture",
            "rangeland",
            "conv_rangeland",
            "ir_rice",
            "rf_rice",
            "tot_rice",
            "ir_norice",
            "rf_norice",
            "tot_irri",
            "tot_rainfed",
        ]:  # Replace with actual table names
            return {"error": "Invalid table name"}, 400

        columns = get_safe_columns()
        # Filter columns by start and end year, assuming they are part of the column names
        filtered_columns = [col for col in columns if start <= col <= end]

        query = construct_query(indicator, filtered_columns, isocode)
        if query is None:
            return {"error": "No valid columns found for query"}, 400

        result = db.session.execute(query).fetchall()

        temp_list = [dict(row._mapping) for row in result]

        result_list = [[value for value in row.values()] for row in temp_list]

        return result_list


# Test class to see whether the API is setup correctly
class Test(Resource):
    def get(self):
        return {"message": "Setup is correct!"}


api.add_resource(Test, "/test")
api.add_resource(
    Timeseries,
    "/api/txt/<string:indicator>/<string:isocode>/<string:start>/<string:end>",
)

if __name__ == "__main__":
    app.run(debug=True)
