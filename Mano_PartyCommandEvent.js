//@ts-check
//=============================================================================
// Mano_InputConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 1.0.1 2022/03/02
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc バトル中のパーティコマンドに任意の要素を追加します。
 * @author しぐれん
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_PartyCommandEvent.js
 * 
 * @target MZ
 * 
 * @param commandList
 * @type struct<PartyCommand>[]
 * @default []
 * 
 * @help
 * 戦闘中のパーティコマンドからコモンイベントを呼び出します。
 * シーン遷移系のコマンドを呼び出すと不具合が発生する可能性があります。
 * 
 * Call a common event from a party command in battle.
 * If you call a scene transition command, a problem may occur.
 * 
 * ■更新履歴/UpdateLogs
 * 2022/04/11 ver1.1 Added English commentary
 * 2022/03/02 ver1.0 公開
 * 
*/


/*~struct~PartyCommand:
  * @param name
  * @text コマンド名/CommandName
  * @type string
  * @default コマンド
  * 
  * @param eventId
  * @text 呼び出すイベント/event
  * @type common_event
  * @default 0
  * 
  * @param enableSwtich
  * @text 有効化スイッチ/EnableSwitch
  * @desc 指定されたスイッチがONの場合のみ選択可能。
  * Selectable only when the specified switch is ON.
  * @type switch
  * @default 0
  * 
  * @param addSwtich
  * @text 表示スイッチ/ShowSwitch
  * @desc 指定されたスイッチがONの場合のみ表示。
  * Displayed only when the specified switch is ON.
  * @type switch
  * @default 0
  * 
  * @param helpText
  * @text ヘルプ文章/helpText
  * @desc 画面上部に文章を表示します。
  * The text is displayed at the top of the screen.
  * @type string
  * @default
  * 
  * @param partyCommandVisible
  * @desc イベント実行中のコマンドウィンドウ表示。
  * Command window display during event execution.
  * @type boolean
  * @default true
  * 
  * @param actorStatusVisible
  * @desc イベント実行中のステータスウィンドウ表示。
  * Status window display during event execution.
  * @type boolean
  * @default true
  * 
*/

