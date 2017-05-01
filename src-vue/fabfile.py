"""
FRONTENT DEPLOYMENT
"""
from os import path, chdir as _chdir

from fabric.api import run, local, lcd, cd, put, env
from fabric.operations import sudo  # prompt, get

env.use_ssh_config = True
here = path.abspath(path.dirname(__file__))
_chdir(here)

# Default hosts
if not env.hosts:
    env.hosts = ["jyn"]

DIR_REMOTE = "/server/websites/python-boilerplate.com/subdomains/test/htdocs/"

def build():
    local("npm run build")

def deploy(skipBuild=False):
    if not skipBuild:
        build()

    # Pack
    with lcd("dist"):
        local("tar -czf /tmp/pybp-frontend.tar.gz *")

    # Upload
    put("/tmp/pybp-frontend.tar.gz", "/tmp/pybp-frontend.tar.gz")

    # Extract
    with cd(DIR_REMOTE):
        sudo("tar -xf /tmp/pybp-frontend.tar.gz", user='www-data')
        run("rm -f /tmp/pybp-frontend.tar.gz")

    # Cleanup
    local("rm -f /tmp/pybp-frontend.tar.gz")
