var os = require("os");
var extensions = require("./extensions");
var classes = require("./classes");

if(os.platform != "win32"){
    classes.SystemLog.LogPlatform();
    process.exit(1);
}

classes.SystemLog.LogStart();
var baseDir = new classes.Directory(extensions.GetConfig().BaseFolder);

if(extensions.GetConfig().FileExtensions.length < 1){
    classes.SystemLog.LogError("File extensions must be provided");
    process.exit(1);
}

function Main(directory, depth){
    classes.SystemLog.LogAction(directory.BasePath);
    extensions.GetDirsInDir(directory.BasePath).forEach(element => {
        let dir = new classes.Directory(directory.BasePath + "\\" + element.name);
        directory.DirectoryList.push(dir);
        if(extensions.GetConfig().MaxDepth >= 0 && depth < extensions.GetConfig().MaxDepth){
            Main(dir.BasePath, depth + 1);
        }
    });

    var fileArray =  extensions.GetFilesInDir(directory.BasePath);
    fileArray.forEach(element => {
        if(fileArray.length < 2 && extensions.GetConfig().AlwaysMoveToSubDir == false){
            continue;
        }

        let file = new classes.File(directory.BasePath, element.name);
        directory.FileList.push(file);
        extensions.MakeDir(file.NewPathToDir());
        extensions.MoveFile(file);
    });
}

Main(baseDir, 0);