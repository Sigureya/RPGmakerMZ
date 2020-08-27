
//=============================================================================
// Mano_CurrencyUnit.js
// ----------------------------------------------------------------------------
// Copyright (c) 2019-2019 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.9.0 2020/08/31 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================
/*:
 * @plugindesc 変数やアイテムを消費して購入できるショップが作れます。
 * 競合率・中ぐらい
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_CurrencyUnit.js
 * 
 * @help
 * お金の代わりに変数やアイテムを消費して購入できるショップを作成できます。
 * 応用することで円・＄(ドル)・€(ユーロ)などのような複数の通貨があるシステムもできます。
 * 
 * 内部的には専用の財布を作って、そこに処理を流します。
 * 既存処理を再定義しているため、競合の可能性があります。
 * （ポイントカードのようなプラグインを使っている場合、これより後ろにおいてください）
 * 
 * プラグインコマンドで通貨単位を切り替えます。
 * 
 * 以下MV用のプラグインコマンドの設定です。
 * 
 * ShopModeReset
 * 通常のお金を使うモードに戻します
 * 
 * ShopModeVariable 8 枚
 * お金の代わりに変数8番の数値を見ます。
 * 単位として「枚」を使うようになります。
 * 
 * ShopModeItem 3 個
 * お金の代わりにitemID[3]のアイテムの所持数を見ます
 * 単位として「個」を使うようになります。
 * 
 * 2020/08/31 公開
 * 
 * 
 * @command setWalletVariable
 * @text 通貨変数の切り替え
 * @desc ショップの処理で使う通貨単位を変数で設定します。
 * 
 * @arg variableId
 * @text 使用する変数
 * @desc 指定した変数の値を消費して買い物を行います。
 * 変数が設定されていないとエラーになります。
 * @type variable
 * @default 0
 * 
 * @arg unit
 * @text 通貨単位
 * @desc 画面に表示される通貨の単位です。
 * @type string
 * @default 枚
 * 
 * @command setWalletItem
 * @text 通貨アイテムの切り替え
 * @desc ショップの処理で使う通貨単位をアイテムで設定します。
 * 
 * @arg itemId
 * @text 使用するアイテム
 * @desc 指定した変数の値を消費して買い物を行います。
 * 変数が設定されていないとエラーになります。
 * @type item
 * @default 0
 * 
 * @arg unit
 * @text 通貨単位
 * @desc 画面に表示される通貨の単位です。
 * @type string
 * @default 個
 * 
 * @command resetWallet
 * @text 通貨切り替えの解除
 * @desc 通貨を通常のお金に戻します
 * 
 * 
*/



(function(){
    'use strict';
    const PLUGIN_NAME='Mano_CurrencyUnit';

class WalletBase{

    /**
     * @param {String} unit 
     */
    constructor(unit){
        this.setUnit(unit ||TextManager.currencyUnit);
    }
    /**
     * @param {String} unit 
     */
    setUnit(unit){
        this._unit = unit;
    }

    value(){
        return 0;
    }
    pay(value){
    }

    loseValue(value){
        this.pay(value);
    }

    gainValue(value){
        this.pay(-value);
    }
    unit(){
        return this._unit;
    }

    canSeil(){
        return false;
    }

    isGold(){
        return false;
    }
}

class WalletGold extends WalletBase{
    constructor(){
        super(TextManager.currencyUnit);
    }
    value(){
        return $gameParty.gold();
    }
    pay(value){
        $gameParty.loseGold(value);
    }
    canSeil(){
        return true;
    }
    isGold(){
        return true;
    }
}

class WalletItem extends WalletBase{
    /**
     * @param {Number} itemId 
     */
    constructor(itemId){
        super();
        this._itemId=itemId;
    }

    item(){
        return $dataItems[this._itemId];
    }

    value(){
        return $gameParty.numItems(this.item());
    }

    pay(value){
        $gameParty.loseItem( this.item(), value);
    }

}
window[WalletItem.name] =WalletItem;

class WalletVariable extends WalletBase{
    /**
     * @param {Number} id 
     */
    constructor(id){
        super();
        this._variableId=id;
    }
    value(){
        return $gameVariables.value(this._variableId);
    }

    pay(value){
        const lastValue = this.value();
        $gameVariables.setValue(this._variableId, lastValue-value );
    }
}

/**
 * @param {WalletBase} wallet 
 */
function setupWallet(wallet){
    g_wallet = wallet;
}


/**
 * アイテムと引き換えに交換を行うショップの設定
 * @param {Number} itemId 
 * @param {string} unit 
 */
function setupItemWallet(itemId,unit){
    const wallet = new WalletItem(itemId);
    wallet.setUnit(unit);
    setupWallet(wallet);    
}

/**
 * @description  変数と引き換えに交換を行うショップの設定
 * @param {Number} variableId
 * @param {string} unit 
 */
function setupVariableWallet(variableId,unit){
    const wallet = new WalletVariable(variableId);
    wallet.setUnit(unit);
    setupWallet(wallet);
}

function resetWallet(){
    setupWallet(null);
}

let g_wallet =null;
const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(cmd,args){
    if(cmd ==="ShopModeItem"){
        setupItemWallet( Number(args[0],args[1]));
        return;
    }
    if(cmd ==="ShopModeVariable"){
        setupVariableWallet( Number(args[0],args[1]));
    }
    Game_Interpreter_pluginCommand.call(this,cmd,args);
};


PluginManager.registerCommand(PLUGIN_NAME,"setWalletVariable",
    (arg)=>{setupVariableWallet(Number(arg.variableId),arg.unit);}
);
PluginManager.registerCommand(PLUGIN_NAME,"setWalletItem",
    (arg)=>{setupItemWallet( Number(arg.itemId),arg.unit)}
);
PluginManager.registerCommand(PLUGIN_NAME,"resetWallet",
    resetWallet
);


const Scene_Load_onLoadSuccess=Scene_Load.prototype.onLoadSuccess
Scene_Load.prototype.onLoadSuccess =function(){
    resetWallet();
    g_wallet=null;
    Scene_Load_onLoadSuccess.call(this);
};

Window_Gold.prototype.setupWallet =function(){
    const w = g_wallet || new WalletGold();
    this._wallet =w;
    g_wallet =null;
};
Window_Gold.prototype.value = function() {
    return this._wallet.value();
};

Window_Gold.prototype.currencyUnit = function() {
    return this._wallet.unit();
};
Window_Gold.prototype.wallet =function(){
    return this._wallet;
};

const Window_Gold_initialize =Window_Gold.prototype.initialize;
Window_Gold.prototype.initialize =function(){
    this.setupWallet();
    Window_Gold_initialize.apply(this,arguments);
};
const Scene_Shop_createGoldWindow =Scene_Shop.prototype.createGoldWindow;
Scene_Shop.prototype.createGoldWindow =function(){
    Scene_Shop_createGoldWindow.call(this);
    this._purchaseOnly =this._purchaseOnly || !this._goldWindow.wallet().canSeil();
};

Scene_Shop.prototype.doBuy = function(number) {
    this._goldWindow.wallet().loseValue(number * this.buyingPrice());
    $gameParty.gainItem(this._item, number);
};

Scene_Shop.prototype.doSell = function(number) {
    const p =number * this.sellingPrice();
    this._goldWindow.wallet().gainValue(p);
    $gameParty.loseItem(this._item, number);
};



})();
