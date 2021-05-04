//=============================================================================
// Mano_CommandErase.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 1.1.0 2021/05/04
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc 値段を変数で決められるショップ
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMZ)
 * 
 * @target MZ
 * @command shop
 * @arg items
 * @text アイテム/items
 * @type struct<Item>[]
 * @default []
 * 
 * @arg weapons
 * @text 武器/weapons
 * @type struct<Weapon>[]
 * @default []
 * 
 * @arg armors
 * @text 防具/armors
 * @type struct<Armor>[]
 * @default []
 * 
 * @arg buyOnly
 * @text 購入のみ/buyOnly
 * @type boolean
 * @default false
 * 
 * @param priceZero
 * @text 値段0の扱い/
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * 
 * @help
 * 値段を変数で決められるショップ
 * プラグインコマンドを呼び出すのみです。
 * それ以外の機能はありません。
 * 
 * アイテムの値段が0である場合、表示されなくなります。
 * 
 * Shops where prices can be determined by variables
 * Just call the plugin command.
 * There is no other function.
 * 
 * 更新履歴
 * 2021/05/04
 * 値段が0の際の扱いを調整可能に
 * 
 * */
 /*~struct~Item:
  * @param item
  * @text アイテム/item
  * @type item
  * @default 7
  * 
  * @param price
  * @text 値段/price
  * @type variable
  * @default 0
  * 
  * @param switchId
  * @text 有効化スイッチ/switch
  * @desc スイッチがONの場合のみ、このアイテムを表示します。
  * This item is displayed only when the switch is ON.
  * @type switch
  * @default 0
  * 
*/
 /*~struct~Weapon:
  * @param item
  * @text 武器/Weapon
  * @type weapon
  * @default 1
  * 
  * @param price
  * @text 値段/price
  * @desc 値段設定用の変数です。指定が無い場合、アイテムの初期値を使います。
  * Variable for pricing. If not specified, the initial value of the item will be used.
  * @type variable
  * @default 0
  * 
  * @param switch
  * @text 有効化スイッチ/switch
  * @desc スイッチがONの場合のみ、このアイテムを表示します。
  * This item is displayed only when the switch is ON.
  * @type switch
  * @default 0
  * 
*/
 /*~struct~Armor:
  * @param item
  * @text 防具/Armor
  * @type armor
  * @default 1
  * 
  * @param price
  * @text 値段/price
  * @type variable
  * @default 0
  * 
  * @param switch
  * @text 有効化スイッチ/switch
  * @desc スイッチがONの場合のみ、このアイテムを表示します。
  * This item is displayed only when the switch is ON.
  * @type switch
  * @default 0
  * 
*/

(function(){
    'use strict';
const PLUGIN_NAME='Mano_ShopCustom';
function getParam(){ return PluginManager.parameters('Mano_ShopCustom');  }
const setting = (function(){
    const param =getParam();
    const result ={
      priceZero:(param.priceZero)==="true",
    };
    return result;
})();
/**
 * @param {Number} itemType 
 */
function itemSrc(itemType){
  switch (itemType) {
    case 0:
      return $dataItems;
    case 1:
      return $dataWeapons;
    case 2:
      return $dataArmors;
  }
  return []
}
/**
 * 
 * @param {Number} itemId 
 * @param {Number} itemType 
 */
function getItemPrice(itemId,itemType){
  const src = itemSrc(itemType);
  const item = src[itemId];
  if(item){
    return item.price;
  }

  return 0;
}
/**
 * @param {String} arg 
 * @param {Number} itemType 0:item,1:weapon,2:armor 
 * @param {Number[][]} outList
 */
function argToShopItem(arg,itemType ,outList){
  const obj = JSON.parse(arg);
  const itemId = Number(obj.item);
  if(itemId===0){
    //    console.log("itemIdが0なので消す")
    return;
  }
  const switchId = Number(obj.switchId);
  if(switchId >0){
    if(!$gameSwitches.value(switchId)){
    //  console.log("switchがOFFなので消す")
      return;
    }
  }
  const variableId = Number(obj.price);
  const cusotmMode = ( variableId > 0) ? 1:0 ;

  const price =( cusotmMode ===1) ? $gameVariables.value(variableId) : getItemPrice(itemId,itemType);
  if(price <=0){
      if(!setting.priceZero){
          console.log("値段が0なので消す")
          return;
      }
  }
  const result= [
    itemType,
    itemId,
    cusotmMode,
    price
  ];
  outList.push(result);
}
/**
 * 
 * @param {String[]} objTextList 
 * @param {Number } itemType
 * @param {[]} outList 
 */
function xx(objTextList,itemType,outList){
  for (const iterator of objTextList) {
    argToShopItem(iterator,itemType,outList);
  }
}


PluginManager.registerCommand(PLUGIN_NAME,"shop",(arg)=>{
    const goods =[];
    /**
     * @type {String[]}
     */
    const items = JSON.parse(arg.items);
    /**
     * @type {String[]}
     */
     const weapons = JSON.parse(arg.weapons);
    /**
     * @type {String[]}
     */
     const armors = JSON.parse(arg.armors);
     xx(items,0,goods);
     xx(weapons,1,goods);
     xx(armors,2,goods);

     SceneManager.push(Scene_Shop);
     SceneManager.prepareNextScene(goods,arg.buyOnly ==="true");
});

}())
