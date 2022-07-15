 //=============================================================================
// Mano_WindowSkinChange.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022-2022 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
// ----------------------------------------------------------------------------
//=============================================================================


/*:
 * @plugindesc ウィンドウに使う画像を切り換えます。
 * @author しぐれん
 * @url https://github.com/Sigureya/RPGmakerMZ/blob/master/Mano_WindowSkinChange.js
 * 
 * @target MZ
 * 
 * @command ChangeSkin
 * @text ウィンドウスキンの一時変更
 * @desc この方法で変更した場合、セーブ時に変更が破棄されます。
 * @arg image
 * @type file
 * @dir img/system/
 * @default Window
 * 
 * @command ResetSkin
 * @text 通常のウィンドウスキンに戻す
 * 
 * @command RefreshSkin
 * @text スキン設定の更新/RefreshSkin
 * @desc スキン設定変数の値に応じてスキンを変更します。
 * 
 * @command ChangeSkinVariable
 * @text ウィンドウスキンの変更(変数同期モード)
 * @desc スキン番号を指定して変更します。
 * 同時に変数を書き換えます。
 * @arg id
 * @type number
 * @text スキン番号/SkinId
 * @desc 0が指定された場合、初期スキンになります。
 * @default 0
 * 
 * @param skinList
 * @text スキンリスト/SkinList
 * @desc スキンを変数指定する場合などで使います。
 * @type struct<SkinStruct>[]
 * @default []
 * 
 * @param skinVariable
 * @text スキン指定変数/SkinVariable
 * @desc セーブデータ読み込み時に指定変数の値を確認し、
 * スキンリストを参照して画像を変更します。
 * @type variable
 * @default 0
 * 
 * 
 * 
 * @help
 * ウィンドウスキンを変更することができます。
 * 変更を保持する場合、変数設定を行ってください。
 * プラグインコマンドを呼び出すだけで動きます。
 * 
*/
/*~struct~SkinStruct:
 * @param filename
 * @text 画像/image
 * @type file
 * @dir img/system/
 * @default Window
 * 
 * @param id
 * @text 番号/ID
 * @min 1
 * @default 1
*/
(function(){
    'use strict';
/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_WindowSkinChange');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
const DEFAULT_FILENAME ="Window";


class SkinManager_T{
    /**
     * 
     * @param {Map<number,string>} map 
     * @param {number} skinVariableId 
     */
    constructor(map,skinVariableId){
        this._map =map;
        this._variableId =skinVariableId;
        this._needsReload=false;
    }
    /**
     * @param {number} skinId 
     */
    changeSkinVariable(skinId){
        $gameVariables.setValue(this._variableId,skinId||0);
        this.refresh();
    }
    /**
     * @param {number} id 
     * @param {string} imageName 
     */
    addSkin(id,imageName){
        this._map.set(id,imageName);
    }
    reset(){
        $gameVariables.setValue(this._variableId,0);
        this.setFileName(DEFAULT_FILENAME);
    }
    getValue(){
        return $gameVariables.value(this._variableId);
    }
    refresh(){
        const value = this.getValue();
        const filename = this._map.get(value);
        this.setFileName(filename);
    }
    onSkinReload(){
        this._needsReload=false;
    }
    /**
     * @param {string} filename 
     */
    setFileName(filename){
        this._fileName =filename||DEFAULT_FILENAME;
        this._needsReload=true;
    }
    getFileName(){
        return this._fileName;
    }
    loadSkin(){
        const bitmap= ImageManager.loadSystem(this._fileName);
        return bitmap;
    }
    needsReload(){
        return this._needsReload;
    }
}

const SkinManager=(function(){
    const param =getParam();
    const skinVariableId =Number(param.skinVariable||0);
    /**
     * @type {string[]}
     */
    const skinList =JSON.parse(param.skinList);

    /**
     * @type {Map<number,string>}
     */
    const map = new Map();
    for (const iterator of skinList) {
        const obj =JSON.parse(iterator);
        map.set( Number(obj.id),String(obj.filename));        
    }


    return new SkinManager_T(map,skinVariableId);
})();

const Window_Message_updateLoading=Window_Message.prototype.updateLoading;
Window_Message.prototype.updateLoading =function(){
    const result= Window_Message_updateLoading.call(this);
    if(SkinManager.needsReload()){
        const skin=SkinManager.loadSkin();
        for (const iterator of [this,this._nameBoxWindow,this._choiceListWindow]) {
            iterator.windowskin =skin;
        }
        SkinManager.onSkinReload();
    }
    return result&& this.windowskin.isReady();
};

const DataManager_extractSaveContents =DataManager.extractSaveContents;
DataManager.extractSaveContents=function(arg){
    DataManager_extractSaveContents.call(this,arg);
    SkinManager.refresh();
};
PluginManager.registerCommand(PLUGIN_NAME,"ChangeSkin",(arg)=>{
    const skin = String(arg.image);
    SkinManager.setFileName(skin);
    SkinManager.loadSkin();
});
PluginManager.registerCommand(PLUGIN_NAME,"ChangeSkinVariable",(arg)=>{
    const id = Number(arg.id);
    SkinManager.changeSkinVariable(id);
});


PluginManager.registerCommand(PLUGIN_NAME,"ResetSkin",()=>{
    SkinManager.reset();
});

PluginManager.registerCommand(PLUGIN_NAME,"RefreshSkin",()=>{
    SkinManager.refresh();
})
}());
