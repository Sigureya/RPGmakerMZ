//@ts-check
/*:
 * @plugindesc 変数操作拡張
 * @author しぐれん
 * 
 * @target MZ
 * 
 * @param elementNormal
 * @default 通常攻撃
 * 
 * @param textNone
 * @default なし
 * 
 * @command GetSkillData
 * @text スキルの情報を取得/GetSkillData
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg mpcost
 * @text 消費MP/MPcost
 * @type variable
 * @default 0
 * 
 * @arg tpcost
 * @text 消費TP/TPcost
 * @type variable
 * @default 0
 * 
 * @arg gaintp
 * @text 取得TP/gainTP
 * @type variable
 * @default 0
 * 
 * @arg skilltype
 * @text スキルタイプID/skilltypeID
 * @type variable
 * @default 0
 * 
 * @arg animation
 * @text アニメーション/animation
 * @type variable
 * @default 0
 * 
 * @arg elementid
 * @text
 * @desc 「通常攻撃」が設定されている場合は-1が代入されます。
 * @type variable
 * @default 0
 * 
 * 
 * @command GetSkillText
 * @text スキルの文章を取得/GetSkillText
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg name
 * @text 名前/name
 * @type variable
 * @default 0
 * 
 * @arg desc
 * @text 説明文/Description
 * @type variable
 * @default 0
 * 
 * @arg skilltypename
 * @text スキルタイプ/Skilltype
 * @type variable
 * @default 0
 * 
 * @arg elementname
 * @text 属性名/ElementName
 * @type variable
 * @default 0
 * 
 * 
 * @command GetParams
 * @text パラメータの取得/GetParams
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg dataType
 * @text データ種別
 * @desc カッコ内は「項目指定変数」の使い道です。
 * @type select 
 * @option アクター(アクターID)
 * @value actor
 * @option 武器(武器ID)
 * @value weapon
 * @option 防具(防具ID)
 * @value armor
 * @default actor
 * 
 * @arg mhp
 * @text 最大HP/MaxHP
 * @type variable
 * @default 0
 * 
 * @arg mmp
 * @text 最大MP/MaxMP
 * @type variable
 * @default 0
 * 
 * @arg atk
 * @text 攻撃力/ATK
 * @type variable
 * @default 0
 * 
 * @arg def
 * @text 防御力/DEF
 * @type variable
 * @default 0
 * 
 * @arg mat
 * @text 魔法攻撃力/MAT
 * @type variable
 * @default 0
 * 
 * @arg mdf
 * @text 魔法防御力/MDF
 * @type variable
 * @default 0
 * 
 * @arg agi
 * @text 敏捷性/AGI
 * @type variable
 * @default 0
 * 
 * @arg luk
 * @text 運/LUK
 * @type variable
 * @default 0
 * 
 * @command GetItemData
 * @text アイテムの情報を取得/GetItemData
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg dataType
 * @text データ種別
 * @desc カッコ内は「項目指定変数」の使い道です。
 * @type select 
 * @option アイテム(アイテムID)
 * @value item
 * @option 武器(武器ID)
 * @value weapon
 * @option 防具(防具ID)
 * @value armor
 * @default item
 * 
 * @arg name
 * @text 名前/name
 * @type variable
 * @default 0
 * 
 * @arg desc
 * @text 説明文/description
 * @type variable
 * @default 0
 * 
 * @arg iconindex
 * @text アイコン番号/iconindex
 * @type variable
 * @default 0
 * 
 * @arg price
 * @text 値段/price
 * @type variable
 * @default 0
 * 
 * 
 * @command GetWeaponType
 * @text 武器種別の取得/GetWeaponType
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg typetext
 * @type variable
 * @default 0
 * 
 * 
 * @command GetArmorType
 * @text 防具種別の取得/GetArmorType
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg typetext
 * @type variable
 * @default 0
 * 
 * 
 * @command NumItems
 * @text 所持数を数える/NumItems
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg dataType
 * @text データ種別
 * @desc カッコ内は「項目指定変数」の使い道です。
 * @type select 
 * @option アイテム(アイテムID)
 * @value item
 * @option 武器(武器ID)
 * @value weapon
 * @option 防具(防具ID)
 * @value armor
 * @default item
 * 
 * @arg result
 * @text 結果の書き込み先
 * @type variable
 * @default 0
 * 
 * @arg includesEquip
 * @text 装備品を含む
 * @type boolean
 * @default false
 * 
 * @command GainItem
 * @text アイテムの入手
 * @desc アイテムを減らす結果になる場合、何もしません。
 * 
 * @arg item
 * @text 項目指定変数
 * @desc 変数の値をデータ選択に使います。
 * @type variable
 * @default 0
 * 
 * @arg dataType
 * @text データ種別
 * @desc カッコ内は「項目指定変数」の使い道です。
 * @type select 
 * @option アイテム(アイテムID)
 * @value item
 * @option 武器(武器ID)
 * @value weapon
 * @option 防具(防具ID)
 * @value armor
 * @default item
 * 
 * @arg amountVariable
 * @text 個数(変数指定)
 * @desc 数値がマイナスの場合何もしません。
 * @type variable
 * @default 0
 * 
 * @arg amount
 * @text 個数(直接指定)
 * @desc 変数指定との合計個数が加算されます。
 * @type number
 * @default 0
 * 
 * 
 * @help
 * イベントコマンド「変数の操作」で取得できないデータを変数に入れることができます。
 * プラグインパラメータでは、書き込み先の変数を指定します。
 * 機能の詳細はプラグインパラメータで確認してください。
 */

