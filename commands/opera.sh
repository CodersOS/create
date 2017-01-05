#!/bin/bash
# from http://askubuntu.com/a/475542
#
# How to install Opera on Ubuntu
# ------------------------------

# From the terminal, add a pointer to the opera stable sources:
sh -c 'echo "deb http://deb.opera.com/opera/ stable non-free" >> /etc/apt/sources.list.d/opera.list'

# Install the key:
sh -c 'wget -O - http://deb.opera.com/archive.key | apt-key add -'

# Update repo:
apt-get update

# Install Opera:
apt-get -y install opera


