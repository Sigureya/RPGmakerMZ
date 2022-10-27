/*:
 * @plugindesc 
 * @author Maxしぐれん
 * 
 * @target MZ
 * 
 * @url https://siguren400.booth.pm/items/3300534
 * 
 * @command GetSlotName
 * @arg actor
 * @type actor
 * @default 0
 * 
 * @arg slotIndex
 * @type number
 * @desc 0番が武器です。以後防具などが続きます。
 * @default 0
 * 
 * @arg variable
 * @text 結果を書き込む変数
 * @type variable
 * @default 0
 * 
 * @param slotNameSet1
 * @type struct<SlotNameSet>
 * @default {"slotNames":"[]","actorList":"[]"}
 * 
 * @param slotNameSet2
 * @type struct<SlotNameSet>
 * @default {"slotNames":"[]","actorList":"[]"}
 * 
 * @param slotNameSet3
 * @type struct<SlotNameSet>
 * @default {"slotNames":"[]","actorList":"[]"}
 * 
 * 
 * @help
 * 特定のアクターで、装備スロットに専用の名称を付けられます。
 * 変更されるのは名称のみで、装備のシステム面への変更はありません。
 * 専用名称が設定されてない場合、初期設定が参照されます。
 * 
 * MITライセンスです。
 * ご自由にお使いください。
*/
/*~struct~SlotNameSet:
 * @param slotNames
 * @type string[]
 * @default []
 * 
 * @param actorList
 * @text 装備スロット名変更を行うアクター一覧
 * @type actor[]
 * @default []
 * 
*/

(function(){
    'use strict';
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_EquipSlotName');
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    
/**
 * @typedef {object} NameSetParam
 * @property {string[]} slotNames
 * @property {number[]} actors
 */
class SlotNameSet{
    /**
     * 
     * @param {ReadonlyArray<string>} list 
     */
    constructor(list){
        /**
         * @readonly
         */
        this._list=list;
    }
    get(){
        return this._list;
    }

}

class SlotManager_T{
    constructor(){
        /**
         * @type {Map<number,SlotNameSet>}
         */
        this._map =new Map();
        this.setDefaultNameSet(null);

    }
    /**
     * 
     * @param {SlotNameSet} nameset 
     */
    setDefaultNameSet(nameset){
        this._defaultNameSet =nameset;
    }


    /**
     * @param {NameSetParam} param 
     */
    addParam(param){
        const nameSet = new SlotNameSet(param.slotNames);
        for (const iterator of param.actors) {
            this._map.set(iterator,nameSet);
        }
    }
    /**
     * @param {number} actorId
     * @returns {ReadonlyArray<string>}
     */
     getTable(actorId){
        const list = this._map.get(actorId);
        if(list){
            return list.get();
        }
        return $dataSystem.equipTypes;
    }

    /**
     * 
     * @param {Game_Actor} actor 
     * @param {number} index 
     * @returns {string}
     * 
     */
    actorSlotName(actor,index){
        const table = this.getTable(actor.actorId());
        const slots = actor.equipSlots();
        return table[slots[index]];
    }
}


/**
 * 
 * @param {string} text 
 * @returns {NameSetParam}
 */
function readNameSet(text){
    const obj =JSON.parse(text);

    /**
     * @type {string[]}
     */
    const actorList =JSON.parse(obj.actorList);

    /**
     * @type {string[]}
     */
    const slotNames =JSON.parse(obj.slotNames);

    const slotList =[""];
    for(let i=1; i < $dataSystem.equipTypes.length; ++i){
        const name = slotNames[i-1] ? slotNames[i-1] : $dataSystem.equipTypes[i];
        slotList.push(name);
    }

    return {
        slotNames:slotList,
        actors:actorList.map(Number),
    };
}

const SlotManager =new SlotManager_T();

const Scene_Boot_onDatabaseLoaded=Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded =function(){
    Scene_Boot_onDatabaseLoaded.call(this);

    const param = getParam();
    const nameSetList=[
        readNameSet(param.slotNameSet1),
        readNameSet(param.slotNameSet2),
        readNameSet(param.slotNameSet3)
    ];
    for (const iterator of nameSetList) {
        SlotManager.addParam(iterator);
    }
    const nameset = new SlotNameSet($dataSystem.equipTypes);
    SlotManager.setDefaultNameSet(nameset);
    
};
/**
 * @param {Game_Actor} actor 
 * @param {number} index 
 * @returns 
 */
Window_StatusBase.prototype.actorSlotName =function( actor,index){
    return SlotManager.actorSlotName(actor,index);
};

PluginManager.registerCommand(PLUGIN_NAME,"GetSlotName",(arg)=>{
    const variable =Number(arg.variable);
    const actor =$gameActors.actor(Number(arg.actor));
    if(actor){
        const index =Number(arg.slotIndex);
        const name = SlotManager.actorSlotName(actor,index);
        $gameVariables.setValue(variable,name);
    }
});


}())
