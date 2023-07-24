FROM python:3.8

# set working directory, from where the app will be run
WORKDIR /app/timeseries/backend

# copy files from current directory to working directory
COPY . .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the flask API on a gunicorn WSGI server, this is for production
CMD ["gunicorn", "api:app", "--workers", "2", "-b", "0.0.0.0:8000"]
