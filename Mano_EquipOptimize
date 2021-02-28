//=============================================================================
// Mano_EquipmentOptimize.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/01/28 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================


/*:
 * @plugindesc 最強装備コマンドを値段が高い順で行います。
 * @author しぐれん( https://twitter.com/Sigureya/)
 * 
 * @target MZ
 * 
 * @help
 * 最強装備コマンドを値段が高い順で行います。
 * 
 * メモ欄で使用できるタグ
 * <EquipItemPerformance:5000>
 * 売却不能アイテムとして値段を0にしている場合、最適化で選ばれなくなってしまいます。
 * このタグを設定すると、値段ではなくここで指定した数値で評価します。
 * 
 * <OptimizeLock>
 * 指定した装備品が最強装備コマンドを使った場合もそのままになります。
 */

(function(){
    'use strict';
const CALCMODE={
    price:1,
}

class OptimizeControle_T{
    constructor(){
        this._calcMode =CALCMODE.price;
        this._enablde = false;
    }
    /**
     * @param {Boolean} value 
     */
    setState(value){
        this._enablde =!!value;
    }
    /**
     * @param {rm.types.EquipItem} equip 
     */
    isLocked(equip){
        if(!this._enablde){
            return false;
        }
        return !!(equip.meta.OptimizeLock)
    }
    /**
     * @param {rm.types.EquipItem} item 
     */
    calcEquipItemPerformance(item){
        const ep = this.calcEquipItemPerformanceEX(item);
        if(!isNaN(ep)){
            return ep;
        }
        switch (this._calcMode) {
            case CALCMODE.price:
                return this.calcForPrice(item);
        }
        return item.params.reduce((a, b) => a + b);
    }
    calcEquipItemPerformanceEX(item){
        const ep = item.meta.EquipItemPerformance;
        return Number(ep);
    }
    /**
     * @param {rm.types.EquipItem} item 
     */
    calcForPrice(item){
        const ep = this.calcEquipItemPerformanceEX(item);
        if(isNaN(ep)){
            return item.price;
        }
        return ep;
    }
}

const OptimizeControle = new OptimizeControle_T();
const Game_Actor_optimizeEquipments=Game_Actor.prototype.optimizeEquipments;
Game_Actor.prototype.optimizeEquipments = function() {
    OptimizeControle.setState(true);
    Game_Actor_optimizeEquipments.call(this);
    OptimizeControle.setState(false);
};

const Game_Actor_isEquipChangeOk =Game_Actor.prototype.isEquipChangeOk;
Game_Actor.prototype.isEquipChangeOk =function(slotId){
    const item = this._equips[slotId];
    if(item){
        const obj = item.object();
        if(obj){
            if(OptimizeControle.isLocked(obj)){
                return false;
            }    
        }
    }
    return Game_Actor_isEquipChangeOk.call(this,slotId);
};

Game_Actor.prototype.calcEquipItemPerformance =function(item){
    return OptimizeControle.calcEquipItemPerformance(item);
};
}())
