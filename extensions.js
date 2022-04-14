var fs = require("fs");
var classes = require("./classes");
var config = require("./config.json")

var Config = new classes.Config(config);

function GetConfig(){
    return Config;
}

function GetDirsInDir(path){
    return fs.readdirSync(path, { withFileTypes: true })
            .filter(dir => dir.isDirectory());
}

function GetFilesInDir(path){
    return fs.readdirSync(path, { withFileTypes: true })
            .filter(dir => dir.isFile());
}

function MakeDir(path){
    try{
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    }
    catch(e){
        classes.SystemLog.LogError(e);
        process.exit(1);
    }
}

function MoveFile(file){
    fs.rename(file.FilePath(), file.NewPathToFile(), (e) => {
        if(err){
            classes.SystemLog.LogError(e);
            process.exit(1);
        }else{
            classes.SystemLog.LogMove(file.FilePath(), file.NewPathToFile());
        }
    });
}

exports.GetConfig = GetConfig;
exports.GetDirsInDir = GetDirsInDir;
exports.GetFilesInDir = GetFilesInDir;
exports.MakeDir = MakeDir;
exports.MoveFile = MoveFile;