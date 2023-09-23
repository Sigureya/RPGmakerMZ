//========================================================================
// Mano_BackgroundVoice.js
// -----------------------------------------------------------------------
// Copyright (c) 2023-2023 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------
// Version
// ver 1.0.0 2023/09/12
// -----------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//========================================================================
/*:
 * @plugindesc バックグラウンドボイスを実装します。
 * @author しぐれん
 * 
 * @target MZ
 * @orderAfter MOG_TitleSplashScreen
 * 
 * @command ResumeBgv
 * @text BGVの再スタート
 * @desc 一時停止しているBGVを再開します。
 * 
 * 
 * @command PlayBgv
 * @text BGVの再生
 * @arg name
 * @desc ファイルはbgmフォルダに入れてください。
 * @type file
 * @dir audio/bgs/
 * 
 * @arg volume
 * @text 音量
 * @desc ボイスファイルの音量
 * @default 90
 * @min 0
 * @max 100
 * @type number
 *
 * @arg pitch
 * @text ピッチ
 * @desc ボイスファイルのピッチ
 * @default 100
 * @type number
 *
 * @arg pan
 * @text 左右バランス
 * @desc ボイスファイルの左右バランス
 * @default 0
 * @min -100
 * @max 100
 * @type number
 * 
 * @command FadeOut
 * @text BGVのフェードアウト
 * @desc この処理を行うと、Bgvのパラメータが破棄されます。
 * @arg time
 * @text 時間(秒)
 * @type number
 * @default 5
 * 
 * @param voiceFileRegex
 * @text ボイスファイル正規表現
 * @desc  正規表現で合致したファイル名を音声として扱います。
 * 内部的には「"^"+"この文字列"+".+"」で処理しています。
 * @type string
 * @default voice
 * 
 * @param bgvFiles
 * @text BGV一覧
 * @desc 不要ファイル削除からの防衛用です。
 * @type file[]
 * @dir audio/bgs/
 * @defualt []
 * 
 * 
 * @help
 * 以下の仕様で動くバックグラウンドボイスを実装します。
 * ・BGM/BGSとは別のチャンネルであり、これらと並行して再生できる。
 * ・通常のボイス扱いのファイルが再生されると、一時停止される。
 * ・通常のボイス扱いのファイルの再生が終わると、前回の停止位置から再開。
 * 
 * BGVはループ再生可能なファイルである前提です。
 * 
 * ■ボイスファイルの判定方法について
 * ファイルのパスを見て判定しています。
 * 基本的にはse/voice/(音声ファイル)の形になるようフォルダに入れればOKです。
 * 
 * ■再生方法について
 * BGVは読み込み完了後、一時停止した状態で待機します。
 * 
 * ■ボリュームについて
 * BGVのボリュームはMEのボリューム設定をそのまま使います。
 * 
 * ■他のシーンでの再生状況について
 * Scene_Map以外ではBGVは一時停止されます。
 * 
 * ■BgvBufferの破棄タイミングについて
 * Scene_Mapを抜けた時にBgvパラメータがnullの場合、バッファが破棄されます。
 * 
 * 
*/

