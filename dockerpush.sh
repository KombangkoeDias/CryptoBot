docker-compose build

docker tag botclient:latest kombangkoedias/kbdbot:botclient
docker push kombangkoedias/kbdbot:botclient

docker tag botlogic:latest kombangkoedias/kbdbot:botlogic
docker push kombangkoedias/kbdbot:botlogic

docker tag botprice:latest kombangkoedias/kbdbot:botprice
docker push kombangkoedias/kbdbot:botprice