/*~struct~EquipQuery:
 * @param target
 * @text 書き込み先変数
 * @type variable
 * @default 0
 *  
 * @param key
 * @text 取得するデータ
 * @type select
 * @option 名前/name
 * @value name
 * @option 最大HP
 * @value mhp
 * @option 攻撃力/atk
 * @value atk
 * @option 防御力/def
 * @value def
 * @option 魔法攻撃力/mat
 * @value mat
 * @option 魔法防御力/mdf
 * @value mdf
 * @option 素早さ
 * @value agi
 * @option 運
 * @value luk
 * @option アイコン番号/iconIndex
 * @value iconindex
 * @option アイコン文字列
 * @value iconstring
 * @option 特徴の総数/numTraits
 * @value numtraits
 * @option 価格
 * @value price
 * @option 所持数
 * @value amount
 * @default a
 * 
 */

(function(){
    'use strict';
/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_GameDataAccess');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }

const setting = (function(){
    const param =getParam();
    const result ={
        textNone:String(param.textNone),
        textNormalAttack:String(param.elementNormal),
    };
    return result;
})();

/**
 * @param {number} variableId 
 * @returns 
 */
function variableIdValid(variableId){
    return variableId > 0;
}
/**
 * @template T
 * @param {number} variableId 
 * @param {T[]} src 
 */
function getData(variableId,src){
    const itemId =$gameVariables.value(variableId);
    return src[itemId] || null;
}
/**
 * @param {string} typename 
 * @param {number} itemVariable 
 */
function getItemData(typename,itemVariable){
    const itemId =$gameVariables.value(Number(itemVariable));
    if(itemId >0){
        switch (typename) {
            case "item":
                return $dataItems[itemId];
            case "armor":
                return $dataArmors[itemId];
            case "weapon":
                return $dataWeapons[itemId];
        }
    }
    return null;
}
/**
 * 
 * @typedef {object} GetParamsArg 
 * @property {string} mhp
 * @property {string} mmp
 * @property {string} atk
 * @property {string} def
 * @property {string} mat
 * @property {string} mdf
 * @property {string} agi
 * @property {string} luk
 */

/**
 * @param {GetParamsArg} arg 
 * @param {(index:number)=>number} func
 */
function writeParams(arg,func){

    const params =[arg.mhp,arg.mmp,arg.atk,arg.def,arg.mat,arg.mdf,arg.agi,arg.luk];
    params.forEach((key,index)=>{
        const variableId =Number(key);
        const value = func(index);
        $gameVariables.setValue(variableId,value);
    });
}
PluginManager.registerCommand( PLUGIN_NAME,"GetParams",(arg)=>{
    const type =String(arg.dataType);
    const variableId =Number(arg.item);

    if(type ==="armor"){
        const armor = getData(variableId,$dataArmors);
        writeParams(arg,(index)=> armor ? armor.params[index]: 0);
        return;
    }
    if(type ==="weapon"){
        const weapon =getData(variableId,$dataWeapons);
        writeParams(arg,(index)=> weapon ? weapon.params[index]: 0);
        return;
    }

    if(type ==="actor"){
        const actorId = $gameVariables.value(variableId);
        const actor =$gameActors.actor(actorId);
        writeParams(arg,(index)=> actor? actor.param(index):0);
    }
});

PluginManager.registerCommand( PLUGIN_NAME,"GetItemData",(arg)=>{
    const item = getItemData(arg.dataType,arg.item);
    $gameVariables.setValue(Number(arg.name),item ? item.name:"");
    $gameVariables.setValue(Number(arg.iconindex),item ? item.iconIndex:0);
    $gameVariables.setValue(Number(arg.price),item ?item.price:0);
    $gameVariables.setValue(Number(arg.desc),item ? item.description : "");
});

PluginManager.registerCommand(PLUGIN_NAME,"NumItems",(arg)=>{
    const item = getItemData(arg.dataType,arg.item);
    const result = Number(arg.result);
    if(!variableIdValid(result)){
        return;
    }
    const num =$gameParty.numItems(item);
    $gameVariables.setValue(result,num);
});
PluginManager.registerCommand(PLUGIN_NAME,"GainItem",(arg)=>{
    const item = getItemData(arg.dataType,arg.item);
    const amount = Number(arg.amount);
    const amountV =$gameVariables.value(  Number(arg.amountVariable));
    if(item){
        const finaleAmount = amount + (!isNaN(amountV) ? amountV:0);
        $gameParty.gainItem(item,finaleAmount);
    }
});
/**
 * @param {rm.types.Weapon} weapon 
 */
function weapontypeText(weapon){
    if(!weapon){
        return "";
    }
    const typetext =$dataSystem.weaponTypes[weapon.wtypeId];
    if(typetext){
        return typetext;
    }
    return setting.textNone;
}

PluginManager.registerCommand(PLUGIN_NAME,"GetWeaponType",(arg)=>{
    const item = getData(Number(arg.item),$dataWeapons);    
    $gameVariables.setValue(Number(arg.typetext),weapontypeText(item));
});
/**
 * @param {rm.types.Armor} armor 
 */
function armorTypeText(armor){
    if(!armor){
        return "";
    }
    const typetext= $dataSystem.armorTypes[armor.atypeId];
    if(typetext){
        return typetext;
    }
    return setting.textNone;
}

PluginManager.registerCommand(PLUGIN_NAME,"GetArmorType",(arg)=>{
    const item = getData(Number(arg.item),$dataArmors);    
    $gameVariables.setValue(Number(arg.typetext),armorTypeText(item));
});

PluginManager.registerCommand(PLUGIN_NAME,"GetSkillData",(arg)=>{
    const skill= getData(Number(arg.item),$dataSkills);

    $gameVariables.setValue(Number(arg.mpcost),skill ? skill.mpCost :0);
    $gameVariables.setValue(Number(arg.tpcost),skill ? skill.tpCost :0);
    $gameVariables.setValue(Number(arg.elementid),skill ? skill.damage.elementId :0);
});

/**
 * @param {rm.types.Skill} skill 
 */
function elementText(skill){
    if(!skill){
        return "";
    }
    const element= $dataSystem.elements[skill.damage.elementId];
    if(element){
        return element;
    }
    if(skill.damage.elementId ===-1){
        return setting.textNormalAttack;
    }
    return setting.textNone;
}
/**
 * @param {rm.types.Skill} skill 
 * @returns 
 */
function skilltypeText(skill){
    if(skill){
        const type= $dataSystem.skillTypes[skill.stypeId];
        if(type){
            return type;
        }
        return setting.textNone;
    }
    return "";
}


PluginManager.registerCommand(PLUGIN_NAME,"GetSkillText",(arg)=>{
    const skill= getData(Number(arg.item),$dataSkills);

    $gameVariables.setValue(Number(arg.name),skill ? skill.name :"");
    $gameVariables.setValue(Number(arg.desc),skill ? skill.description :"");
    $gameVariables.setValue(Number(arg.elementname),elementText(skill));
    $gameVariables.setValue(Number(arg.skilltypename),skilltypeText(skill));

});



}())
