sudo curl https://dlcdn.apache.org/tomcat/tomcat-8/v8.5.93/bin/apache-tomcat-8.5.93.tar.gz | sudo tar -xz -C /usr/bin
sudo wget https://github.com/Reading-eScience-Centre/ncwms/releases/download/ncwms-2.5.2/ncWMS2.war -O $CATALINA_HOME/webapps/ncWMS2.war
sudo gedit $CATALINA_HOME/conf/tomcat-users.xml