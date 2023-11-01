FROM python:3.8

WORKDIR /temp

COPY requirements.txt ./

# Do this before copying utils_ncwms.py, since then don't execute each time a small change is made to python file.
RUN pip install --no-cache-dir -r requirements.txt

COPY utils_ncwms.py .

CMD ["python", "./utils_ncwms.py"]

