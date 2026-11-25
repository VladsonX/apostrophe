### Build

docker build --platform linux/amd64 -t apostrophe-studio .
docker save apostrophe-studio | gzip > apostrophe-studio.tar.gz

### Run

docker run -d -p 80:80 apostrophe-studio

### Upload docker image

scp -i apostrophekeypair.pem apostrophe-studio.tar.gz ec2-user@ec2-54-165-53-22.compute-1.amazonaws.com:/home/ec2-user
docker load < apostrophe-studio.tar.gz