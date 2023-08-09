# Netcdf
Hmm it is indeed probably more efficient to make 1 large NetCDF. But the question remains how to query this. Geoserver can be used to display NetCDF files: https://docs.geoserver.org/stable/en/user/extensions/netcdf/netcdf.html

But ncWMS is also promising https://stackoverflow.com/questions/25393611/netcdf-format-to-openlayers-map I got this working.
https://github.com/Reading-eScience-Centre/ncwms/blob/master/docs/02-installation.md
For now the standalone version to just use it. Go to website, Insert netcdf as specified in Config and view with the interface.

https://stackoverflow.com/questions/21833255/is-there-a-way-to-read-a-local-netcdf-file-from-a-web-application
https://github.com/cheminfo/netcdfjs
https://github.com/Reading-eScience-Centre/ncwms/blob/master/docs/02-installation.md

Learning:
WMS (Web Map Service) server: 
WMS Client: Software/application that interacts with WMS Server to retrieve and display map data.

## Geoserver
geoserver: https://docs.geoserver.org/latest/en/user/installation/linux.html
6) env variable: export GEOSERVER_HOME=/usr/share/geoserver
start: 
`cd /usr/share/geoserver/bin`
`./startup.sh`
navitgate to: `http://localhost:8080/geoserver`
* [ ] login with username: admin, password: tijdelijk_wachtwoord

netcdf upload:
https://www.goohttps://docs.geoserver.org/latest/en/gle.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj08KCI-LH_AhWQ2aQKHbXBDO8QFnoECAoQAQ&url=https%3A%2F%2Fgis.stackexchange.com%2Fquestions%2F342942%2Fhow-to-install-netcdf-plugin-to-geoserver&usg=AOvVaw21FreFoAlgEyY9-evxoyR0
within geoserver:
- create workspace.
- stores -> netcdf plugin > select workspace, [SetName],, brose to file
- save, on layers page navigate to publish. All set, only Dimensions interesting, now something random selected. Changing this changes it to the latest being selected. [] nearest close value seems to help

displaying can happen, is now blank. I think it shows the first entry, for which this is true. overlaying with an existing map (which is what eventually will be done) causes it to not matter that ocean and areas where output is 0 are the same.
If changing years is even possible is very unclear.
just adding &TIME=1000& in url works, =1001, =1100 don't work. 2000 works. Currious.

Investigating requests in geoserver.
Demos:  WCS request builder Step by step WCS GetCoverage request builder. Net possible to read netCDF data. Could be since this is just an unusual format and tools ae not updated, rather than not supported.
All of these things work with xml requests. HTTP requests I kind of understand now, what are XML?

