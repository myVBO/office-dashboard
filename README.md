# Office Dashboard

This project is a lightweight dashboard intended to be displayed on a TV in the Ziftr office.

The goal is to give the software engineering team added visibility into relevant operational information. Although intended for use at Ziftr it may be useful to other software teams.

## Getting Started

1. Install node.js and npm 
2. Clone the Git repository
3. `cd office-dashboard`
4. `npm install`
5. `node bin/www`

### Installing on a Raspberry Pi

This is how we use the dashboard. We assume that you are running the default Debian based distribution from Noobs.

To install on a Raspberry Pi you will need to build the latest version of node from source since the repository does not contain a version new enough to run all the features.

Copied from the [node.js wiki] [1] for convinience:
```
sudo apt-get install python g++ make checkinstall fakeroot
src=$(mktemp -d) && cd $src
wget -N http://nodejs.org/dist/node-latest.tar.gz
tar xzvf node-latest.tar.gz && cd node-v*
./configure
sudo fakeroot checkinstall -y --install=no --pkgversion $(echo $(pwd) | sed -n -re's/.+node-v(.+)$/\1/p') make -j$(($(nproc)+1)) install
sudo dpkg -i node_*
```

Note that installing from source may take several hours on the Pi.

You will probably also want the window manager and X11 to start at boot and have the web browser start. You can do this from the configuration manager.

## Planned Features

* Cycle through multiple dashboards based on priority.
* Immediately switch to relevant dashboards in realtime when high-priority events happen (such as someone broke the build).

## Planned Dashboards

* Jenkins build status.
* Local weather.
* Google Calendar upcomming events.
* World time.
* Google Analytics traffic data.
* Notifications.
* Scrum task board and burndown chart.

[1]: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager "Installing node.js"
