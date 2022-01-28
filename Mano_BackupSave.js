//=============================================================================
// Mano_BackupSave.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2022/01/28 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================


/*:
 * @plugindesc ゲームの進行に合わせて、セーブデータのバックアップを作成します。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @target MZ
 * 
 * @command BackupSave
 * @text バックアップ作成
 * @arg id
 * @text バックアップ番号
 * @desc 連番でなくても、内部では番号順に並びます。
 * @type number
 * @min 1
 * @default 1
 * 
 * @arg switchId
 * @text 多重呼び出し防止(空欄OK)
 * @desc スイッチを利用し、バックアップを1回だけ行うようにします。
 * @type switch
 * @default 0
 * 
 * @arg text
 * @text 名称
 * @desc 読み込み画面での表示に使います。
 * 
 * @command BackupScene
 * @desc バックアップ読み込み画面を開きます。
 * 
 * @param titleWidth
 * @text タイトルの幅
 * @type number
 * @default 180
 * 
 * @param titleFormat
 * @text タイトル書式
 * @type string
 * @default バックアップ %1
 * 
 * @param commandName
 * @text コマンド名
 * @default バックアップ読み込み
 * 
 * @param commandHeight
 * @type number
 * @default 44
 * 
 * 
 * @help
 * ゲームを進める際に1つしかセーブデータを作っておらず、
 * バグに巻き込まれた際に詰みになってしまうことがあります。
 * このプラグインは、通常のセーブファイルと別にデータを強制的に保存させます。
 * 
 * セーブデータの作成はプラグインコマンドで行います。
 * 
 * ■バックアップ作成のタイミング
 * 以下の条件を満たすタイミングで「バックアップ作成」を呼び出してください。
 * 理論上どのタイミングでも可能ですが、安全のためです。
 * ・1回しか呼び出されないタイミング(スイッチで自動化可能)
 * ・演出用のイベントが少ないマップ(セーブデータの大きさなどに影響)
 * ・イベントコマンドの最後の行(ゲームデータ更新による不具合回避・後述)
 * 新しい街に到着したタイミングは、これらの条件を満たしやすいです。
 * 
 * ■異なるセーブデータでバックアップを行った場合
 * 異なるセーブデータ・同じ場所でバックアップを行った場合、
 * 後で行ったバックアップで古い方を上書きします。
 * 
 * ■ゲームデータ更新の影響について
 * チャプターセーブを行った場合、早めにイベントを終了してください。
 * マップイベントの一番最後のコマンドとして配置することを推奨します。
 * 
 * バックアップセーブの直後に処理があると、
 * 読み込み後にその処理が実行されてしまいます。
 * これはゲームデータ更新の際に古い処理が実行される原因になります。
 * 
 * 
*/

//TODO:ゲーム終了時に勝手にバックアップを作る機能
//最後のセーブから一定時間経過していたら行う

