#!/bin/bash

# Install Xvfb and other required dependencies
sudo apt-get update
sudo apt-get install -y xvfb x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps

# Start the application
xvfb-run --auto-servernum --server-args='-screen 0 1024x768x24' electron .
