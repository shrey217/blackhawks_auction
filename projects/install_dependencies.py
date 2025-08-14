#!/usr/bin/env python3
"""
Dependency Installation Script
This script will install all required Python packages for the KSG project.
Run this script on a new computer to set up the environment.
"""

import subprocess
import sys
import os

def install_package(package):
    """Install a single package using pip."""
    try:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"✓ Successfully installed {package}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Failed to install {package}: {e}")
        return False

def install_from_requirements():
    """Install all packages from requirements.txt."""
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found!")
        print("Please make sure you're running this script from the project root directory.")
        return False
    
    print("🚀 Starting dependency installation...")
    print("=" * 50)
    
    # Read requirements.txt
    with open("requirements.txt", "r") as f:
        requirements = [line.strip() for line in f if line.strip() and not line.startswith("#")]
    
    print(f"Found {len(requirements)} packages to install:")
    for req in requirements:
        print(f"  - {req}")
    print()
    
    # Install each package
    success_count = 0
    failed_packages = []
    
    for requirement in requirements:
        if install_package(requirement):
            success_count += 1
        else:
            failed_packages.append(requirement)
        print()
    
    # Summary
    print("=" * 50)
    print("📊 Installation Summary:")
    print(f"✓ Successfully installed: {success_count}/{len(requirements)} packages")
    
    if failed_packages:
        print(f"✗ Failed packages: {', '.join(failed_packages)}")
        print("\nTo install failed packages manually, run:")
        for pkg in failed_packages:
            print(f"  pip install {pkg}")
        return False
    else:
        print("🎉 All packages installed successfully!")
        print("\nYou can now run your Flask applications:")
        print("  - Poker Auction: cd 'Poker Auction' && python app.py")
        print("  - Volleyball Auction: cd 'Volleyball Auction' && python app.py")
        return True

def main():
    """Main function."""
    print("🔧 KSG Project Dependency Installer")
    print("=" * 50)
    
    # Check if pip is available
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "--version"])
    except subprocess.CalledProcessError:
        print("❌ pip is not available!")
        print("Please install pip first or ensure Python is properly installed.")
        return
    
    # Install dependencies
    success = install_from_requirements()
    
    if success:
        print("\n✅ Setup complete! You're ready to run the applications.")
    else:
        print("\n⚠️  Setup completed with some errors. Check the output above.")

if __name__ == "__main__":
    main()
