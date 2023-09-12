FROM python:3.8

WORKDIR /temp

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY utils_ncwms.py .

CMD ["python", "./utils_ncwms.py"]

