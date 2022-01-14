//=============================================================================
// Mano_InputConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022-2022 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 0.9.0 2021/01/14
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================



/*:
 * @plugindesc ゲームオーバー時にタイトルに戻さず、特殊処理を行います。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_InputConfig.js
 * 
 * @target MZ
 * 
 * @command SetRespawn
 * @text 復活地点の設定
 * @desc 現在の位置を全滅時の復活位置として設定します。
 * 
 * @param recoverTarget
 * @desc 回復対象
 * @type select
 * @option 全員
 * @value 0
 * @option IDの小さいアクター1人
 * @value 1
 * @option 先頭の1人
 * @value 2
 * @default 0
 *  
 * @param mapId
 * @type variable
 * @desc 復帰用のマップが無い場合、復帰は行わずにタイトルへ戻ります。
 * @default 0
 * @param x
 * @type variable
 * @default 0
 * 
 * @param y
 * @type variable
 * @default 0
 * 
 * @param direction
 * @text 向き
 * @type variable
 * @default 0
 * 
 * 
 * @param callbackEvent
 * @desc ゲームオーバーから復帰した際に、
 * このイベントを呼び出します。
 * @type common_event
 * @default 0
 * 
 * @help
 * ドラクエとかポケモンのような、全滅してもタイトルに戻らないゲームオーバー。
 * 復帰の際、アクターを全回復させて再開します。
 * 
 * 復帰場所はプラグインコマンドで設定します。
 * 通常の変数を利用して復帰位置を決めているので、手動設定も可能です。
 * 復帰時にコモンイベントを一つ呼び出すことができます。
 * 
 * ■復帰処理
 * 初期設定では、復活地点へ移動し、コモンイベントを呼び出すのみです。
 * 
 * ■注意点
 * プレイヤーが任意のタイミングで場所移動することになるため、
 * イベントの位置などが問題になる可能性があります。
 * スイッチや変数の状態で進行不能になる可能性があるので、
 * 気をつけてください。
 * バグの例についてはFF6学会・52回全滅バグなどを参考にすると良いと思います。
 * 
*/

(function(){
    'use strict'

    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_GameoverEX');
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

    class Respawn{
        constructor(mapId,x,y,direction,callbackEvent){
            this._mapId=mapId;
            this._x =x;
            this._y =y;
            this._direction=direction;
            this._callbackEvent=callbackEvent;

        }
        onGameOver(){
            this.loadPosition();
            this.callEvent();
            SceneManager.goto(Scene_Map);
        }
        isPositionValid(){
            const mapId = $gameVariables.value(this._mapId) || 0;
            return !!($dataMapInfos[mapId]);
        }
        savePostion(){
            $gameVariables.setValue(this._mapId,$gameMap.mapId());
            $gameVariables.setValue(this._x,$gamePlayer.x);
            $gameVariables.setValue(this._y,$gamePlayer.y);
            $gameVariables.setValue(this._direction,$gamePlayer.direction());
        }
        createTranferParam(){
            return {
                mapId: $gameVariables.value(this._mapId),
                x:$gameVariables.value(this._x),
                y:$gameVariables.value(this._y),
                direction :$gameVariables.value(this._direction),
            }
        }
        loadPosition(){
            const param =this.createTranferParam();
            $gamePlayer.reserveTransfer(param.mapId,param.x,param.y,param.direction,0);

        }
        callEvent(){
            $gameTemp.reserveCommonEvent(this._callbackEvent);

        }
    }
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    const setting = (function(){
        const param =getParam();
        const respawn = new Respawn(
            Number(param.mapId),
            Number(param.x),
            Number(param.y),
            Number(param.direction),
            Number(param.callbackEvent)
        )
        const result ={
            recoverTargets:Number(0),
            respawn:respawn,
        };
        return result;
    })();
    /**
     * @param {Game_Party} party 
     */
    function recoverTargets(party){
        const members = party.members();
        if(members.length <=0){
            return [];
        }

        if(setting.recoverTargets===0){
            return members;
        }
        const top =members[0];
        if(setting.recoverTargets===2){
            return [top];
        }
        if(setting.recoverTargets===1){
            let target =top;
            for (const iterator of members) {
                if(iterator.actorId() < target.actorId()){
                    target = iterator;    
                }
            }
            return [target];
        }
        //数値が不正な場合、とりあえず全員回復させる
        return members;

    }
const Scene_Gameover_gotoTitle=Scene_Gameover.prototype.gotoTitle;
Scene_Gameover.prototype.gotoTitle =function(){
    this;
    if(setting.respawn.isPositionValid()){
        const targets = recoverTargets($gameParty);
        for (const iterator of targets) {
            iterator.recoverAll();
        }
        setting.respawn.onGameOver();
    }else{
        Scene_Gameover_gotoTitle.call(this);
    }
};


PluginManager.registerCommand(PLUGIN_NAME,"SetRespawn",()=>{
    setting.respawn.savePostion();
})
}())
