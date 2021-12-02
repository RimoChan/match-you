#!/bin/bash

# backup old config

mkdir -p ~/matchyoubackup
cd ~/matchyoubackup

mkdir -p var/www
mkdir -p var/lib
mkdir -p usr/lib
mkdir -p etc

cp -rp /etc/nginx        etc       || true
cp -rp /etc/mysql*       etc       || true
cp -rp /etc/php*         etc       || true
cp -rp /etc/apache2*     etc       || true
mv /var/www/html     var/www       || true
mv /var/lib/mysql    var/lib       || true
mv /usr/lib/python3  usr/lib       || true
mv ~/go              go            || true

# mess up the the development environment
# LNMP python3 golang C/C++
apt purge -y nginx* apache2* mysql* mariadb* php* \
             python3* \
             golang* \
             build-essential* *-dev gcc g++
