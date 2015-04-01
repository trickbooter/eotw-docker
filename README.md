# eotw-docker
Scripts for the Edge of the Web conference


## boot2docker
```bash
boot2docker up
$(boot2docker shellinit)
# note in order to get these examples working on boot2docker you need to nat port 6379 on the virtualbox boot2docker image.
```

## my-first-docker
```bash
cd ~/dev/repo/eotw-docker/my-first-docker
docker build -t my-first-docker .
# early exit
docker run my-first-docker
# interactive
docker run -it my-first-docker
# running docker containers
docker ps
# all containers
docker ps -a
# docker images
docker images
```

## redis
```bash
cd ~/dev/repo/eotw-docker/redis
docker build -t redis .
docker run -d --name redis -p 6379:6379 -v /Users/paul/tmp:/data redis
telnet localhost 6379
# look at the port and volume mappings
docker inspect redis
# look at the logs
docker logs redis
```

## redis with nodes on Digital Ocean

these notes won't work for anyone else. These droplets are now destroyed.

```bash
# add key
ssh-add ~/.ssh/digitalocean

# Run Redis (pu:128.199.66.71 pr:10.130.143.155)
ssh root@128.199.66.71
docker run -d --name redis -p 10.130.143.155:6379:6379 trickbooter/redis

# Run node-r (pu: 128.199.78.238 pr: 10.130.143.157)
ssh root@128.199.78.238
docker run -d --name node-r -p 8080:8080
                   -e REDIS_IP=10.130.143.155
                   trickbooter/node-r

# run node-w (pu: 128.199.72.148 pr: 10.130.143.158)
ssh root@128.199.72.148
docker run -d --name node-w
                   -e REDIS_IP=10.130.143.155
                   trickbooter/node-w
