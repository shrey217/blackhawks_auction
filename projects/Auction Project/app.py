from flask import Flask, render_template
import os

app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), 'static'),
    template_folder=os.path.join(os.path.dirname(__file__), 'templates')
)

@app.route('/')
def index():
    return render_template('auction.html')

@app.route('/auction')
def auction():
    return render_template('auction.html')

@app.route('/preferences')
def preferences():
    return render_template('preferences.html')

@app.route('/budgeting')
def budgeting():
    return render_template('budgeting.html')

@app.route('/teams')
def teams():
    return render_template('teams.html')

@app.route('/home_page')
def home_page():
    return render_template('home_page.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)
