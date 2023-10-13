//========================================================================
// Mano_MessageSkipHighspeed.js
// -----------------------------------------------------------------------
// Copyright (c) 2023-2023 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------
// Version
// ver 1.0.0 2023/10/13
// -----------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//========================================================================

/*:
 * @plugindesc 決定＋取り消しが同時長押しされている間、高速スキップします
 * @author しぐれん
 * 
 * @target MZ
 * @orderAfter MOG_TitleSplashScreen
 * 
 * @param waitTime
 * @text スキップ中の文字表示時間
 * @type number
 * @default 2
 * 
 * @help
 * メッセージの高速スキップを実装します。
 * 操作は決定と取り消しの同時長押しです。
 * 
 * 本来はメッセージ表示完了後に10フレームの待機が生じます。
 * このプラグインは待機時間を短縮することで高速スキップを実現しています。
 * 
 * 
*/

(function(){
    'use strict';
/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_MessageSkipHighspeed');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }

const setting = (function(){
    const param =getParam();
    const result ={
        waittime:Number(param.waitTime),
    };
    return result;
})();

const Window_Message_onEndOfText =Window_Message.prototype.onEndOfText;
Window_Message.prototype.onEndOfText =function(){
    Window_Message_onEndOfText.call(this);
    if(Input.isPressed("ok") && Input.isPressed("cancel")){
        if(Input.isLongPressed("ok") && Input.isLongPressed("cancel")){
            this._waitCount = Math.min(this._waitCount,setting.waittime);
        }
    }
};

}())

