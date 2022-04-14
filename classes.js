class File{
    constructor(parent, file){
        this.BasePath = parent;
        this.FileName = file;

        let ext = file.split(".").pop();
        this.FileExt = new FileExtension(ext);

        SystemLog.LogFile(parent + "\\" + file);
    }

    FilePath(){
        return this.BasePath + "\\" + this.FileName;
    }

    FileWithNoExtension(){
        return this.FileName.replace(/\.[^/.]+$/, "");
    }

    NewPathToDir(){
        let fwne = this.FileName.replace(/\.[^/.]+$/, "");
        fwne = fwne.replace("/[^\w\s]/gi, ''");
        return this.BasePath + "\\" + fwne + "\\"
    }

    NewPathToFile(){
        let fwne = this.FileName.replace(/\.[^/.]+$/, "");
        fwne = fwne.replace("/[^\w\s]/gi, ''");
        return this.BasePath + "\\" + fwne + "\\" + this.FileName
    }
}

class Directory{
    constructor(path){
        this.FileList = new Array();
        this.DirectoryList = new Array();
        if(path.length > 0){
            this.BasePath = path;
        }else{
            SystemLog.LogError("Directory not found");
            process.exit(1);
        }
        SystemLog.LogDir(path);
    }
}

class FileExtension{
    constructor(extension){
        this.Extension = extension;
    }
}

class Config{
    constructor(json){
        SystemLog.LogConfig();
        this.BaseFolder = json.BaseFolder;
        this.AlwaysMoveToSubDir = json.AlwaysMoveToSubDir;
        this.MaxDepth = json.MaxDepth;
        this.FileExtensions = new Array();
        json.FileExtensions.forEach(element => {
            let ext = new FileExtension(element.Extension);
            this.FileExtensions.push(ext);
        });
    }
}

class SystemLog{
    static LogPlatform(){
        console.log("Platform not supported");
    }

    static LogStart(){
        console.log("START: Application is starting");
    }

    static LogConfig(){
        console.log("CONFIG: Config loading");
    }

    static LogAction(path){
        console.log("ACTION: " + path);
    }

    static LogDir(path){
        console.log("DIR: " + path);
    }

    static LogFile(path){
        console.log("FILE: " + path);
    }

    static LogMove(oldPath, newPath){
        console.log("MOVE: " + oldPath + " > " + newPath);
    }

    static LogIgnore(path){
        console.log("IGNORE: " + path);
    }

    static LogError(err){
        console.log("ERROR: " + err);
    }
}

exports.File = File;
exports.Directory = Directory;
exports.Config = Config;
exports.FileExtension = FileExtension;
exports.SystemLog = SystemLog;