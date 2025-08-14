# KSG Project Setup Guide

This guide will help you set up the KSG project on a new computer.

## Prerequisites

- **Python 3.7 or higher** installed on your system
- **pip** (Python package installer) - usually comes with Python
- **Node.js** (optional, for Firebase client-side features)

## Quick Setup

### Option 1: Automatic Setup (Recommended)

#### Windows Users
1. Double-click `install_dependencies.bat`
2. Follow the prompts
3. Wait for installation to complete

#### Unix/Linux/Mac Users
1. Open terminal in the project directory
2. Make the script executable: `chmod +x install_dependencies.sh`
3. Run: `./install_dependencies.sh`

### Option 2: Manual Setup

1. Open terminal/command prompt in the project directory
2. Run: `python install_dependencies.py`

### Option 3: Direct pip installation

```bash
pip install -r requirements.txt
```

## What Gets Installed

The following Python packages will be installed:

- **Flask** (3.0.0) - Web framework for the applications
- **firebase-admin** (6.4.0) - Firebase server-side SDK
- **python-dotenv** (1.0.0) - Environment variable management
- **requests** (2.31.0) - HTTP library for API calls

## Running the Applications

After installation, you can run either application:

### Poker Auction
```bash
cd "Poker Auction"
python app.py
```
The app will be available at: http://localhost:5000

### Volleyball Auction
```bash
cd "Volleyball Auction"
python app.py
```
The app will be available at: http://localhost:8000

## Troubleshooting

### Common Issues

1. **"pip not found" error**
   - Ensure Python is properly installed
   - Try using `python -m pip` instead of just `pip`

2. **Permission errors (Unix/Linux/Mac)**
   - Use `sudo python3 install_dependencies.py` or
   - Install packages for current user: `pip install --user -r requirements.txt`

3. **Firebase connection issues**
   - Ensure you have the `serviceAccountKey.json` file in the respective project directory
   - Check that the Firebase project is properly configured

### Manual Package Installation

If automatic installation fails, install packages individually:

```bash
pip install Flask==3.0.0
pip install firebase-admin==6.4.0
pip install python-dotenv==1.0.0
pip install requests==2.31.0
```

## Project Structure

```
KSG/
├── requirements.txt              # Python dependencies
├── install_dependencies.py      # Python installation script
├── install_dependencies.bat     # Windows batch file
├── install_dependencies.sh      # Unix/Linux/Mac shell script
├── Poker Auction/               # Poker auction application
├── Volleyball Auction/          # Volleyball auction application
└── README.md                    # This file
```

## Support

If you encounter any issues during setup, please check:
1. Python version: `python --version`
2. pip version: `pip --version`
3. Ensure you're running the scripts from the project root directory

For additional help, refer to the error messages displayed during installation.
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
