FROM        ubuntu:latest
MAINTAINER  trickbooter <paul@trickbooter.com>

# RUN         apt-get update && apt-get install -y redis-server

# Install.
RUN \
  apt-get update -y && \
  apt-get install -y redis-server

RUN sed 's/^daemonize yes/daemonize no/' -i /etc/redis/redis.conf && \
   sed 's/^bind 127.0.0.1/bind 0.0.0.0/' -i /etc/redis/redis.conf && \
   sed 's/^# unixsocket /unixsocket /' -i /etc/redis/redis.conf && \
   sed 's/^# unixsocketperm 755/unixsocketperm 777/' -i /etc/redis/redis.conf && \
   sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf && \
   sed '/^logfile/d' -i /etc/redis/redis.conf

RUN mkdir -p -m 0755 /run/redis && \
   mkdir -p -m 0755 /data

# Expose ports.
EXPOSE 6379

# Define mountable directories.
VOLUME ["/data"]
VOLUME ["/run/redis"]

# Start redis
CMD ["/usr/bin/redis-server", "/etc/redis/redis.conf"]