(function (){
    'use strict';
/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_BackgroundVoice');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }

/**
 * @typedef {{
 *   name:string,
 *   volume:number,
 *   pitch:number,
 *   pan:number,
 *   pos:number,
 * }} AudioParamator
 */

/**
 * 
 * @param {Readonly<AudioParamator>} bgv
 * @param {number} pos 
 */
function cloneAudioParam(bgv,pos){
    const result ={
        name:bgv.name,
        volume:bgv.volume,
        pitch:bgv.pitch,
        pan:bgv.pan,
        pos:pos,
    };
    return result;

}

class BgvManager_T{

    /**
     * @param {RegExp} voiceRegex 
     */
    constructor(voiceRegex){
        this.setBgvBuffer(null);
        /**
         * @type {WebAudio}
         */
        this._bgvBuffer=null;
        /**
         * @readonly
         */
        this._voiceRegex =voiceRegex;

        /**
         * @type {AudioParamator}
         */
        this._currentBgv =null;
        /**
         * @type {AudioParamator}
         */
        this._pasuedBgv =null;

    }
    /**
     * @param {Readonly<AudioParamator>} bgv 
     * @param {number} pos
     */
    bgvXXXX(bgv,pos){
        this._currentBgv =cloneAudioParam(bgv,pos);
    }
    /**
     * @param {WebAudio} audio 
     */
    setBgvBuffer(audio){
        this.stopBgv();

        this._bgvBuffer =audio;
    }
    stopBgv(){
        if(this._bgvBuffer){
            this._bgvBuffer.destroy();
            this._bgvBuffer=null;
            this._currentBgv =null;
        }
    }
    /**
     * @param {number} duration 
     */
    fadeout(duration){
        if(this._bgvBuffer && this._currentBgv){
            this._bgvBuffer.fadeOut(duration);
            this._currentBgv=null;
        }
    }

    onMapTerminate(){
        if(this._currentBgv){
            this.pause();
        }else{
            this.stopBgv();
        }
    }
    onMapStart(){
        this.resume();
    }
    autoPauseOnVoice(){
        this.pause();
    }
    pause(){
        //TODO
        if( this._bgvBuffer){
            this._bgvBuffer.stop();
        }
    }
    resume(){
        //メモ
        //セーブデータ読み込み時は、この機能を使って再開する。
        //読み込み時に、pos=0のbgvデータが送り込まれる
        if(this._bgvBuffer){
            if(!this._bgvBuffer.isPlaying()){
                const pos = this._bgvBuffer.seek();
                this._bgvBuffer.play(true,pos);
            }
        }
    }

    /**
     * @param {Readonly<AudioParamator>} bgv 
     */
    isCurrentBgv(bgv){
        return this._currentBgv && this._bgvBuffer && this._currentBgv.name === bgv.name;
    }

    /**
     * @param {Readonly<AudioParamator>} bgv 
     */
    bgvVolume(bgv){
        return 100;
    }
    
    /**
     * @param {Readonly<AudioParamator>} bgv 
     */
    updateBgvParamaters(bgv){
        const volume = this.bgvVolume(bgv);
        AudioManager.updateBufferParameters(this._bgvBuffer,volume,bgv);
    }

    /**
     * @param {Readonly<AudioParamator>} bgv 
     */
    playBgv(bgv){
        if(this.isCurrentBgv(bgv)){
            this.updateBgvParamaters(bgv);
            return;
        }
        this.stopBgv();
        if(bgv.name){
            this._bgvBuffer = AudioManager.createBuffer("bgs/",bgv.name);
            this.updateBgvParamaters(bgv);
            this._bgvBuffer.play(true,0);
            this._currentBgv = cloneAudioParam(bgv,0);
        }
    }
    /**
     * @param {AudioParamator} bgv 
     */
    replayBgv(bgv){
        if(this.isCurrentBgv(bgv)){
            return;
        }
        this.playBgv(bgv);
        if(this._bgvBuffer){
            this._bgvBuffer.fadeIn(this.replayFadeInTime());
        }
    }
    replayFadeInTime(){
        return 100;
    }

    /**
     * @param {string} filename 
     */
    isVoiceFile(filename){
        return this._voiceRegex.test(filename);
    }
    /**
     * @returns {AudioParamator}
     */
    saveBgv(){
        if(this._currentBgv){
            const pos = this._bgvBuffer ? this._bgvBuffer.seek() :0;
            return cloneAudioParam(this._currentBgv,pos);
        }
        return AudioManager.makeEmptyAudioObject();
    }
}

const BgvManager =(function(){
    const param = getParam();
    const voiceDir = String(param.voiceFileRegex || "voice/"); 
    const manager = new BgvManager_T(new RegExp(`^${voiceDir}.+`));
    return manager
}());

const Game_System_initialize =Game_System.prototype.initialize ;
Game_System.prototype.initialize =function(){
    Game_System_initialize.call(this);

    this._bgvOnSave= null;
};
const Game_System_onBeforeSave =Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave =function(){
    Game_System_onBeforeSave.call(this);
    this._bgvOnSave = BgvManager.saveBgv();
};

const Game_System_onAfterLoad =Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad =function(){
    Game_System_onAfterLoad.call(this);
    BgvManager.playBgv(this._bgvOnSave);
};

const Scene_Title_playTitleMusic=Scene_Title.prototype.playTitleMusic;
Scene_Title.prototype.playTitleMusic =function(){
    Scene_Title_playTitleMusic.call(this);
    BgvManager.stopBgv();
};
const Scene_Map_terminate=Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate =function(){
    Scene_Map_terminate.call(this);
    BgvManager.onMapTerminate();
};
const Scene_Map_start=Scene_Map.prototype.start;
Scene_Map.prototype.start =function(){
    Scene_Map_start.call(this);
    BgvManager.onMapStart();
};

const Game_Interpreter_command250 =Game_Interpreter.prototype.command250;
Game_Interpreter.prototype.command250=function(/**@type {[AudioParamator]}  */params ){
    const result= Game_Interpreter_command250.call(this,params);
    if(BgvManager.isVoiceFile(params[0].name)){
        BgvManager.autoPauseOnVoice();
        const numBuffers = AudioManager._seBuffers.length;
        const lastBuffer = AudioManager._seBuffers[numBuffers-1];
        if(lastBuffer ){
            lastBuffer.addStopListener( ()=>{
                BgvManager.resume();
            } )
        }
    }
    return result;
};
/**
 * @returns {AudioParamator}
 */
function createAudioParam(arg){
    return {
        name :String(arg.name),
        volume:Number(arg.volume),
        pitch:Number(arg.pitch),
        pan:Number(arg.pan),
        pos:0,
    };

}


PluginManager.registerCommand(PLUGIN_NAME,"PlayBgv" ,(arg)=>{
    const param = createAudioParam(arg);

    if(!param.name){
        return;
    }

    BgvManager.playBgv(param);
});

PluginManager.registerCommand(PLUGIN_NAME,"FadeOut",(arg)=>{
    const time =Number(arg.time);
    BgvManager.fadeout(time);
});

}())
