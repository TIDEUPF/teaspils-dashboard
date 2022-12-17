FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /teaspils
COPY requirements.txt /teaspils/requirements.txt
RUN apt-get update && apt-get install -y netcat
RUN apt-get install jpegoptim
RUN pip install -r requirements.txt
COPY . /teaspils/
RUN chmod +x wait.sh
EXPOSE 3306
