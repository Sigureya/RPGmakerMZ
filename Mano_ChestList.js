//=============================================================================
// Mano_ChestList.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2017 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================



/*:
 * @target MZ
 * @plugindesc 現在のマップの宝箱の情報を調べます
 * @author しぐれん（魔のささやき）
 * @help
 * 宝箱扱いしたいイベントのメモ欄に<宝箱>あるいは<chest>と書いてください。
 * 開いているかどうかは、イベントページが最も大きいページかどうかで判定します。
 * グラフィック無しでも宝箱にできます。
 * 
 * プラグインコマンドを使うだけでOKです。
 * 
 * ※以下MV用の設定です。
 * 変数の操作（スクリプト）に以下内容を書くことで、データを取得します。
 * 
 * $gameMap.countChest()
 * 全ての宝箱の数
 * $gameMap.countOpendChest()
 * 開いている宝箱の数
 * $gameMap.countClosedChest()
 * 開けていない宝箱の数
 * 
 * 以下はイベントコマンド「スクリプト」で実行できる内容です。
 * $gameMap.chestFlash()
 * 画面内にある宝箱で、開けていないものをすべて光らせます。
 * 光り方ですが、バルーンの再生で行います。
 * 
 * プラグインコマンド「ChestFlash」で、開けていない宝箱にバルーンが付きます。
 * プラグインコマンド「CountChest」で、開けていない宝箱の数を表示します。
 * 
 * @param balloonId
 * @desc chestFlash()で使用するバルーンの番号です。
 * @type select
 * @option びっくり
 * @value 1
 * @option はてな
 * @value 2
 * @option 音符
 * @value 3
 * @option ハート
 * @value 4
 * @option 怒り
 * @value 5
 * @option 汗
 * @value 6
 * @option くしゃくしゃ
 * @value 7
 * @option 沈黙
 * @value 8
 * @option 電球
 * @value 9
 * @option Zzz
 * @value 10
 * @option ユーザー定義1
 * @value 11
 * @option ユーザー定義2
 * @value 12
 * @option ユーザー定義3
 * @value 13
 * @option ユーザー定義4
 * @value 14
 * @option ユーザー定義5
 * @value 15
 * @default 1
 * 
 * @param flashSound
 * @type file
 * @dir audio/se
 * @default Flash1
 * 
 * @param flashWait
 * @desc プラグインコマンド「ChestFlash」の時に
 * ウェイトするかを設定します
 * @type boolean
 * @default true
 * 
 * @param CountChestText
 * @desc 簡易版盗賊の鼻のメッセージです。
 * @default このあたりにはあと%1個、宝物があるようだ。
 * @parent CountChest
 * 
 * @param CountChestEmptyText
 * @desc 簡易版盗賊の鼻で、
 * アイテムが見つからなかった場合のメッセージ
 * @default このあたりの宝物はすべて手に入れたようだ。
 * @parent CountChest
 * 
 * 
 * @command ChestSearch
 * @desc 現在いるエリアにある宝箱の残り個数を変数に代入します。
 * @text 未取得宝箱の個数を表示
 * 
 * @arg countVarableId
 * @type variable
 * @text 個数を調べる/countChest
 * @desc 開けてない宝箱の個数変数に保存します。
 * @default 0
 * 
 * @command Flash
 * @text 宝箱の発光/ChestFlash
 * @desc 開けてない宝箱を光らせます
 * @type boolean
 * @default true
 * 
 * @command countChest
 * @text 全ての宝箱の数を取得/countChest
 * @desc 全ての宝箱の数を取得
 * @arg variableId
 * @desc 結果を代入する変数
 * @type variable
 * @default 20
 * 
 * @command countOpendChest
 * @text 開いている宝箱の数を取得/countOpendChest
 * @desc 開いている宝箱の数を取得
 * @arg variableId
 * @desc 結果を代入する変数
 * @type variable
 * @default 20
 * 
 * @command countClosedChest
 * @text 開けていない宝箱の数を取得/countClosedChest
 * @desc 開けていない宝箱の数を取得/countClosedChest
 * @arg variableId
 * @desc 結果を代入する変数
 * @type variable
 * @default 20
 * 
 * @command showChestCountMessage
 * @text 開けていない宝箱の数を表示
 * @desc 開けていない宝箱の数をメッセージで表示します。
 * 
*/

/**
 * TODO
 * isChestで、宝箱であるかどうかをチェック
 * レミラーマは、該当するイベントに対してのアニメーション再生で
 * 
 * 指定要素をカウントする関数で、盗賊の鼻
 * タグを切り替えることで、話しかけた重要人物リスト
 * 
 * ■countSelfSwitch(マップID)について
 * 他のマップを調べられるレミラーマです。
 * マップに親子関係がある場合、このマップを再起的に調べます。
 * この関数を使う場合、全てのマップで宝箱に使うセルフスイッチが同じ番号である必要があります。
 * 宝箱以外で指定したセルフスイッチを使うと、正常に動作しません。
 * イベントの簡単作成で宝箱を作成すると、Aが割り当てられるため、Aにすることをお勧めします。
 * 第2引数に'B','C','D'など任意のセルフスイッチに割り当てられるキーを指定することで、
 * 他のセルフスイッチも調べられます。
 * 
 */
