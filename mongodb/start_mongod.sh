#!/bin/bash

if [ ! -f log/mongod.log ]
then
    touch log&mongod.log
fi

sudo ulimit -n 1000
mongod --dbpath dbpath/ --logpath log/mongod.log --fork
