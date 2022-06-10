//@ts-check

//=============================================================================
// Mano_EnemyErase.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022-2022 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 1.0.0 2022/03/09
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================



/*:
 * @plugindesc 敵キャラを逃走させます。ニフラムです。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_EnemyErase.js
 * 
 * @target MZ
 * 
 * @param state
 * @desc 指定したステートが発生している敵を消滅させます。
 * @type state
 * @default 0
 * 
 * @param sound
 * @text 成功時の効果音
 * @type file
 * @dir audio/se/
 * 
 * @help
 * 
 * 敵キャラを消滅させるスキルを作成します。
 * 消滅した敵からは経験値・お金などの報酬を得られません。
 * 消滅の成功判定には、ステートの付与に成功したかで判定します。
 * 
*/
(function(){
    'use strict';
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_EnamyErase');
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    
    const setting = (function(){
        const param =getParam();
        const result ={
            stateId:Number(param.state),
            sound:String(param.sound),

        };
        return result;
    })();

const Game_Enemy_addNewState=Game_Enemy.prototype.addNewState;
Game_Enemy.prototype.addNewState =function(stateId){
    Game_Enemy_addNewState.call(this,stateId);
    if(stateId===setting.stateId){
        this.hide();
        AudioManager.playSe({
            name:setting.sound,
            pan :0,
            pitch:100,
            pos:0,
            volume:100
        })
    }
};

}());