(function(){
'use strict'
const PLUGIN_NAME='Mano_ChestList';

const setting=(function(){
    const params = PluginManager.parameters('Mano_ChestList');

    const result ={
        chestTag:'chest',
        chestTagJP:'宝箱',
        balloonId:Number(params.balloonId),
        flashSound:{
            name:String(params.flashSound),
            pan:0,
            pitch:100,
            volume:90,
        },
        flashWait:(params.flashWait==='true'),
        countChestText:String(params.CountChestText),
        countChestEmptyText:String(params.CountChestEmptyText),
    };
    return result;
})();

/**
 * @param {[]} array
 * @param {Function } func
 */
function countIf(array,func){
    var count =0;
    const len =array.length;
    for (var index = 0; index < len; index++) {
        var elem =array[index];

        if(elem&& func( elem )){
            ++count;
        }
    }
    return count;
}

Game_Event.prototype.isChest=function(){
    const meta =this.event().meta;
    return meta.hasOwnProperty(setting.chestTag) || meta.hasOwnProperty(setting.chestTagJP);
};
Game_Event.prototype.chestFlash =function(){
    const flash =this.isClosedChest();
    if(flash){
        this.requestBalloon(setting.balloonId);
    }
    return flash;
};

/**
 * @param {Game_Event} event
 */
function _finalPage(event){
   return event._pageIndex ===event.event().pages.length-1
}
Game_Event.prototype.isOpendChest=function(){
    return  _finalPage(this) &&this.isChest();
};
Game_Event.prototype.isClosedChest =function(){
    return !_finalPage(this) &&this.isChest();
};

function countOpendChest(){
    return $gameMap.countOpendChest();
}
Game_Map.prototype.countOpendChest =function(){
    return countIf(this._events,function(event){
        return event.isOpendChest();
    });
};
function countClosedChest(){
    return $gameMap.countClosedChest();
}

Game_Map.prototype.countClosedChest =function(){
    return countIf(this._events,function(event){
        return event.isClosedChest();
    });
};

Game_Map.prototype.countChest =function(){
    return countIf(this._events,function(event){
        return event.isChest();
    });
};

function countChest(){
    return $gameMap.countChest();
}

/**
 * @return {Game_Event} 最後にバルーンを出したイベント
 */
Game_Map.prototype.chestFlash =function(){
    const events = this.events();
    var lastEvent=null;
    events.forEach(function(event){
        if(event){
            if(event.chestFlash()){
                lastEvent =event;
            }
        }
    });
    if(lastEvent){
        AudioManager.playSe(setting.flashSound);
    }
    return lastEvent;
};

Game_Map.prototype.showChestCountMessage =function(){
    const count = this.countClosedChest();
    if( count >0  ){
        $gameMessage.add(setting.countChestText.format(count));
    }else{
        $gameMessage.add(setting.countChestEmptyText);
    }
};

Game_Interpreter.prototype.chestFlash=function(){
    const event = $gameMap.chestFlash();
    if(setting.flashWait && !!event ){
        this._character =event;
        this.setWaitMode('balloon');
    }
};

const Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command, args){
    if(command ==='ChestFlash'){
        this.chestFlash();
        return;
    }
    if(command ==='CountChest'){
        $gameMap.showChestCountMessage()
        return;
    }
    Game_Interpreter_pluginCommand.apply(this,arguments);
};
if(Utils.RPGMAKER_NAME==="MZ"){

    Game_CharacterBase.prototype.requestBalloon = function(balloonId) {
        $gameTemp.requestBalloon(this, balloonId);
    };
}
PluginManager.registerCommand(PLUGIN_NAME,"Flash",function(arg){
    this.chestFlash();
});

PluginManager.registerCommand(PLUGIN_NAME,"countChest",(arg)=>{
    const variableId = Number(arg.variableId);
    const result = countChest();
    $gameVariables.setValue(variableId,result);
});
PluginManager.registerCommand(PLUGIN_NAME,"countOpendChest",(arg)=>{
    const variableId = Number(arg.variableId);
    const result = countOpendChest();
    $gameVariables.setValue(variableId,result);
});
PluginManager.registerCommand(PLUGIN_NAME,"countClosedChest",(arg)=>{
    const variableId = Number(arg.variableId);
    const result = countClosedChest();
    $gameVariables.setValue(variableId,result);
});
PluginManager.registerCommand(PLUGIN_NAME,"showChestCountMessage",function(){
    $gameMap.showChestCountMessage();
});


})();