`<wcs:CoverageDescription xsi:schemaLocation="http://www.opengis.net/wcs http://localhost:8080/geoserver/schemas/wcs/1.0.0/describeCoverage.xsd" version="1.0.0">
<wcs:CoverageOffering>
<wcs:description>Generated from NetCDF</wcs:description>
<wcs:name>test:irrigated_rice</wcs:name>
<wcs:label>irrigated_rice</wcs:label>
<wcs:lonLatEnvelope srsName="urn:ogc:def:crs:OGC:1.3:CRS84">
<gml:pos>-179.99999489666106 -90.00000252664061</gml:pos>
<gml:pos>179.9998575675595 89.9999262326953</gml:pos>
<gml:timePosition>7994-02-21T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4021-12-27T00:00:00.000Z</gml:timePosition>
</wcs:lonLatEnvelope>
<wcs:keywords>
<wcs:keyword>irrigated_rice</wcs:keyword>
<wcs:keyword>WCS</wcs:keyword>
<wcs:keyword>NetCDF</wcs:keyword>
</wcs:keywords>
<wcs:domainSet>
<wcs:spatialDomain>
<gml:EnvelopeWithTimePeriod srsName="EPSG:4326">
<gml:pos>-179.99999489666106 -90.00000252664061</gml:pos>
<gml:pos>179.9998575675595 89.9999262326953</gml:pos>
<gml:timePosition>7994-02-21T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4021-12-27T00:00:00.000Z</gml:timePosition>
</gml:EnvelopeWithTimePeriod>
<gml:RectifiedGrid dimension="2" srsName="EPSG:4326">
<gml:limits>
<gml:GridEnvelope>
<gml:low>0 0</gml:low>
<gml:high>4319 2159</gml:high>
</gml:GridEnvelope>
</gml:limits>
<gml:axisName>x</gml:axisName>
<gml:axisName>y</gml:axisName>
<gml:origin>
<gml:pos>-179.9583282470703 89.95825958251953</gml:pos>
</gml:origin>
<gml:offsetVector>0.08333329918153254 0.0</gml:offsetVector>
<gml:offsetVector>0.0 -0.0833333003515444</gml:offsetVector>
</gml:RectifiedGrid>
</wcs:spatialDomain>
<wcs:temporalDomain>
<gml:timePosition>0001-08-31T00:00:00.000Z</gml:timePosition>
<gml:timePosition>0999-05-08T00:00:00.000Z</gml:timePosition>
<gml:timePosition>1000-12-24T00:00:00.000Z</gml:timePosition>
<gml:timePosition>1998-01-13T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2000-05-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2100-04-07T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2200-03-14T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2300-02-18T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2400-01-25T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2499-12-31T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2599-12-07T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2699-11-13T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2799-10-20T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2899-09-25T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2998-09-20T00:00:00.000Z</gml:timePosition>
<gml:timePosition>2999-09-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3099-08-08T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3199-07-15T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3299-06-20T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3399-05-27T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3499-05-03T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3599-04-09T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3699-03-15T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3709-03-13T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3719-03-11T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3729-03-08T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3739-03-06T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3749-03-03T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3759-03-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3769-02-26T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3779-02-24T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3789-02-21T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3799-02-19T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3809-02-17T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3819-02-15T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3829-02-12T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3839-02-10T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3849-02-07T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3859-02-05T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3869-02-02T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3879-01-31T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3889-01-28T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3899-01-26T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3909-01-24T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3919-01-22T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3929-01-19T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3939-01-17T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3949-01-14T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3950-01-14T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3951-01-14T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3952-01-14T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3953-01-13T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3954-01-13T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3955-01-13T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3956-01-13T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3957-01-12T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3958-01-12T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3959-01-12T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3960-01-12T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3961-01-11T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3962-01-11T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3963-01-11T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3964-01-11T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3965-01-10T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3966-01-10T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3967-01-10T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3968-01-10T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3969-01-09T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3970-01-09T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3971-01-09T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3972-01-09T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3973-01-08T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3974-01-08T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3975-01-08T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3976-01-08T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3977-01-07T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3978-01-07T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3979-01-07T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3980-01-07T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3981-01-06T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3982-01-06T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3983-01-06T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3984-01-06T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3985-01-05T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3986-01-05T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3987-01-05T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3988-01-05T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3989-01-04T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3990-01-04T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3991-01-04T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3992-01-04T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3993-01-03T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3994-01-03T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3995-01-03T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3996-01-03T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3997-01-02T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3997-05-27T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3998-01-02T00:00:00.000Z</gml:timePosition>
<gml:timePosition>3999-01-02T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4000-01-02T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4001-01-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4002-01-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4003-01-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4004-01-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4004-12-31T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4005-12-31T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4006-12-31T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4007-12-31T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4008-12-30T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4009-12-30T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4010-12-30T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4011-12-30T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4012-12-29T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4013-12-29T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4014-12-29T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4015-12-29T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4016-12-28T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4017-12-28T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4018-12-28T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4019-12-28T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4020-12-27T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4021-12-27T00:00:00.000Z</gml:timePosition>
<gml:timePosition>4996-02-01T00:00:00.000Z</gml:timePosition>
<gml:timePosition>5996-10-09T00:00:00.000Z</gml:timePosition>
<gml:timePosition>6995-06-16T00:00:00.000Z</gml:timePosition>
<gml:timePosition>7994-02-21T00:00:00.000Z</gml:timePosition>
</wcs:temporalDomain>
</wcs:domainSet>
<wcs:rangeSet>
<wcs:RangeSet>
<wcs:name>irrigated_rice</wcs:name>
<wcs:label>irrigated_rice</wcs:label>
<wcs:axisDescription>
<wcs:AxisDescription>
<wcs:name>Band</wcs:name>
<wcs:label>Band</wcs:label>
<wcs:values>
<wcs:singleValue>1</wcs:singleValue>
</wcs:values>
</wcs:AxisDescription>
</wcs:axisDescription>
</wcs:RangeSet>
</wcs:rangeSet>
<wcs:supportedCRSs>
<wcs:requestResponseCRSs>EPSG:4326</wcs:requestResponseCRSs>
</wcs:supportedCRSs>
<wcs:supportedFormats nativeFormat="NetCDF">
<wcs:formats>GeoTIFF</wcs:formats>
<wcs:formats>GIF</wcs:formats>
<wcs:formats>JPEG</wcs:formats>
<wcs:formats>PNG</wcs:formats>
<wcs:formats>TIFF</wcs:formats>
</wcs:supportedFormats>
<wcs:supportedInterpolations default="nearest neighbor">
<wcs:interpolationMethod>nearest neighbor</wcs:interpolationMethod>
<wcs:interpolationMethod>bilinear</wcs:interpolationMethod>
<wcs:interpolationMethod>bicubic</wcs:interpolationMethod>
</wcs:supportedInterpolations>
</wcs:CoverageOffering>
</wcs:CoverageDescription>`
Services also interesting, these are the services that are provided by geoserver. WMS for example is Web Map Service, for serving maps. The thing remains, you can this work with netCDF.


