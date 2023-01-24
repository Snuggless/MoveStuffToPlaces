# MoveStuffToPlaces
**THIS REPO IS NOT MAINTAINED** - Use at own risk

This is designed to move files from a folder into individual sub-folders with a related name.

by default this application is verbose.

## Requirements
 - NodeJS 16.0

## Installation
After downloading and extracting, simily run then included batch file to install the required node packages.
Alternitivly you can use:

    npm install

## Usage
Before running the aplication it is important to set the config file with the folder and filetypes to search for. (See configuration section)

To run the program run:

    npm start

OR

    node index.js

## Configuration
The default **config.json** can be found at; ~/config.json
| Option | Type | Default | Notes |
|--|--|--|--|
| BaseFolder | String | Empty | Path to a folder containing files to move |
| FileExtensions | Array | .mp3, .mp4 | Contains objects with the property 'Extension' (typeof string: fileextension) |
| AlwaysMoveToSubDir | Bool | false | By default, the program will not move a file to a sub-folder if it is the only item contained within. |
| MaxDepth | Number | 0 | Maximum depth the program will go to find files. Set 0 for Unlimited. |
