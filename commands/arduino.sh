#!/bin/bash

apt-get -y -q install arduino

for user in `ls /home`
do
  echo "Adding $user to group dialout."
  usermod -a -G dialout "$user"
done