# June 13th
ma 3/4e uur:
Continuation of ncwms, this seems most promising for serving NetCDF data.
now standalone version [installed](https://github.com/Reading-eScience-Centre/ncwms/blob/master/docs/02-installation.md)
start with: 
`cd Downloads
java -jar ncWMS2-standalone.jar
`
Now at http://localhost:8080/
All config in: home\.ncWMS2
Post netcdf automatically on this server using an API, but what is this and how does it work specifically.
## APIs 
[What are APIs and how to interact with them via python?](https://medium.com/quick-code/absolute-beginners-guide-to-slaying-apis-using-python-7b380dc82236)
API = Application Programming Interface
**requestor** to **system/service/website** via **API** delivers **response**.
Usually delivers as JSON.
In python, see tools/API_interaction.py.
request.text or request.status_code. Status code = 200, all OK, status code 404 page not found.

`import requests:
request = requests.get('http://localhost:8080/ncWMS2/admin/datasetStatus')
request.text`
more readable:
`request_json = request.json()
request_json`	
Query parameters, directly:
`request = requests.get(https://api.datamuse.com/words?rel_rhy=jingle)`, or
`parameter = {"key_word":"value"}
request = request.get('[url]', parameter)`
Great.
`request = requests.get('http://localhost:8080/ncWMS2/admin/datasetStatus', params="irrigated_rice")`
Does not work, I think the servlet needs to be set up.

## servlet
Java programs run inside a container for web development. servlets are **Responsible for accepting a request, processing and responding**. Runs under Servlet Container (*Tomcat*, JBOss or Glassfish), if server receives request -> container -> servlet. See [this](https://github.com/Reading-eScience-Centre/ncwms/blob/master/docs/02-installation.md#security), and google.
servlet is just a program written in Java dat runs on a (J2EE-)container on a server. Uses services provided by webcontainer, such as (HTTP) communication with a client.

### Tomcat:
https://www.youtube.com/watch?v=c7qZAL1bHi0
Apache Tomcat Server (Java). Servlet Container. Free Open source web server and java servlet container. Used to run Java webapplications. Each webapp has to be executed in a server. To run Tomcat, java has to be installed. 
By default, uses port 8080. (change in server.xml file).
#### Setup:
Each version of Tomcat is supported for any stable Java release that meets the requirements of the final column in the table above. I think ncWMS iuses java version 11. Yes.
[install](https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-10-on-ubuntu-20-04): 
- create new user group (groups of users, all with save privilages): 
- useradd -m -d /opt/tomcat -U -s /bin/false tomcat
- sudo chown -R tomcat:tomcat /opt/tomcat/
- sudo chmod -R u+x /opt/tomcat/bin
- Passwords stored again in tomcat_manager, tomcat_admin environmental variables. No these are removed: print with env, 
- Create systemd service (keep tomcat running in background), by creating service in /etc/systemd/system/tomcat.service, see file
	- java location: /usr/lib/jvm/java-1.11.0-openjdk-amd64
	- reload system: sudo systemctl daemon-reload
	- start tomcat: sudo systemctl start tomcat
	- Allow tomcat to start at system startup: sudo systemctl enable tomcat
- Access Web Interface:
	- allow traffic: sudo ufw allow 8080 (tomcat runs at port 8080, this opens that so to speak)
	- Access at `http://serverip:8080`, for us: http://localhost:8080/
	- (reload with: sudo /opt/tomcat/bin/shutdown.sh, sudo /opt/tomcat/bin/startup.sh)

It runs now! And should be open for trafic. Let's see:
#### Find IP adress
https://itsfoss.com/check-ip-address-ubuntu/
Internet Protocol Adress, label assigned to each device connected to a computer network. Serves for identification and localization. Is *unique* within network, allowing communication between all connected devices. 2 types:
- Public, communicate over internet, like physical adress
- private: local network to assign each device a unique private IP within subnetwork. used locally without exposing the public IP
also IPv4 (classic format) & IPv6 protocols (longer to accompany more devices)
- `ip a`: 145.107.105.230
Can be accessed locally with: http://145.107.105.230:8080 But this is unsecured.

#### Add security
Perhaps evt, also wants a registered domain name.
https://www.digitalocean.com/community/tutorials/how-to-secure-tomcat-10-with-apache-or-nginx-on-ubuntu-20-04

### Change port
sudo gedit /opt/tomcat/conf/server.xml
8080 -> 2420
new url: http://[ip]:0420

### ncWMS
https://github.com/marceloandrioni/configure_tomcat_stack

To deploy: download .war file, go to tomcat -> manager app -> Deploy war file.
**Does not work!**
**works now magically when restarting system**
**Does not work, cannot sign into admin role**
Potentially usefull: https://www.researchgate.net/figure/Outline-architecture-of-the-ncWMS-software-From-bottom-to-top-1-Data-and-metadata-are_fig2_257550077

### Try to do it for another project..
https://husbch.medium.com/mini-project-deploying-java-application-with-tomcat-bd7d96bfcc7

ideeen uit bovenstaande: Constroleer pom.xml voor tomcat versie en java versie

curl: transfer data from a server using any of supported protocol. 
chgrp: change group ownership
chmod: change directory permissions

# 13 June 2023
I had a thought: also the communication between the timeseries vs raster components and the website is going to be very different. Therefore it is probably easier to start again with the psql <-> website communication.
## PSQL website communication
We have the postgres user which has timeseries as a database 
create timeseries db: 
`sudo -i -u postgres`
`createdb -O postgres timeseries`

updated python txt_psql script to automatically clean the database before inserting the new data.

[start server](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04) using this.
`sudo apt -y install gnome`
`sudo gedit /etc/postgresql/15/main/postgresql.conf`
change listen_adresses line: `listen_addresses = '*'`
`sudo gedit /etc/postgresql/15/main/pg_hba.conf`
Here still wrong.
add to bottom new connection policy: 
`host	timeseries	all		0.0.0.0/0		md5`
reload postgresql:
`systemctl restart postgresql`
sytem listening to 5432 port reserved for postgreSQL: `ss -nlt | grep 5432`
Now, connection on remote machine should be possible:

psql -h 
