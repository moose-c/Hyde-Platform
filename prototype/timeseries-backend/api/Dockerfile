FROM python:3.8

# set working directory, from where the app will be run
WORKDIR /app

# copy files from current directory to working directory
COPY . .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# some magic
CMD ["gunicorn", "api:app", "-b", "0.0.0.0:8000"]
