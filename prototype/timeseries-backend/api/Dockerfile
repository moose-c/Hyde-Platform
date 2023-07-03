FROM python:3.8

# set working directory, from where the app will be run
WORKDIR /usr/src/app

# copy files from current directory to working directory
COPY . .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# run command
CMD [ "python", "./api.py" ]

