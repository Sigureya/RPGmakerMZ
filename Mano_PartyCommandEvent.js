/*:
 * @plugindesc バトル中のパーティコマンドに任意の要素を追加します。
 * @author しぐれん
 * 
 * @target MZ
 * 
 * @param commandList
 * @type struct<PartyCommand>[]
 * @default []
 * 
 * @help
 * パーティコマンドからコモンイベントを呼び出します。
*/


/*~struct~PartyCommand:
  * @param name
  * @type string
  * @default コマンド
  * 
  * @param eventId
  * @type common_event
  * @default 0
  * 
  * @param enableSwtich
  * @desc 有効化スイッチ
  * @desc 指定されたスイッチがONの場合のみ選択可能。
  * @default 0
  * 
  * @param addSwtich
  * @desc コマンド表示スイッチ
  * @desc 指定されたスイッチがONの場合のみ表示。
  * @default 0
*/

(function(){
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_PartyCommandEvent');
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    

    class SwitchCasset{
        /**
         * @param {Number} switchId 
         */
        constructor(switchId){
            this._switchId=switchId;
        }
        static createFromNumber(switchId){
            return new SwitchCasset(switchId)
        }
        isEnabled(){
            if(this._switchId >0){
                return $gameSwitches.value(this._switchId);
            }
            return true;
        }
    }
const SYMBOL_STRING="UZ_EX";

    class PartyCommand{
        /**
         * @param {String} name 
         * @param {Number} eventId 
         * @param {Number} addSwitch 
         * @param {Number} enableSwitch 
         */
        constructor(name,eventId,addSwitch,enableSwitch){
            this._name =name;
            this._eventId=eventId;

            this._addSwtich= SwitchCasset.createFromNumber(addSwitch);
            this._enableSwitch=SwitchCasset.createFromNumber(enableSwitch);
        }
        static create(objText){
            const obj=JSON.parse(objText);
            const name =obj.name;
            const eventId =Number(obj.eventId);
            const addSwitch =Number(obj.addSwitch);
            const enableSwitch=Number(obj.enableSwitch);
            return new PartyCommand(name,eventId,addSwitch,enableSwitch);
        }
        get eventId(){
            return this._eventId;
        }
        name(){
            return this._name;
        }
        symbol(){
            return SYMBOL_STRING;
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
         * @param {PartyCommand[]} partyCommandList 
         */
        constructor(partyCommandList){
            this._list=partyCommandList;
            this._inter=null;
        }

        commandList(){
            return this._list;

        }
        /**
         * @param {Number} eventId 
         * @param {()=>void} onEndEvent
         */
        startEvent(eventId,onEndEvent){

            const eventCode =$dataCommonEvents[eventId];
            if(eventCode){
                this._inter = new Game_Interpreter(0);
                this._inter.setup(eventCode.list,0);
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
    const commandList = commandListText.map(PartyCommand.create);

    const manager= new PartyCommandManager_T(
        commandList
    );
    return manager;
})();
const Window_PartyCommand_addCommand=Window_PartyCommand.prototype.addCommand;
Window_PartyCommand.prototype.addCommand =function(name,symbol,enabled,ext){

    if(symbol==="escape"){
        for (const iterator of PartyCommandManager.commandList()) {
            if(iterator.canAdd()){
                this.addCommand(iterator.name(),SYMBOL_STRING,iterator.isEnabled(),iterator);
            }
        }
    }
    Window_PartyCommand_addCommand.apply(this,arguments);
}
const Scene_Battle_createPartyCommandWindow=Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow =function(){
    Scene_Battle_createPartyCommandWindow.call(this);
    this._partyCommandWindow.setHandler(SYMBOL_STRING,this.onExtraCommandOk.bind(this));
};
const Scene_Battle_update=Scene_Battle.prototype.update;
Scene_Battle.prototype.update =function(){
    PartyCommandManager.update();
    Scene_Battle_update.call(this);
};
Scene_Battle.prototype.onExtraCommandOk =function(){
    /**
     * @type {PartyCommand}
     */
    const ext = this._partyCommandWindow.currentExt();
    const eventId = ext.eventId;
    if(!isNaN(eventId)){
        PartyCommandManager.startEvent(eventId,()=>{
            this._partyCommandWindow.activate();
            this._partyCommandWindow.open();
        });
    }
};

}())
