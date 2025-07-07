#!/bin/bash
# Linux bash script to install Python3, Node.js, npm, and dependencies

echo "Installing prerequisites..."

# Update and install Python3, pip
sudo apt update
sudo apt install -y python3 python3-pip curl

# Install Node.js 18 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Upgrade pip and install Python packages
python3 -m pip install --upgrade pip
python3 -m pip install -r backend/requirements.txt

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install Electron dependencies
cd electron
npm install
cd ..

echo "All prerequisites installed."
