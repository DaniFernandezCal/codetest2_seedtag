# codetest2_seedtag

Codetest seedtag by Daniel Fernández Calvo

# Followed approach

Using the tests provided by seedtag, I have followed an outside-inside approach, using these tests as an acceptance tests, adding unit tests when necessary.

# How to launch it

To launch the service two ways are provided:

- Launching the service using node directly
- Using docker

# Commands to launch service

- _npm i_ To install all dependencies
- _npm run start_ To run the service listening on port 8888
- In development process, _npm run dev_ could be used, this relaunch the server every time the code changes
- _npm run test-unit_ to launch unit test
- To launch the _acceptance_ tests, you must have the service up and run the bash script provided _./test.sh_

# Commands to launch service with Docker

- _docker build -t seedtagtest ._ to generate the docker image in local
- _docker-compose up -d_ to run the image previously generated

# Contact

Any question about the code or anything about this repo can be sent to _danifernandezcalv@gmail.com_. It has been a pleasure to have done this test
