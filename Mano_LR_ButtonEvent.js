/*:
 * @plugindesc pageup/pagedownでイベントを呼び出せるようにします。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @target MZ
 * 
 * @param pageup
 * @type struct<EventCaller>
 * @default {"id":"0","inputType":"0"}
 * 
 * @param pagedown
 * @type struct<EventCaller>
 * @default {"id":"0","inputType":"0"}
 * 
 * @help
 * pageup/pagedownが押された際に、指定されたコモンイベントを呼び出します。
 * マップ上でのみ有効です。
 * 
 * このプラグインはMano_InputConfigのコモンイベント呼び出し機能では
 * 対応できない範囲をカバーするためのプラグインです。
 * あちらに組み込むと複雑化するため、別のプラグインとして実装しました。
*/
/*~struct~EventCaller:
 * @param id
 * @text 呼び出すイベント/event
 * @desc ボタンを押した際に呼び出すコモンイベント(マップのみ)
 * Common event to call when a button is pressed(MapOnly)
 * @type common_event
 * @default 0
 * 
 * @param inputType
 * @text 入力方式/inputType
 * @desc 呼び出し時のボタンの入力形式。
 * Button input format when calling.
 * @type select
 * @option 押されている/pressed
 * @value 0
 * @option トリガー/triggerd
 * @value 1
 * @option リピート/repeated
 * @value 2
 * @default 0
 */

(function(){
    'use strict';
    class EventCaller{
        /**
         * @param {String} symbol
         * @param {Number} eventId 
         * @param {Number} triggereType 
         */
        constructor(symbol,eventId,triggereType){
            this._eventId = eventId;
            this._inputType = triggereType;
            this._symbol=symbol;
        }
        /**
         * @param {String} symbol
         * @param {String} objText 
         * @returns 
         */
        static create(symbol,objText){
            if(!objText){
                return null
            }
            const obj =JSON.parse(objText);
    
            const eventId =Number(obj.id);
            const inputType =Number(obj.inputType);
            return new EventCaller(symbol,eventId,inputType);
        }
        isValidEvent(){
            return this._eventId > 0;
        }
        eventId(){
            return this._eventId;
        }
        callEvent(){
            if(!$gameTemp.isCommonEventReserved()){
                $gameTemp.reserveCommonEvent(this._eventId);
            }
        }
        updateEvent(){
            if(this._eventId >0 && this.needsEventCall(this._symbol)){
                this.callEvent();
            }
        }
        /**
         * @param {String} symbol 
         * @returns 
         */
        needsEventCall(symbol){
            switch (this._inputType) {
                case 0:
                    return Input.isPressed(symbol);    
                case 1:
                    return Input.isTriggered(symbol)
                case 2:
                    return Input.isRepeated(symbol);
            }
            return false;
        }
        typeIsPressed(){
            return this._inputType === 0;
        }
        typeIsTriggered(){
            return this._inputType === 1;
        }
        typeIsRepeated(){
            return this._inputType === 2;
        }
    }
    function getParam(){ return PluginManager.parameters('Mano_LR_ButtonEvent');  }
    const setting = (function(){
        const param =getParam();
        const pageup=EventCaller.create("pageup",param.pageup);
        const pagedown = EventCaller.create("pagedown",param.pagedown);

        const list=[pageup,pagedown].filter( function(e){
            return !!e;
        }  )
        const result ={
            list:list,
        };
        return result;
    })();
    if(setting.list.length >0){
        const Game_Map_setupStartingEvent =Game_Map.prototype.setupStartingEvent;
        Game_Map.prototype.setupStartingEvent =function(){
            for (const iterator of setting.list) {
                iterator.updateEvent();
            }
            return Game_Map_setupStartingEvent.call(this);
        };
    
    }
    
}())
