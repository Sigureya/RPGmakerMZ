//=============================================================================
// Mano_PartyRotate.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020-2020 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2022/07/31 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================
/*:
 * @plugindesc partyMemberOrder Rotate
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_PartyRotate.js
 * 
 * @target MZ
 * @command rotateForward
 * @text 前方回転/rotateForward
 * @desc partyMember rotateForward
 * Ex:1,2,3,4→2,3,4,1
 * 
 * @command rotateBackward
 * @text 後方回転/rotateBackward
 * @desc partyMember rotateBackward
 * Ex:1,2,3,4→4,1,2,3,
 * 
 * @help
 * パーティメンバーを並び替えて並び替えて回転させます。
 * 戦闘に参加していないキャラはそのままです。
 * 1,2,3,4の並びを2,3,4,1にするなど。
 * 戦闘キャラによってイベントが変わる場合などで便利です。
 * 
 * ■PluginCommand(MV)
 * MemberRoate Forward
 * Ex:1,2,3,4→2,3,4,1
 * 
 * MemberRoate Backward
 * Ex:1,2,3,4→4,1,2,3,
 * 
*/

(function(){

    "use strict";

    const PLUGIN_NAME='Mano_PartyRotate';
    Game_Party.prototype.rotateForward =function(){
        const battleMemberMax =this.maxBattleMembers();
        const otherMember = this._actors.splice(battleMemberMax);
        const top = this._actors.shift();
        this._actors.push(top);
        this._actors.concat(otherMember);
        $gamePlayer.refresh();
    };
    Game_Party.prototype.rotateBackward =function(){
        const battleMemberMax =this.maxBattleMembers();
        const otherMember = this._actors.splice(battleMemberMax);
        const top = this._actors.pop();
        this._actors.unshift(top);
        this._actors.concat(otherMember);
        $gamePlayer.refresh();
    };
if(PluginManager.registerCommand){
    PluginManager.registerCommand(PLUGIN_NAME,"rotateForward",()=>{
        $gameParty.rotateForward();
    });
    
    PluginManager.registerCommand(PLUGIN_NAME,"rotateBackward",()=>{
        $gameParty.rotateBackward();
    });
}
if(Utils.RPGMAKER_NAME==="MV"){
    const MV_PLUGIN_COMMAND ="MemberRoate";
    const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand =function(cmd,args){
        if(cmd===MV_PLUGIN_COMMAND){
            switch(args[0]){
                case "Forward":
                    $gameParty.rotateForward();
                return;
                case "Backward":
                    $gameParty.rotateBackward();
                return;
            }

        }
        Game_Interpreter_pluginCommand.apply(this,arguments);
    };

}



})();
