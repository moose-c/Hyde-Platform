## Installing docker
https://computingforgeeks.com/how-to-install-docker-on-fedora/
sudo dnf -y install dnf-plugins-core

Fedora 38:
sudo tee /etc/yum.repos.d/docker-ce.repo<<EOF
[docker-ce-stable]
name=Docker CE Stable - \$basearch
baseurl=https://download.docker.com/linux/fedora/37/\$basearch/stable
enabled=1
gpgcheck=1
gpgkey=https://download.docker.com/linux/fedora/gpg
EOF

Fedora 34: 
sudo tee /etc/yum.repos.d/docker-ce.repo<<EOF
[docker-ce-stable]
name=Docker CE Stable - \$basearch
baseurl=https://download.docker.com/linux/fedora/34/\$basearch/stable
enabled=1
gpgcheck=1
gpgkey=https://download.docker.com/linux/fedora/gpg
EOF

sudo dnf makecache -y
sudo dnf install docker-ce docker-ce-cli containerd.io -y
-> **Removed podman docker**
sudo systemctl enable --now docker

systemctl status docker

sudo usermod -aG docker $(whoami)
newgrp docker

docker version

docker pull alpine

docker run -it --rm alpine /bin/sh

apk update

exit

curl -s https://api.github.com/repos/docker/compose/releases/latest \
  | grep browser_download_url \
  | grep docker-compose-linux-x86_64 \
  | cut -d '"' -f 4 \
  | wget -qi -

## Connect to server:
hydeprod.geo.uu.nl
caste001

scp -r ./timeseries-backend/ caste001@hydeprod.geo.uu.nl:/data/caste001/Hyde-Platform-Backend
scp .env caste001@hydeprod.geo.uu.nl:/data/caste001/Hyde-Platform-Backend

netcdf location:
/data/klein012/hyde/output/hyde33_c7_base_mrt2023/NetCDF

txt location:
/data/klein012/hyde/output/hyde33_c7_base_mrt2023/txt