(function(){
    'use strict'
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_BackupSave');
    function getCurrentScriptName(){
       const pluginName = decodeURIComponent(document.currentScript.src).match(/([^/]+)\.js$/);
       if(pluginName){ return pluginName[1];}
       return ''; 
    }
    /**
     * @param {String} officialFileName 
     */
    function TestFileNameValid(officialFileName){
        const currentFileName=getCurrentScriptName();
        if(officialFileName ===currentFileName){ return;}
        const message= `Do not rename the plugin file.<br>`+
                        `Current file name: ${currentFileName}<br>`+
                        `Original file name: ${officialFileName}<br>`+
                        `プラグインファイルの名前を変更してはいけません<br>`+
                        `現在のファイル名:`+ currentFileName+`<br>`+
                        `本来のファイル名:${officialFileName}`;
        throw new Error(message);
    }
    TestFileNameValid(PLUGIN_NAME);

    function getParam(){ return PluginManager.parameters('Mano_BackupSave');  }
    const setting = (function(){
        const param =getParam();
        const result ={
            commandHeight:Number(param.commandHeight||44),
            commandName :String(param.commandName),
            titleFormat:String(param.titleFormat),
            titleWidth:Number(param.titleWidth),
        };
        return result;
    })();
    const BACKUP_SYMBOL="BACKUP";
/**
 * 
 * @param {String} filename 
 * @param {*} obj 
 * @returns {Promise}
 */
function saveObject(filename,obj){
    return StorageManager.saveObject(filename,obj)
}
/**
 * @param {String} filename 
 * @returns {Promise}
 */
function loadObject(filename){
    return StorageManager.loadObject(filename);
}
/**
 * 
 * @returns {Number}
 */
function chapterId(c){
    if(c){
        return c.chapterId;
    }
    return 0;

}
class BackupInfo{
    constructor(){
        this.clear();
    }
    clear(){
        /**
         * @type {{helpText:String, chapterId:Number, info:rm.types.SaveFileInfo,}[]}
         */
         this._globalInfo=[];
    }
    sort(){
        this._globalInfo.sort( (a,b)=>{
            return  chapterId(a)- chapterId(b);
        } )
    }
    removeInvalidGlobalInfo(){
        //TODO:
        this._globalInfo = this._globalInfo.filter( (info)=>{
            if(info){
                const filename = this.makeFileName(info.chapterId);
                if(StorageManager.exists(filename)){
                    return true;
                }
            }
        })
    }
    isEmpty(){
        return this._globalInfo.length <=0;
    }

    refresh(){
        this.removeInvalidGlobalInfo();
        this.sort();
    }
    /**
     * 
     * @param {Number} chapterId 
     * @returns 
     */
    indexOf(chapterId){
        for(let i=0; i< this._globalInfo.length;++i){
            const info = this._globalInfo[i];
            if(info.chapterId===chapterId){
                return i;
            }
        }
        return -1;
    }
    separateChar(){
        if(StorageManager.isLocalMode()){
            return "\\";
        }
        return "."
    }


    /**
     * @param {Number} chapterId 
     * @param {String} helpText 
     * @param {rm.types.SaveFileInfo} info 
     */
    push(chapterId,helpText,info){
        const backupItem ={
            chapterId:chapterId,
            helpText:helpText,
            info:info,
        };
        const index= this.indexOf(chapterId);
        if(index >=0){
            this._globalInfo[index]=backupItem;
        }else{
            this._globalInfo.push(backupItem);
        }
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    itemAt(index){
        return this._globalInfo[index];
    }
    /**
     * @param {Number} index 
     * @returns {Promise}
     */
    loadBackup(index){
        const item= this.itemAt(index);
        const filename = this.makeFileName(item.chapterId);
        
        return StorageManager.loadObject(filename);
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    helpText(index){
        const item =this.itemAt(index);
        if(item){
            return item.helpText;
        }
        return "";
    }
    numItems(){
        return this._globalInfo.length;
    }
    infoFileName(){
        return this.backupFolderName() +"backupInfo";
    }
    executeSaveFileInfoList(){
        //this.makeDirectory();
        saveObject(this.infoFileName(),this._globalInfo);
    }
    executeLoadFileInfoList(){
        //起動時に1回だけ呼び出される
        const fileName =this.infoFileName();
        loadObject( fileName  )
            .then( (info)=>{
                this._globalInfo =info;
                this.refresh();
            })
            .catch(()=>{
                this.clear();
            })

    }
    /**
     * @param {Number} chapterId 
     * @returns 
     */
    makeFileName(chapterId){
        return `${this.backupFolderName()}backup${chapterId}`
    }
    backupFolderName(){
        return `backup` +this.separateChar()
    }
    makeDirectory(){
        if(StorageManager.isLocalMode()){
            const folderName =this.backupFolderName()
            const parentPath= StorageManager.fileDirectoryPath();
            StorageManager.fsMkdir( parentPath+ folderName);
        }
    }

    loadGloablInfo(){
        this.executeLoadFileInfoList();
        this.refresh();
    }
    /**
     * 
     * @param {Number} index 
     * @returns 
     */
    backupFileName(index){
        const item=this.itemAt(index);
        if(item){
            return `${this.backupFolderName()}chapter${item.chapterId}`;
        }
        return "";
    }
    /**
     * @param {Number} chapterId 
     * @param {String} chapterText
     */
    async saveChappter(chapterId,chapterText){
        $gameSystem.onBeforeSave();
        const contents = DataManager.makeSaveContents();
        const fileName=this.makeFileName(chapterId);
        this.makeDirectory();
        await saveObject(fileName,contents);
        const info=DataManager.makeSavefileInfo();
        this.push(chapterId,chapterText,info);
        this.executeSaveFileInfoList();
    }
}

class ChapterSaveManager_T{
    constructor(){
        this._globalInfoV2 = new BackupInfo();
    }
    loadGloablInfo(){
        return this._globalInfoV2.loadGloablInfo();
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    getSaveFileInfo(index){
        return this._globalInfoV2.itemAt(index);
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    chapterText(index){
        return this._globalInfoV2.helpText(index);
    }

    /**
     * @param {Number} chapterId 
     * @param {String} chapterText
     */
    saveChappter(chapterId,chapterText){
        this._globalInfoV2.saveChappter(chapterId,chapterText);
    }
    /**
     * @param {Number} index 
     */
    executeLoad(index){
        return this._globalInfoV2.loadBackup(index).then( (contents)=>{
            DataManager.createGameObjects();
            DataManager.extractSaveContents(contents);
            DataManager.correctDataErrors()
        } );
    }
    numItems(){
        return this._globalInfoV2.numItems();
    }
}

const backupManager=new ChapterSaveManager_T();
class Window_BackupFileLoad extends Window_SavefileList{

    helpText(){
        return backupManager.chapterText( this.index());
    }
    updateHelp(){
        const helpText =this.helpText();
        this._helpWindow.setText(helpText);
    }
    /**
     * 
     * @param {Number} chapterId 
     * @param {Number} x 
     * @param {Number} y 
     */
    drawFileTitle(chapterId,x,y){
        const text =setting.titleFormat.format(chapterId);
        this.drawText(text,x,y,setting.titleWidth);
    }
    drawItem(index){
        const rect= this.itemRectWithPadding(index);
        const info=backupManager.getSaveFileInfo(index);
        this.resetTextColor();
        this.changePaintOpacity(!!info);

        if(info){
            this.drawFileTitle(info.chapterId,rect.x,rect.y);
            this.drawContents(info.info,rect);
        }
    }
    maxItems(){
        return backupManager.numItems();
    }
}
class Scene_BackupLoad extends Scene_Load{
    /**
     * @returns {String}
     */
    helpWindowText(){
        return this._listWindow.helpText();
    }
    createListWindow(){
        //Windowと関連するセーブデータが専用なので、独自のクラスを作る
        const rect = this.listWindowRect();
        const wsf = new Window_BackupFileLoad(rect);
        wsf.select(0);
        wsf.setHelpWindow(this._helpWindow);
        wsf.setHandler("ok",this.onSavefileOk.bind(this));
        wsf.setHandler("cancel",this.popScene.bind(this));
        wsf.refresh();
        this.addWindow(wsf);
        this._listWindow =wsf;
    }
    backupFileName(){
        return "test";
    }
    onLoadSuccess(){
        super.onLoadSuccess();
        DataManager.selectSavefileForNewGame();
    }
    /**
     * @param {Number} index 
     */
    executeLoad(index){
        backupManager.executeLoad(index).
            then(  ()=>{ 
                this.onLoadSuccess();
            } ).
            catch( ()=>{ this.onLoadFailure();})
    }
    onSavefileOk(){
        if(this._listWindow.isCurrentItemEnabled()){
            const savefileIndex = this._listWindow.index();
            this.executeLoad(savefileIndex);
        }else{
            this.onLoadFailure();
        }
    }
}
const Scene_Boot_loadPlayerData=Scene_Boot.prototype.loadPlayerData;
Scene_Boot.prototype.loadPlayerData =function(){
    Scene_Boot_loadPlayerData.call(this);
    backupManager.loadGloablInfo();
};
const Window_TitleCommand_addCommand=Window_TitleCommand.prototype.addCommand;
Window_TitleCommand.prototype.addCommand =function(name,symbol,enabled){    
    Window_TitleCommand_addCommand.apply(this,arguments);
    if(symbol ==="continue"){
        this.addCommand(setting.commandName,BACKUP_SYMBOL);
        this.setHandler(BACKUP_SYMBOL, ()=>{ SceneManager.push(Scene_BackupLoad)})
    }
};
const Scene_Title_commandWindowRect=Scene_Title.prototype.commandWindowRect;
Scene_Title.prototype.commandWindowRect =function(){
    const rect=Scene_Title_commandWindowRect.call(this);
    rect.height +=setting.commandHeight;
    return rect;
};

PluginManager.registerCommand(PLUGIN_NAME,"BackupScene",()=>{
    SceneManager.push(Scene_BackupLoad)
})
PluginManager.registerCommand(PLUGIN_NAME,"BackupSave",(arg)=>{
    const switchId =Number(arg.switchId);
    if($gameSwitches.value(switchId)){
        return;
    }
    const chapterId =Number(arg.id);
    $gameSwitches.setValue(switchId,true);
    backupManager.saveChappter(chapterId,arg.text);
});

}())
