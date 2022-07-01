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
 * 
 * @target MZ
 * 
 * @command ChangeSkin
 * @text ウィンドウスキンの変更
 * @arg image
 * @type file
 * @dir img/system/
 * @default Window
 * 
 * @command ResetSkin
 * @text 通常のウィンドウスキンに戻す
 * 
 * @help
 * ウィンドウスキンを変更することができます。
 * 変更したウィンドウはゲームを終了するとリセットされます。
 * イベント実行中にセーブしてゲームを終了した場合、
 * 変更はリセットされます。
 * (対応するように書くこともできますが、需要不明に付き未実装)
 * 
*/

(function(){
    'use strict';
/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_WindowSkinChange');

class SkinManager_T{
    constructor(){
        this.reset();
    }
    reset(){
        this.setFileName("Window");
        this._needsReload =true;
    }
    onSkinReload(){
        this._needsReload=false;
    }
    /**
     * @param {string} filename 
     */
    setFileName(filename){
        this._fileName =filename;
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

const SkinManager=new SkinManager_T();

const Window_Message_updateLoading=Window_Message.prototype.updateLoading;
Window_Message.prototype.updateLoading =function(){
    const result= Window_Message_updateLoading.call(this);
    if(SkinManager.needsReload()){
        this.windowskin = SkinManager.loadSkin();
        SkinManager.onSkinReload();
    }
    return result&& this.windowskin.isReady();
};


PluginManager.registerCommand(PLUGIN_NAME,"ChangeSkin",(arg)=>{
    const skin = String(arg.image);
    SkinManager.setFileName(skin);
    SkinManager.loadSkin();
});
PluginManager.registerCommand(PLUGIN_NAME,"ResetSkin",(arg)=>{
    SkinManager.reset();
});

}());
