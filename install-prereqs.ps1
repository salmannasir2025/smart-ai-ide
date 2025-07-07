# Windows PowerShell script to install Python, Node.js, npm, and dependencies

Write-Output "Installing prerequisites..."

# Check Python installation
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Output "Python not found. Installing Python 3.11..."
    Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.11.6/python-3.11.6-amd64.exe" -OutFile "python-installer.exe"
    Start-Process -FilePath ".\python-installer.exe" -ArgumentList "/quiet InstallAllUsers=1 PrependPath=1" -Wait
    Remove-Item "python-installer.exe"
} else {
    Write-Output "Python is already installed."
}

# Check Node.js installation
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Output "Node.js not found. Installing Node.js LTS..."
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v18.20.2/node-v18.20.2-x64.msi" -OutFile "node-installer.msi"
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i node-installer.msi /quiet" -Wait
    Remove-Item "node-installer.msi"
} else {
    Write-Output "Node.js is already installed."
}

# Upgrade pip and install Python packages
Write-Output "Installing Python packages..."
python -m pip install --upgrade pip
pip install -r backend/requirements.txt

# Install frontend dependencies
Write-Output "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install Electron dependencies
Write-Output "Installing Electron dependencies..."
cd electron
npm install
cd ..

Write-Output "All prerequisites installed."
