#!/bin/bash

sudo ulimit -n 1000
mongod --dbpath dbpath/ --logpath log/mongod.log --fork
