 //=============================================================================
// Mano_EventTarget.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMZ
// ----------------------------------------------------------------------------
//=============================================================================

/*:
 * @plugindesc キャラクターの動作指定を簡単にします
 * @author しぐれん
 * 
 * @target MZ
 * 
 * @command StartEventAction
 * @text イベント指定でコモン実行
 * @desc マップ上のイベントを対象とし、
 * コモンイベントを呼び出します
 * @arg targetEvent
 * @text 対象のイベント
 * @type number
 * @desc イベントの番号を指定します。
 * 0を指定すると、「このイベント」を対象にします。
 * @type number
 * @default 0
 * 
 * @arg actionCommonEvent
 * @text 呼び出すコモンイベント
 * @desc 動作内容を記載したコモンイベント。
 * 「移動ルートの設定」で対象を「このイベント」にして動作させてください。
 * @type common_event
 * @default 0
 * 
 * 
 * @command ReflectActorsInTheEvent
 * @text イベントをアクターに変化
 * @desc 指定したイベントの見た目をアクターに対応したものにします。
 * 
 * @arg actorIndex
 * @text アクターの指定(並び順)
 * @desc パーティの並び順を基準に、アクターを指定します。
 * ※先頭から順に0,1,2,3...と割り振られています。
 * @type number
 * @default 0
 * 
 * @arg targetEvent
 * @text イベント番号
 * @type number
 * @desc 0を指定すると、このイベントを対象にします。
 * @type number
 * @default 0
 * 
 * @arg whenActorEmpty
 * @text アクターがいない場合の挙動
 * @type select
 * @option 変化しない
 * @value notChange
 * @option 消える
 * @value vanish
 * @default notChange
 * 
 * 
 * 
 * 
 * 
 * @command resetEventImage
 * @text 見た目を元に戻す
 * @desc イベントの見た目を元に戻します
 * 
 * @arg targetEvent
 * @text 対象のイベントID/target
 * @type number
 * @desc 0を指定すると、このイベントを対象にします。
 * @type number
 * @default 0
 * 
 * @command convertEvent
 * @text 見た目を変換
 * @desc イベントグラフィックを一定の変換テーブルに沿って変更します
 * 重い処理なので、頻繁に呼び出すのは避けてください。
 * 
 * @arg targetEvent
 * @text 対象のイベントID/target
 * @type number
 * @desc 0を指定すると、このイベントを対象にします。
 * @type number
 * @default 0
 * 
 * @arg list
 * @desc 画像の変換パターンを定義します
 * @type struct<Character>[]
 * @default []
 * 
 * @help
 * イベントコマンド「移動ルートの設定」は対象を選択する項目があります。
 * そこで「このイベント」に設定した場合、
 * 通常なら呼び出し元のマップイベントが対象になります。
 * 「イベント指定でコモン実行」というプラグインコマンドによって、
 * 対象を切り替え可能にし、柔軟性を高めます。
 * 
 * 他のプラグインコマンドには
 * 「0を指定するとこのイベントを対象にします」と書かれた物があります。
 * これらも「イベント指定でコモン実行」を経由して呼び出すことで、
 * 対象を変更できます。
 * 
 * ■プラグインコマンド(MV)
 * MV/MZでプラグインコマンドを共通化しています。
 * MV環境でのテストは最小限ですが、動きます。
 * 
 * ・StartEventAction 呼び出すコモンイベントID 対象のイベントID
 * マップ上のイベントを対象とし、コモンイベントを呼び出します。
 * イベントIDを指定することで「このイベント」で操作対象となるイベントが変更されます。
 * 例:マップイベント1を対象に、コモンイベント6を呼び出す
 * StartEventAction 1 6
 * 
 * ・ReflectActorsInTheEvent 対象のアクターindex 対象のイベントID
 * 指定したイベントにパーティメンバーの見た目を反映します。
 * 対象イベントとして0を指定すると「このイベント」指定になります。
 * 
 * 例:マップイベント2を対象に、パーティの先頭の見た目を反映
 * ReflectActorsInTheEvent 0 2
 * 
 * 
 * 
*/

/*~struct~Character:
 * @param imageIn
 * @text 変更前の画像
 * @desc ここで指定した画像と一致した場合に、画像を切り替えます。
 * @type file
 * @dir img/characters/
 * 
 * @param indexIn
 * @type number
 * @desc -1を指定すると、indexのチェックをしません
 * @min -1
 * @max 7
 * @default 0
 * 
 * @param imageOut
 * @text 変更後の画像
 * @type file
 * @dir img/characters/
 * 
 * @param indexOut
 * @type number
 * @text 変更後の画像index
 * @max 7
 * @default 0
 */

