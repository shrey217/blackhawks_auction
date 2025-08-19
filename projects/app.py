from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return redirect(url_for('dashboard'))

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/auction')
def auction():
    return render_template('auction_table.html')

@app.route('/auction_table')
def auction_table():
    return render_template('auction_table.html')

@app.route('/pref')
def pref():
    return render_template('pref.html')

@app.route('/preferences')
def preferences():
    return render_template('pref.html')

@app.route('/teams')
def teams():
    return render_template('teams_view.html')

@app.route('/teams_view')
def teams_view():
    return render_template('teams_view.html')
if __name__ == '__main__':
    app.run(debug=True)
