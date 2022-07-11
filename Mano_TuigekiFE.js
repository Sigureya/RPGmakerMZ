//=============================================================================
// Mano_TuigekiFE.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 1.0.0 2022/07/11
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc スキルの連続攻撃の回数をプラグインによって設定できます。
 * @author しぐれん
 * 
 * @param expr
 * @text 追撃回数計算式
 * @type multiline_string
 * @default (a.agi - b.agi) > 50 ? 1 : 0
 * 
 * @param limit
 * @text 追撃回数上限
 * @type number
 * @desc 追撃回数をこの数値以内にします。
 * @default 2
  
 * @param totalLimit
 * @text 連続回数上限
 * @desc 基本の連続攻撃回数＋このプラグインによる追撃回数を
 * 指定値以内にします。
 * @default 8

 * @param tag
 * @text タグ
 * @desc スキルのメモ欄に指定タグがあった場合に追撃を行います。
 * @default 速度追撃
 * 
 * @target MZ
 * 
 * @help
 * 指定タグがついた単体攻撃の場合、攻撃回数を増やします。
 * 初期設定では「速度追撃」と書かれているスキルが追撃に対応するようになっています。
 * 
 * 追撃回数は式を書いて設定します。
 * 内部ではFunctionを使っているので軽量です。
 * 
 * 
*/
(function(){
    'use strict';

    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_TuigekiFE');
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    const setting = (function(){
        const param =getParam();
        const expr =String(param.expr ||"0");

        const needsReturn = expr.indexOf("return")===-1;

        const result ={
            totalLimit:Number(param.totalLimit),
            limit:Number(param.limit),

            func:Function(`{const a=this.a;const b=this.b; ${needsReturn ? "return":""  }  ${expr} ;}`),
            tag:String(param.tag),
        };
        return result;
    })();
/**
 * 
 * @param {Game_Battler} a 
 * @param {Game_Battler} b 
 */
function getRepeat(a,b){
    const repeats =Number(setting.func.call({a:a,b:b}));
    if(isNaN(repeats)){
        return 0;
    }
    if(repeats <0){
        return 0;
    }
    return Math.min(setting.limit,Math.round(  repeats));
}

const Game_Action_numRepeats=Game_Action.prototype.numRepeats;
Game_Action.prototype.numRepeats =function(){

    const repeats= Game_Action_numRepeats.call(this);
    const item = this.item();
    if(item && !item.meta[setting.tag]){
        return repeats;
    }
    if(this.isForOne() && this.isForOpponent()){
        const target =this.opponentsUnit().members()[this._targetIndex];
        if(target){
            const subject =this.subject();
            const addRpeat =getRepeat(subject,target);
            return Math.min(setting.totalLimit,repeats +addRpeat);
        }
    }
    return repeats;
};

}())
