# Hyde Platform
This repository contains the code that was used to create the Hyde Platform, used to display the data from the HYDE (History Database of the Global Environment)

## Structure
In the **documentation** folder information on all steps of the process can be found. The -raw markdown file contain a diary style, more utilitation rough notes on the process, whereas the other files contain a more reader friendly walkthrough of the process. 

## Setup
### Set password
First, set desired password from command line as **environmental variable** using:
`sudo apt install gedit`
`sudo gedit /etc/environment` 
and add to the bottom of the resulting file the following line:
`POSTGRES_PASSWORD='[postgres password]'`
and finally reboot the system to make the password available.