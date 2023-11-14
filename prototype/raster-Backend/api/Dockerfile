FROM python:3.8

# copy files from current directory to working directory
COPY requirements.txt /app/requirements.txt

WORKDIR /app

# install dependencies
RUN pip install -r requirements.txt

# set working directory, from where the app will be run
COPY . /app

# Run the flask API on a gunicorn WSGI server, this is for production
CMD ["gunicorn", "api:app", "--workers", "2", "-b", "0.0.0.0:8100"]
