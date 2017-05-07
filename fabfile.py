from os import path, chdir
from fabric.api import run, local, cd, put, env
from fabric.operations import prompt, get, sudo

env.use_ssh_config = True
here = path.abspath(path.dirname(__file__))
chdir(here)

DIR_REMOTE = "/server/webserver/frontend"


# Set default hosts
if not env.hosts:
    env.hosts = ["ghoust"]


def clean():
    """ Delete local src/dist directory """
    local("rm -rf src/dist")


def build():
    local("npm run build")


def upload():
    """ Uploads source to raspberrypi """
    # sudo("rw")
    sudo("rm -rf /tmp/dist")
    put("src/dist", "/tmp/")
    sudo("rm -rf %s" % DIR_REMOTE)
    sudo("mv /tmp/dist %s" % DIR_REMOTE)
