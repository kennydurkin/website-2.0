from flask import Flask, jsonify, render_template, request
import requests, json

app = Flask(__name__)
app.config["DEBUG"] = False

website_info = None
projects = None
jobs = None

@app.route("/")
def home():
  website_info = get_website_info()
  website_info['current'] = 'home'
  return render_template("index.html", info=website_info)

def get_website_info():
  global website_info
  if not website_info:
    with open('data/website_info.json') as f:
      website_info = json.loads(f.read())
  return website_info

@app.route("/home")
def index():
  website_info = get_website_info()
  website_info['current'] = 'home'
  return render_template("index.html", info=website_info)

@app.route("/about")
def about():
  website_info = get_website_info()
  website_info['current'] = 'about'
  return render_template("about.html", info=website_info)

@app.route("/projects")
def build():
  # TODO: change the way project information sourced
  website_info = get_website_info()
  website_info['current'] = 'projects'
  projects = get_projects()
  return render_template("projects.html", info=website_info, projects=projects)

def get_projects():
  global projects
  if not projects:
    with open('data/projects.json') as f:
      projects = json.loads(f.read())
  return projects

@app.route("/experience")
def experience():
  website_info = get_website_info()
  website_info['current'] = 'experience'
  workplaces = get_jobs()
  return render_template("experience.html", info=website_info, workplaces=workplaces)

def get_jobs():
  global jobs
  if not jobs:
    with open('data/jobs.json') as f:
      jobs = json.loads(f.read())
  return jobs

@app.route("/extras")
def extras():
  website_info = get_website_info()
  website_info['current'] = 'extras'
  return render_template("extras.html", info=website_info)

@app.errorhandler(404)
def page_not_found(error):
  website_info = get_website_info()
  website_info['current'] = '404'
  return render_template('404.html', info=website_info), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8080)