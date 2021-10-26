FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /teaspils
COPY requirements.txt /teaspils/requirements.txt
RUN apt-get update && apt-get install -y netcat
RUN pip install -r requirements.txt
COPY . /teaspils/
EXPOSE 80
EXPOSE 3306