(function(){
    `use strict`;
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_PartyCommandEvent');
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    const SYMBOL_STRING="PTCMD";
    

    class SwitchCasset{
        /**
         * @param {Number} switchId 
         */
        constructor(switchId){
            this._switchId=switchId;
        }
        isEnabled(){
            if(this._switchId >0){
                return $gameSwitches.value(this._switchId);
            }
            return true;
        }
    }


    class PartyCommand{
        /**
         * @param {String} name
         * @param {Number} eventId
         * @param {Number} addSwitch
         * @param {Number} enableSwitch
         * @param {Boolean} partyCommandWidnow
         * @param {Boolean} actorStatusWinodw
         * @param {String} helpText
         */
        constructor(name,eventId,addSwitch,enableSwitch,partyCommandWidnow,actorStatusWinodw,helpText){
            this._name =name;
            this._eventId=eventId;

            this._addSwtich= new SwitchCasset(addSwitch);
            this._enableSwitch=new SwitchCasset(enableSwitch);
            this._partyComamandVisible=partyCommandWidnow;
            this._actorStatusWindow=actorStatusWinodw;

            this._helpText=helpText;
        }
        /**
         * @param {String} objText 
         * @returns 
         */
        static create(objText){
            const obj=JSON.parse(objText);
            const name =obj.name;
            const eventId =Number(obj.eventId);
            const addSwitch =Number(obj.addSwitch);
            const enableSwitch=Number(obj.enableSwitch);

            const partyCommandWidnow =(obj.partyCommandVisible==="true");
            const actorStatusWinodw =(obj.actorStatusVisible==="true");
            const helpText = String(obj.helpText||"");
            return new PartyCommand(name,eventId,addSwitch,enableSwitch,partyCommandWidnow,actorStatusWinodw,helpText);
        }
        partyCommandVisible(){
            return this._partyComamandVisible;
        }
        actorStatusVisible(){
            return this._actorStatusWindow;
        }
        eventId(){
            return this._eventId;
        }
        name(){
            return this._name;
        }
        //TODO:コマンド用画像設定を作った時に何かする
        symbol(){
            return `${this._eventId}:${SYMBOL_STRING}`;
        }
        helpText(){
            return this._helpText;
        }
        isEnabled(){
            if(this._enableSwitch){
                return this._enableSwitch.isEnabled();
            }
            return true;
        }
        canAdd(){
            if(this._addSwtich){
                return this._addSwtich.isEnabled();
            }
            return true;
        }
    }

    class PartyCommandManager_T{
        /**
         * 
         * @param {Number} eventId 
         */
        find(eventId) {
            return this._list.get(eventId);
        }
        /**
         * @param {Map<Number,PartyCommand>} partyCommandList 
         */
        constructor(partyCommandList){
            this._list=partyCommandList;
            this._inter=null;
        }

        commandList(){
            return this._list.values();
        }
        /**
         * @param {Number} eventId 
         * @param {()=>void} onEndEvent
         */
        startEvent(eventId,onEndEvent){

            const eventCode =$dataCommonEvents[eventId];
            if(eventCode){
                //実行用のインタプリタを作成
                this._inter = new Game_Interpreter(0);
                this._inter.setup(eventCode.list,0);
                //デストラクタ用の処理を設定
                this._endEventFunction=onEndEvent;
            }
        }
        update(){
            if(this._inter){
                this._inter.update();
                if(!this._inter.isRunning()){
                    this.onEndEvent();
                    this._inter=null;
                }
            }
        }
        onEndEvent(){
            if(this._endEventFunction){
                this._endEventFunction();
            }
            this._endEventFunction=null;
        }        
    }
const PartyCommandManager = (()=>{

    const param =getParam();
    /**
     * @type {String[]}
     */
    const commandListText =JSON.parse(param.commandList);
    /**
     * @type {Map<Number,PartyCommand>}
     */
    const table =new Map();
    for (const iterator of commandListText) {
        const cmd = PartyCommand.create(iterator);
        table.set(cmd.eventId(),cmd);        
    }
    const manager= new PartyCommandManager_T(
        table
    );
    return manager;
})();
const Window_PartyCommand_addCommand=Window_PartyCommand.prototype.addCommand;
Window_PartyCommand.prototype.addCommand =function(name,symbol,enabled,ext){

    if(symbol==="escape"){
        for (const iterator of PartyCommandManager.commandList()) {
            if(iterator.canAdd()){
                this.addCommand(iterator.name(),SYMBOL_STRING,iterator.isEnabled(),iterator.eventId());
            }
        }
    }
    Window_PartyCommand_addCommand.apply(this,arguments);
}

const Scene_Battle_createPartyCommandWindow=Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow =function(){
    Scene_Battle_createPartyCommandWindow.call(this);
    //@ts-ignore
    this._partyCommandWindow.setHandler(SYMBOL_STRING,this.onExtraPartyCommandOk.bind(this));
};

const Scene_Battle_update=Scene_Battle.prototype.update;
Scene_Battle.prototype.update =function(){
    PartyCommandManager.update();
    Scene_Battle_update.call(this);
};

//@ts-ignore
Scene_Battle.prototype.onExtraPartyCommandOk =function(){
    /**
     * @type {Number}
     */
    const eventId = this._partyCommandWindow.currentExt();

    const cmd = PartyCommandManager.find(eventId);
    if(!cmd){
        this._partyCommandWindow.activate();
        return;
    }

    const help=cmd.helpText();
    if(help){
        this._helpWindow.setText(help);
        this._helpWindow.visible = true;
    }
    this._partyCommandWindow.visible = cmd.partyCommandVisible();
    this._statusWindow.visible = cmd.actorStatusVisible();
    PartyCommandManager.startEvent(eventId,()=>{
        this._helpWindow.clear();
        this._helpWindow.visible = false;
        this._statusWindow.visible = true;

        this._partyCommandWindow.visible = true;
        this._partyCommandWindow.activate();
        this._partyCommandWindow.open();
    });
    
};

}())