(function(){
    'use strict';
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_EventTarget');

class PluginCommandCaller{
    /**
     * @param {String} commandName
     * @param {String[]} paramNames 
     * @param  {(arg:any)=>void} func
     */
    constructor(commandName,paramNames,func){
        this._commandName = commandName;
        this._paramNames =paramNames;
        this._func = func;
    }
    /**
     * @param {String[]} mvArgs 
     */
    makeMZ_arg(mvArgs){
        const result ={}
        const len = Math.min(mvArgs.length,this._paramNames.length);
        for(let i=0; i < len;++i){
            const paramName = this._paramNames[i];
            result[paramName] = mvArgs[i];
        }
        return result;

    }
    convertCall(mvArgs){
        const argMZ = this.makeMZ_arg(mvArgs);
        this.callMZ(argMZ);

    }
    callMZ(arg){
        this._func(arg);
    }
}
class PluginManagerMV_T{
    constructor(){
        /**
         * @type {Map<String,PluginCommandCaller>}
         */
        this._map = new Map();
    }
    /**
     * @param {String} commandName 
     * @param {String[]} paramNames
     * @param {(arg)=>void} func 
     */
    registerCommand(commandName,paramNames,func){
        if(Utils.RPGMAKER_NAME ==="MZ"){
            this.registerCommandMZ(commandName,func);
        }else if( Utils.RPGMAKER_NAME ==="MV"){
            this.registerCommandMV(commandName,paramNames,func);
        }
    }
    /**
     * @param {String} commandName 
     * @param {(arg)=>void} func 
     */
    registerCommandMZ(commandName,func){
        PluginManager.registerCommand(PLUGIN_NAME,commandName,func);
    }
    /**
     * @param {String} commandName 
     * @param {String[]} paramNames
     * @param {(arg)=>void} func 
     */
    registerCommandMV(commandName,paramNames, func){
        const funcObj = new PluginCommandCaller(commandName,paramNames,func);
        this._map.set(commandName,funcObj);
    }
    /**
     * @param {String} commandName 
     * @param {String[]} args 
     */
    callMV(commandName,args){
        const func = this._map.get(commandName);
        if(func){
            func.convertCall(args);
            return true;
        }
        return false;
    }

}
const PluginManagerEX=new PluginManagerMV_T();

if(Utils.RPGMAKER_NAME ==="MV"){
    const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand =function(cmd,args){
        if(PluginManagerEX.callMV(cmd,args)){
            return;
        }
        Game_Interpreter_pluginCommand.call(this,cmd,args);
    };
}

/**
 * 
 * @param {Number} index 
 * @param {Game_Character} character 
 */
function testIndex(index,character){
    if(index <0){
        return true;
    }
    return index ===character.characterIndex();

}

PluginManagerEX.registerCommand( "convertEvent",[],function(arg)
{
    const targetEvent = Number(arg.targetEvent);

    const target = getTargetEvent(this,targetEvent)

    if(!target){
        return;
    }
    /**
     * @type {String[]}
     */
    const list =JSON.parse(arg.list);
    for (const iterator of list) {
        const obj = JSON.parse(iterator);
        const index = Number(obj.indexIn);
        if( testIndex( index ,target)){
            if(target.characterName() ===obj.imageIn){
                target.setImage(
                    obj.imageOut,
                    Number(obj.indexOut)
                );
                return;
            }
        }
    }
});

/**
 * 
 * @param {Game_Interpreter} inter 
 * @param {Number} targetEvent 
 */
function getTargetEvent(inter,targetEvent){
    const eventId = targetEvent ===0 ? inter.eventId():targetEvent;
    return $gameMap.event(eventId);
}
/**
 * @param {Game_Interpreter} inter 
 * @param {*} arg 
 */
function ReflectActorsInTheEvent(inter,arg){

    const targetEvent = Number(arg.targetEvent);
    const event = getTargetEvent(inter,targetEvent);
    if(!event){
        return;
    }

    const actorIndex = Number(arg.actorIndex);
    const members = $gameParty.members();
    const actor = members[actorIndex];

    if(actor){
        event.setImage(actor.characterName(),actor.characterIndex());        
        return;
    }
    if(arg.whenActorEmpty ==="vanish"){
        event.setImage("",0);
    }

}
PluginManagerEX.registerCommand( "ReflectActorsInTheEvent",["actorIndex","targetEvent"],function(arg){
    ReflectActorsInTheEvent(this,arg);
})

/**
 * @param {Game_Interpreter} inter 
 * @param {*} arg 
 */
function xxx(inter,arg){
    const commonEventId =Number( arg.actionCommonEvent);
    const target = Number(arg.targetEvent);
    const eventId = target ===0 ? inter.eventId() :target;

    const eventCode =$dataCommonEvents[commonEventId];
    if(eventCode){
        inter.setupChild(eventCode.list,eventId);
    }
}

/**
 * @this {Game_Interpreter}
 */
PluginManagerEX.registerCommand("StartEventAction",["targetEvent","actionCommonEvent"],function(arg){
    xxx(this,arg);
})


/**
 * @param {Game_Interpreter} inter 
 * @param {*} arg 
 */
function resetEventImage(inter,arg){
    const targetEventId = Number(arg.targetEvent);
    const event = getTargetEvent(inter,targetEventId);
    if(event){
        const page= event.page();
        event.setImage(page.image.characterName,page.image.characterIndex);
    }
}
PluginManagerEX.registerCommand("resetEventImage",["targetEvent"],function(arg){
    resetEventImage(this,arg);
})

}())
