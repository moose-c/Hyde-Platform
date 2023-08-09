# Start from the following base image:
FROM python:3.8 
# Choose working directory and copy all necessary files
WORKDIR /usr/src/app
# copy
COPY . .
# install dependencies
RUN pip install --no-cache-dir -r requirements.txt
# expose relevant port
EXPOSE 5000
# run python command
CMD ["python", "./app.py"]