FROM python:3.8

WORKDIR /usr/src


ADD requirements.txt .
RUN pip install -r requirements.txt

ADD . .

