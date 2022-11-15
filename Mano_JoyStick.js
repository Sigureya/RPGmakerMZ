//@ts-check
//=============================================================================
// Mano_JoyStick.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022-2022 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 0.9.0 2022/11/12
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc JoyStick
 * @author siguren(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_JoyStick.js
 * 
 * @target MZ
 * @orderAfter VisuMZ_1_OptionsCore
 * @orderAfter MOG_TitleSplashScreen
 * 
 * @command ShowConfig
 * 
 * 
 * @param optionCommandName
 * @text Option Command Name
 * @default JoyStick Setting
 * 
 * 
 * @param applySetting
 * @type struct<Command>
 * @default {"name":"ApplySetting","description":""}
 * @parent optionCommandName
 * 
 * @param resetSetting
 * @type struct<Command>
 * @default {"name":"Reset","description":""}
 * @parent optionCommandName
 * 
 * @param axesTest
 * @type struct<Command>
 * @default {"name":"JoyStickTest","description":""}
 * @parent optionCommandName
 * 
 * 
 * 
 * @param joyStickR
 * @type struct<JoyStick>
 * @default {"variableX":"0","variableY":"0","scele":"5"}
 * 
 * 
 * 
 * @help
 * ゲームパッドのアナログスティックの入力を取得可能にします。
 * 以下の機能を提供します。
 * ・8方向移動(スティックのみ)
 * ・スティックの状態を変数へ書き込み。
 * ・スティックの軸割り当て設定によって、多数のゲームパッドへ対応。
 * 
 * プラグインパラメータで、書き込み先の変数を指定します。
 * 
*/


/*:ja
 * @plugindesc ジョイスティックの入力を扱えるようにします。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_InputConfig.js
 * 
 * @target MZ
 * @orderAfter VisuMZ_1_OptionsCore
 * @orderAfter MOG_TitleSplashScreen
 * 
 * @command ShowConfig
 * 
 * @command ReadAxes
 * @arg target
 * @type select
 * @option 左スティック
 * @value L
 * @option 右スティック
 * @value R
 * @default R
 * 
 * @arg x
 * @type variable
 * @default 0
 * 
 * @arg y
 * @type variable
 * @default 0
 * 
 * @param optionCommandName
 * @text コンフィグ:項目名
 * @default アナログスティック設定
 * 
 * @param applySetting
 * @type struct<Command>
 * @default {"name":"設定を保存","description":"設定を保存します。"}
 * @parent optionCommandName
 * 
 * @param resetSetting
 * @type struct<Command>
 * @default {"name":"リセット","description":"初期設定に戻します。"}
 * @parent optionCommandName
 * 
 * @param axesTest
 * @type struct<Command>
 * @default {"name":"入力検知","description":"スティックを操作して割り当てを決定します。"}
 * @parent optionCommandName
 * 
 * 
 * 
 * @param joyStickR
 * @type struct<JoyStick>
 * @default {"variableX":"0","variableY":"0","scele":"5"}
 * 
 * 
 * 
 * @help
 * ゲームパッドのアナログスティックの入力を取得可能にします。
 * 以下の機能を提供します。
 * ・スティックの状態を変数へ書き込み。
 * ・スティックの軸割り当て設定によって、多数のゲームパッドへ対応。
 * 
 * プラグインパラメータで、書き込み先の変数を指定します。
 * 
*/
/*~struct~Command:
 * @param name
 * @text コマンド名/CommandName
 * 
 * @param description
 * @text 説明文/Description
 * 
 * 
*/
/*~struct~JoyStick:
 * @param variableX
 * @text 変数X/VariableX
 * @type variable
 * @default 0
 * 
 * @param variableY
 * @text 変数Y/VariableY
 * @type variable
 * @default 0
 * 
 * @param scale
 * @type number
 * @desc スティックから受け取った値に乗算を行います。
 * Multiply the value received from the Stick by this value.
 * @decimals 4
 * @default 5.0000
 * 
*/


/*~struct~Listener:
 * @param joyL
 * @type select
 * @option none
 * @value none
 * @option dpad
 * @value dpad
 * @default none
 * 
 * @param joyR
 * @type select
 * @option none
 * @value none
 * @option dpad
 * @value dpad
 * @default none
 * 
 * 
 * 
*/

(function(){
    'use strict';


/**
 * @typedef {object} JoyStickConfig
 * @property {number} rx
 * @property {number} ry
 * @property {number} lx
 * @property {number} ly
 * @property {number} dxAxes DirectInput形式で使う軸
 */
/**
 * @typedef {object} JoyStickAxesConcept
 * @property {(gamepad:Gamepad)=>number} tiltX
 * @property {(gamepad:Gamepad)=>number} tiltY
 * @property {(gamepad:Gamepad)=>boolean} isLeftPressed
 * @property {(gamepad:Gamepad)=>boolean} isRightPressed
 * @property {(gamepad:Gamepad)=>boolean} isUpPressed
 * @property {(gamepad:Gamepad)=>boolean} isDownPressed
 * @property {()=>boolean} isDPAD
 */

/**
 * @typedef {object} CommandItem
 * @property {string} name
 * @property {string} description
 * @property {string} symbol
 */
/**
 * @typedef {Readonly<CommandItem>} ConstCommandItem
 */

/**
 * @typedef {object} CommandList
 * @property {ConstCommandItem} resetSettings
 * @property {ConstCommandItem} test
 * @property {ConstCommandItem} apply
 */

/**
 * @typedef {object} WordSet
 * @property {string} axesNoSignal 
 * @property {string} optionCommandName
 * 
 */

/**
 * @param {Window_Base|Window_Selectable} window_ 
 * @param {Rectangle} rect 
 * @param {(srect:Rectangle)=>void} initFuncton
 */
 function window_initializeMVMZ(window_,rect,initFuncton){
    if(Utils.RPGMAKER_NAME==="MZ"){
        initFuncton.call(window_,rect);
        return
    }
    if(Utils.RPGMAKER_NAME==="MV"){
        initFuncton.call(window_,rect.x,rect.y,rect.width,rect.height);
        return;
    }
    throw( new Error("Unknow RPG MAKER:"+Utils.RPGMAKER_NAME));
}

class I_MVMZ_Workaround{
    /**
     * @returns {Window_Help}
     * @param {Rectangle} rect
     */
    createHelpWindow(rect){
        return null;
    }
    /**
     * @param {Scene_MenuBase} scene 
     */
    mainAreaHeigth(scene){
        return 0;

    }
    /**
     * @param {Number} numLines
     * @param {Boolean} selectable
     */
    calcWindowHeight(numLines,selectable){
        if(selectable){
            return Window_Selectable.prototype.fittingHeight(( numLines))
        }
        return Window_Base.prototype.fittingHeight(numLines);
    }

}
class MV_Impriment extends I_MVMZ_Workaround{
    /**
     * @param {Rectangle} rect 
     * @returns 
     */
    createHelpWindow(rect){
        const lines =this.helpWindowLines()
        return new Window_Help(lines);
    }
    mainAreaHeigth(){
        const helpAreaHeight = this.calcWindowHeight(this.helpWindowLines(),false);
        return Graphics.boxHeight -helpAreaHeight;
    }
    helpWindowLines(){
        return 3;
    }
}

class MZ_Impriment extends I_MVMZ_Workaround{
    /**
     * 
     * @param {Rectangle} rect 
     * @returns {Window_Help}
     */
    createHelpWindow(rect){
        return new Window_Help(rect);
    }
    /**
     * 
     * @param {Scene_MenuBase} scene 
     */
    mainAreaHeigth(scene){
        return scene.mainAreaHeight();
    }
    /**
     * @param {Window_Base} window 
     */
    colorSrc(window){
        return ColorManager;
    }
}


/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_JoyStick');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }

const CONIFG_KEY="JOYSTICK_CONFIG";

class AxesBase{
    /**
     * @param {Gamepad} gamepad 
     * @returns 
     */
    tiltX(gamepad){
        return 0;
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns 
     */
    tiltY(gamepad){
        return 0;
    }
    isDPAD(){
        //DPAD扱いの部分を全部受け取れるようにする
        return  true;
    }
    /**
     * @param {Gamepad} gamepad 
     */
    isLeftPressed(gamepad){
        return false;
    }
    /**
     * @param {Gamepad} gamepad 
     */
    isRightPressed(gamepad){
        return false;
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns 
     */
    isUpPressed(gamepad){
        return false;
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns 
     */
    isDownPressed(gamepad){
        return false;
    }
}

class Joystick_DirectAxes extends AxesBase{
}


class Joystick_Axes extends AxesBase{
    /**
     * @param {number} indexX 
     * @param {number} indexY 
     * @param {number} buttonId
     */
    constructor(indexX,indexY,buttonId){
        super();
        this.setAxesIndexX(indexX);
        this.setAxesIndexY(indexY);
        this.setDpadMode(false);
        this._buttonId =buttonId;
    }
    /**
     * @param {number} index 
     */
    setAxesIndexX(index){
        this._indexX=index;
    }

    /**
     * @param {number} index 
     */
    setAxesIndexY(index){
        this._indexY=index;

    }
    indexX(){
        return this._indexX;
    }
    indexY(){
        return this._indexY;
    }
    /**
     * @param {boolean} value 
     */
    setDpadMode(value){
        this._dpadMode=value;
    }
    isDPAD(){
        return this._dpadMode;
    }

    threshold(){
        return 0.3;
    }

    isStickPressed(){
        return false;
    }

   
    /**
     * @private
     * @param {number} value 
     */
    normalizeBytTresholdvalue(value){
        return Math.abs(value) > this.threshold() ? value:0;
    }
    /**
     * 
     * @param {Gamepad} gamepad 
     * @returns 
     */
    tiltX(gamepad){
        const value = gamepad.axes[this._indexX];
        return this.normalizeBytTresholdvalue(value);
    }
    /**
     * 
     * @param {Gamepad} gamepad 
     * @returns 
     */
    tiltY(gamepad){
        const value = gamepad.axes[this._indexY];
        return this.normalizeBytTresholdvalue(value);
    }


    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isLeftPressed(gamepad){
        return gamepad.axes[this._indexX] < -this.threshold();
    }

    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isRightPressed(gamepad){
        return gamepad.axes[this._indexX] > this.threshold();
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isUpPressed(gamepad){
        return gamepad.axes[this._indexY] < -this.threshold();
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isDownPressed(gamepad){
        return gamepad.axes[this._indexY] > this.threshold();
    }

    /**
     * @param {Gamepad} gamepad 
     */
    signX(gamepad){
        const left = this.isLeftPressed(gamepad) ? 1:0;
        const right = this.isRightPressed(gamepad)? 1:0;
        return left -right;
    }
}

class AxesWriterBase{
    /**
     * 
     * @param {string} name 
     */
    constructor(name){
        /**
         * @readonly
         */
        this._name=name;

    }
    name(){
        return this._name;
    }
    /**
     * @param {number} index 
     */
    setIndex(index){

    }
    getIndex(){
        return -1
    }
}

class AxesWriterX extends AxesWriterBase{
    /**
     * 
     * @param {Joystick_Axes} axes 
     * @param {string} name
     */
    constructor(axes,name){
        super(name);
        this._axes=axes;
    }
    /**
     * @param {number} index 
     */
    setIndex(index){
        this._axes.setAxesIndexX(index);
    }
    getIndex(){
        return this._axes.indexX();
    }
}
class AxesWriterY extends AxesWriterBase{
    /**
     * 
     * @param {Joystick_Axes} axes 
     * @param {string} name
     */
    constructor(axes,name){
        super(name);
        this._axes=axes;
    }
    /**
     * @param {number} index 
     */
    setIndex(index){
        this._axes.setAxesIndexY(index);
    }
    getIndex(){
        return this._axes.indexY();
    }
}


class JoyStickMapper{
    
    constructor(){
        /**
         * @type {Readonly<[Joystick_Axes,Joystick_Axes,Joystick_DirectAxes]>}
         */
         this._axesXX=[
            new Joystick_Axes(0,1,10),
            new Joystick_Axes(2,3,11),
            new Joystick_DirectAxes()
        ];
        this.refreshDPadAxes();
        this._signX = 0;
        this._signY = 0;
    }


    /**
     * @returns {Joystick_DirectAxes}
     */
    dpadXXX(){
        return this._axesXX[2];
    }
    joyRight(){
        return this._axesXX[1];
    }
    joyLeft(){
        return this._axesXX[0]
    }
    /**
     * @returns {ReadonlyArray<AxesWriterBase>}
     */
    createTemporaryMapper(){
        const left = this.joyLeft();
        const right = this.joyRight();

        return [
            new AxesWriterX(left,"LX"),
            new AxesWriterY(left,"LY"),
            new AxesWriterX(right,"RX"),
            new AxesWriterY(right,"RY")
        ];
    }
        /**
     * 
     * @returns {JoyStickConfig}
     */
    createConfig(){
        const right = this.joyRight();
        const left = this.joyLeft();
        return {
            rx:right.indexX(),
            ry:right.indexY(),
            lx:left.indexX(),
            ly:left.indexY(),
            dxAxes:9,
        };
    }
    /**
     * @param {JoyStickConfig} config 
     */
    applyConfig(config){
        if(config){
            const right = this.joyRight();
            right.setAxesIndexX(config.rx);
            right.setAxesIndexY(config.ry);
            const left = this.joyLeft();
            left.setAxesIndexX(config.lx);
            left.setAxesIndexY(config.ly);    
        }
    }
    
    /**
     * @param {number} index 
     * @returns {JoyStickAxesConcept}
     */
    itemAt(index){
        return this._axesXX[index];
    }
    maxItems(){
        return this._axesXX.length;
    }
    refreshDPadAxes(){
        /**
         * @type {ReadonlyArray<JoyStickAxesConcept>}
         */
        this._dpadAxes = this._axesXX.filter( function(g){ return g.isDPAD()});
    }

    /**
     * @param {Gamepad} gamepad 
     */
    updateSign(gamepad){
        let signX=0;
        let signY=0;
        for (const iterator of this._dpadAxes) {
            if(iterator.isDPAD()){
                if(signX ===0){
                    const left = iterator.isLeftPressed(gamepad) ? 1:0;
                    const right = iterator.isRightPressed(gamepad)? 1:0;
                    signX = left - right;
                }
                if(signY ===0){
                    const up = iterator.isUpPressed(gamepad) ? 1:0;
                    const down = iterator.isDownPressed(gamepad)? 1:0;
                    signY = up - down;
                }
            }
        }
        this._signX = signX;
        this._signY = signY;
    }

    signX(){
        return this._signX;
    }
    signY(){
        return this._signY;
    }
}


class JoyStickListenerBase{
    /**
     * 
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){

    }
    onSceneCreate(){}
}

class JoyListner_Picture extends JoyStickListenerBase{
    /**
     * @param {string} filename
     * @param {number} pictureId 
     * 
     * @param {number} scale 
     */
    constructor(filename,pictureId,scale){
        super();
        this._pictureId = pictureId;
        this._scale = scale;
        this._filename=filename;
    }
    /**
     * 
     * @param {string} objText 
     */
    static create(objText){
        const obj =JSON.parse(objText);
        const filename =obj.image;
        const pictureId =Number(obj.pictureId);
        return new JoyListner_Picture(filename,pictureId,10);

    }
    /**
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){
        const picture =$gameScreen.picture(this._pictureId);
        if(picture){
            const x = axes.tiltX(gamepad);
            const y = axes.tiltY(gamepad);
            //@ts-ignore
            picture._x = ( ( x * this._scale) + picture._x).clamp(0,Graphics.boxWidth);
            //@ts-ignore
            picture._y = ( ( y * this._scale) + picture._y).clamp(0,Graphics.boxHeight);
        }
    }
    onSceneCreate(){
        this.showPicuture();
    }
    showPicuture(){
        const picuture =$gameScreen.picture(this._pictureId);
        if(picuture && picuture.name() ===this._filename){
            return;
        }
        $gameScreen.showPicture(this._pictureId,this._filename,0,0,0,100,100,255,0);
    }
}

class JoyListner_Variable extends JoyStickListenerBase{
    /**
     * 
     * @param {number} variableX 
     * @param {number} variableY 
     */
    constructor(variableX,variableY){
        super();
        this._variableX = variableX;
        this._variableY = variableY;
        this.setScale(5);

    }
    /**
     * @param {string} objText 
     * @returns 
     */
    static create(objText){
        const obj =JSON.parse(objText);
        const x = Number(obj.variableX);
        const y = Number(obj.variableY);
        const scale= Number(obj.scale);

        const result= new JoyListner_Variable(x,y);
        result.setScale(scale);
        return result;
    }
    /**
     * @param {number} scale 
     */
    setScale(scale){
        this._scale = scale;

    }

    scale(){
        return this._scale;
    }
    /**
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){
        const x= axes.tiltX(gamepad);
        const y= axes.tiltY(gamepad);
        const scale = this.scale();
        if(this._variableX > 0){
            $gameVariables._data[this._variableX] = x * scale;
        }
        if(this._variableY > 0){
            $gameVariables._data[this._variableY] = y * scale;
        }
    }

}

class JoyListner_Function extends JoyStickListenerBase{
    /**
     * @param {(axes:JoyStickAxesConcept,gamepad:Gamepad)=>void} func 
     */
    constructor(func){
        super();
        this._func=func;
    }
    /**
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){
        this._func(axes,gamepad);
    }

}



class JoyListner_AsDpad  extends JoyStickListenerBase{

    
    /**
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){
        if(axes.isUpPressed(gamepad)){
            this.write(gamepad,12)
        }else if(axes.isDownPressed(gamepad) ){
            this.write(gamepad,13);
        }
        if(axes.isLeftPressed(gamepad)){
            this.write(gamepad,14) 
        }else if(axes.isRightPressed(gamepad)){
            this.write(gamepad,15)
        }
    }
    /**
     * @param {Gamepad} gamepad 
     * @param {Number} buttonIndex 
     */
    write(gamepad,buttonIndex){
        const buttonName= Input.gamepadMapper[buttonIndex];
        if(buttonName){
            //Input._currentState[buttonName] =true;
        }
        if(Input._gamepadStates[gamepad.index]){

            //Input._gamepadStates[gamepad.index][buttonIndex] =true;
        }
    }

}

class JoyListner_CharacterMove extends JoyStickListenerBase{
    /**
     * @returns {Game_Character}
     */
    targetCharacter(){        
        return $gamePlayer;
    }
    /**
     * @param {Game_Character} character 
     * @returns 
     */
    canMove(character){
        if(character.isMoving()){
            return false;
        }
        if(character ===$gamePlayer){
            return $gamePlayer.canMove();
        }
        return true;

    }
    /**
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){
        //TODO:通常の動作を封じるにはdir4を0にして入力を消せばいい
        //アクターの移動は、これしか参照していない
        //キャラクターの動作指定でやると、通れない場合に困る
        //傾きの大きい方に合わせて、適当に調整
        //壁刷り移動

        const character =this.targetCharacter();
        if(character && !this.canMove(character)){
            return;
        }

        const vecX = axes.tiltX(gamepad);
        const vecY = axes.tiltY(gamepad);
        if(vecX !==0 || vecY !==0){
            Input._dir4=0;
            const movementData= this.gggDirection(character,vecX,vecY);
            character.setDirection(movementData.dir4);
            if(movementData.success){
                if(character ===$gamePlayer){
                    $gamePlayer.followers().updateMove();
                }
                character._x = movementData.posX;
                character._y = movementData.posY;
                character.increaseSteps();
            }
        }
    }

    /**
     * @returns {{
     * dir4:(2|4|6|8),
     * success:boolean,
     * posX:number,
     * posY:number,
     * }}
     * @param {Game_Character} character 
     * @param {number} vecX 
     * @param {number} vecY 
     */
    gggDirection(character,vecX,vecY){
        const horz = this.sign(vecX,6,4);
        const vert = this.sign(vecY,2,8);
        const posX1 =character.x;
        const posY1 =character.y;
        const posX2 = $gameMap.roundXWithDirection(posX1,horz);
        const posY2 = $gameMap.roundYWithDirection(posY1,vert);
        //実装内容はGame_Character.canPassDiagonallyを参照

        //向きは必要なので、先に取る
        const dir4 = this.dir4(vecX,vecY);

        //斜めの移動先は侵入可能? 
        const passVert =character.canPass(posX1,posY1,vert);
        if(passVert && horz !==0 && character.canPass(posX1,posY2,horz)){
            //斜め移動が可能
            return {
                success:true,
                dir4,
                posX:posX2,
                posY:posY2,
            };
        }
        const passHorz =character.canPass(posX1,posY1,horz);
        if(passHorz &&  vert !==0 && character.canPass(posX2,posY1,vert)){
            //斜め移動が可能
            return {
                success:true,
                dir4,
                posX:posX2,
                posY:posY2,
            };
        }
        //斜め移動ができない

        //縦向き移動可能？
        if(passVert && dir4 ===vert ){
            //縦方向に移動
            return {
                success:true,
                dir4,
                posX:posX1,
                posY:posY2,
            };
        }
        //横向き移動可能？
        if(passHorz && dir4 ===horz){
            return {
                success:true,
                dir4,
                posX:posX2,
                posY:posY1,
            }
    
        }

        //座標を更新せず、移動は行わない
        return {
            success:false,
            dir4,
            posX:posX1,
            posY:posY1,
        }
    }
    /**
     * 
     * @template {Number} T 定数時に表示内容を絞るためにTemplateにする
     * @param {number} value 
     * @param {T} plus 
     * @param {T} minus 
     */
    sign(value,plus,minus){
        if(value > 0){
            return plus;
        }
        if(value < 0){
            return minus;
        }
        return 0;

    }

    /**
     * @returns {number} 向き。テンキー方式で返す
     * @param {number} x 
     * @param {number} y 
     */
    direction(x,y){
        const signX = this.sign(x,1,-1);
        const signY = this.sign(y,1,-1);
        return Input._makeNumpadDirection(signX,signY);
    }
    /**
     * @param {number} vecX 
     * @param {number} vecY 
     */
    dir4(vecX,vecY){
        const absX = Math.abs(vecX);
        const absY = Math.abs(vecY);
        if(absX > absY){
            return vecX >0 ? 6 : 4;
        }
        return vecY > 0 ? 2: 8;
    }



    
}

//シーンごとに挙動を調整するのに使うディクショナリ
class AxesListnerDictionary{
    /**
     * 
     * @param {ReadonlyMap<string,ReadonlyArray<JoyStickListenerBase>>} map 
     * @param {ReadonlyArray<JoyStickListenerBase>} fallback
     */
    constructor(map,fallback){
        this._map = map;
        this._fallback = fallback;
    }
    /**
     * @param {string} sceneName 
     */
    getListener(sceneName){
        const list = this._map.get(sceneName);
        if(list){
            return list;
        }
        return this._fallback;
    }

    // /**
    //  * 
    //  * @param {string} sceneName 
    //  * @param {ReadonlyArray<JoyStickListenerBase>} list 
    //  */
    // set(sceneName,list){
    //     this._map.set(sceneName,list);
    // }
}
/**
 * @param {Readonly<Gamepad>} gamepad 
 * @returns {Readonly<Gamepad>}
 */
function cloneGamepad(gamepad){
    return {
        buttons:Array.from(gamepad.buttons),
        axes:Array.from(gamepad.axes),
        index:gamepad.index,
        timestamp:gamepad.timestamp,
        connected:gamepad.connected,
        id:gamepad.id,
        mapping:gamepad.mapping,
        hapticActuators:Array.from(gamepad.hapticActuators||[]),
    }
}

class JoyStickManager_T{

    /**
     * @param {Readonly<WordSet>} word
     * @param {Readonly<CommandList>} commnad
     * 
     * @param {AxesListnerDictionary} listenerMap 
     * @param { I_MVMZ_Workaround} workaround
     */
    constructor(word,commnad,listenerMap,workaround){
        this.clearGamepadState();
        /**
         * @readonly
         */
        this._workaround = workaround;
        this._word =word;
        this._command =commnad;
        this._listnersMap =  listenerMap;
        this._joyStickMapper = new JoyStickMapper()
        /**
         * @type {JoyStickListenerBase[]}
         */
        this._listners =[];
        this.changePadStateCopyMode(false);
    }
    /**
     * @param {Gamepad} gamepad 
     */
    copyGamepadState(gamepad){
        this._gamepadV2 = cloneGamepad(gamepad);
    }
    clearGamepadState(){
        this.copyGamepadState({
            axes:[],
            buttons:[],
            connected:false,
            hapticActuators:[],
            id:"empty init data",
            index:NaN,
            mapping:"",
            timestamp:0,
        } );
    }
    /**
     * 
     * @param {number} index 
     * @returns 
     */
    axesValue(index){
        return this._gamepadV2.axes[index] ||0;
    }
    numAxes(){
        return this._gamepadV2.axes.length;
    }
    isGamepadConected(){
        return this._gamepadV2.connected;
    }
    gamepadDescriptionText(){
        const numButtons = this._gamepadV2.buttons.length;
        return `name:${this._gamepadV2.id}\nbuttons:${numButtons.toString().padStart(2)}`
    }

    workaround(){
        return this._workaround;
    }
    word(){
        return this._word;
    }
    commandList(){
        return this._command;
    }
    maximumAxesValueIndex(){
        let lastIndex=0;
        let lastValue=-1;
        for(let index = 0; index < this._gamepadV2.axes.length;++index){
            const abs = Math.abs(this.axesValue(index));
            if(abs <=1 && abs > lastValue){
                lastIndex = index;
                lastValue =abs;
            }
        }
        return lastIndex;
    }
    createMapperTemporay(){
        return this._joyStickMapper.createTemporaryMapper();
    }
    /**
     * @param {boolean} value 
     */
    changePadStateCopyMode(value){
        //this._needsAxesStateCopy=value;
        //this.clearGamepadState();
    }
    startConfigScene(){
        SceneManager.push(Scene_JoyStickConfig);
        this.changePadStateCopyMode(true);
    }


    /**
     * @param {number} index
     * @param {JoyStickListenerBase} listener 
     */
    setXXX(index,listener){
        this._listners[index] = listener;
    }
    /**
     * @param {Readonly<Gamepad>} gamepad 
     */
    updateGamepadState(gamepad){
        this.copyGamepadState(gamepad);
        this._joyStickMapper.updateSign(gamepad);        
    }
    onUpdateScene(){
        if(this._gamepadV2 && this._gamepadV2.connected){
            this.updateListener(this._gamepadV2);
        }
    }
    /**
     * @private
     * @param {Gamepad} gamepad 
     */
    updateListener(gamepad){
        const length = Math.min(this._listners.length,this._joyStickMapper.maxItems());
        for(let i =0; i < length;++i){
            const listener =this._listners[i] ;
            if(listener){
                //indexが同じ組み合わせで、mapperとlistenerを組み合わせる
                //mapperはaxesの番号を決める、listnerは情報の解釈を決める
                const axes = this._joyStickMapper.itemAt(i);
                if(axes){
                    listener.updateListner(axes,gamepad);
                }
            }
        }
    }
    createConfig(){
        return this._joyStickMapper.createConfig();
    }
    /**
     * @param {JoyStickConfig} config 
     */
    applyConfig(config){
        this._joyStickMapper.applyConfig(config);
    }
    resetConfig(){
        this.applyConfig({
            dxAxes:-1,
            lx:0,
            ly:1,
            rx:2,
            ry:3,
        });
    }

    signX(){
        return this._joyStickMapper.signX();
    }
    signY(){
        return this._joyStickMapper.signY();
    }
    /**
     * @description シーンに応じて、ボタン挙動の割り当てを行う
     * @param {string} sceneName 
     */
    onSceneCreate(sceneName){
        const list = this._listnersMap.getListener(sceneName);
        if(list){
            this._listners =Array.from(list);
        }else{
            this._listners =[];
        }
        for (const iterator of this._listners) {
            if(iterator){
                iterator.onSceneCreate();
            }
        }
    }
}



const JoyStickManager=(function(){

    /**
     * @returns {Readonly<CommandItem>}
     * @param {string} symbol
     * @param {string} text 
     */
    function createCommandItem(symbol,text){
        const obj=JSON.parse(text);
        return {
            description:String(obj.description),
            name:String(obj.name),
            symbol:symbol,
        };
    }


    const param = getParam();

    /**
     * @type {CommandList}
     */
    const command ={
        resetSettings:createCommandItem("reset",param.resetSetting),
        apply:createCommandItem("save",param.applySetting),
        test:createCommandItem("test",param.axesTest),
    };
    /**
     * @type {WordSet}
     */
    const wordSet={
        optionCommandName:String(param.optionCommandName),

        axesNoSignal:"このaxesはシグナルがありません。",
    };
    const v = JoyListner_Variable.create(param.joyStickR);
    //const dpad = new JoyListner_AsDpad();
    const playerMove =new JoyListner_CharacterMove();
    /**
     * @type {Map<string,ReadonlyArray<JoyStickListenerBase>>}
     */
    const listenerMap =new Map();
    listenerMap.set("Scene_Map",[playerMove,v]);

    const axesDic = new AxesListnerDictionary(
        listenerMap,
        [] //JOY_L,JOY_R,DPADの順で、mapperが配置される。それに対応するのがこの並び
    );
    const workaround = Utils.RPGMAKER_NAME ==="MZ" ? new MZ_Impriment(): new MV_Impriment();
    const manager= new JoyStickManager_T(wordSet,command,axesDic,workaround);
    return manager;
}());

class Window_AxesState extends Window_Selectable{
    initialize(rect){
        window_initializeMVMZ(this,rect,super.initialize);
    }
    update(){
        //this._list =JoyStickManager.getLastAxesState();
        this.refresh();    
        this.updateInputTest();
        super.update()
    }
    isInputTestMode(){
        return this._cursorFixed;
    }
    updateInputTest(){
        if(this.isInputTestMode()){
            const index= JoyStickManager.maximumAxesValueIndex();
            if(index !==this.index()){
                this.select(index);
            }
        }
    }
    startInputTestMode(){
        this.setCursorFixed(true)
    }
    endInputTestMode(){
        this.setCursorFixed(false);
    }
    /**
     * 
     * @param {number} index 
     * @returns 
     */
    axesValue(index){
        return JoyStickManager.axesValue(index);
    }
    /**
     * @param {number} index 
     */
    isItemEnabled(index){
        return JoyStickManager.axesValue(index) !==0;
    }
    isCurrentItemEnabled(){
        return this.isItemEnabled(this.index());
    }
    maxItems(){
        return JoyStickManager.numAxes();
    }
    /**
     * @param {number} index 
     */
    drawItem(index){
        const value =  this.axesValue(index);
        const rect = this.itemRectWithPadding(index);
        this.changePaintOpacity(value !==0);
        const valueText =`${( value < 0 ? "":" ")}${value.toFixed(4)}`;
        const text= `axes[${index.toString().padStart(2)}]:${valueText}`;
        this.drawText(text,rect.x,rect.y,rect.width);
    }
    updateHelp(){
        const value = this.axesValue(this.index());
        if(value ===0){
            this._helpWindow.setText(JoyStickManager.word().axesNoSignal)

        }else{
            this._helpWindow.clear();
        }
    }
}

class Window_JoyStickMapper extends Window_Selectable{
    initialize(rect){
        this._list =JoyStickManager.createMapperTemporay();
        window_initializeMVMZ(this,rect,super.initialize);
    }
    updateHelp(){
    }
    activate(){
        super.activate();
        if(this._helpWindow){
            this._helpWindow.setText(JoyStickManager.gamepadDescriptionText());
        }
    }
    /**
     * @param {number} index 
     * @returns 
     */
    itemAt(index){
        return this._list[index];
    }
    currentItem(){
        return this.itemAt(this.index());
    }
    maxItems(){
        return this._list.length;
    }
    /**
     * @param {number} index 
     */
    drawItem(index){
        const item = this.itemAt(index);
        if(item){
            const rect = this.itemRectWithPadding(index);

            this.drawAxes(rect,item.name(),item.getIndex())

        }
        
    }

    /**
     * @param {Readonly<Rectangle>} rect 
     * @param {string} name 
     * @param {number} axesIndex 
     */
    drawAxes(rect,name,axesIndex){
        const nameWidth =this.nameWidth();
        this.drawText(name,rect.x,rect.y,nameWidth);
        const axesIndexText =`axes:${axesIndex}`;
        this.drawText(axesIndexText,rect.x + nameWidth,rect.y,80,"right");
    }
    nameWidth(){
        return 200;
    }
}

/**
 * @extends {Window_Command<string>}
 */
class Window_JoyConfigCommand extends Window_Command{
    initialize(rect){
        window_initializeMVMZ(this,rect,super.initialize);
    }

    maxCols(){
        return 2
    }
    updateHelp(){
        super.updateHelp();
        this._helpWindow.setText(this.currentExt()||"");
    }
    drawItem(index){
        const rect = this.itemRectWithPadding(index);
        this.drawText(this.commandName(index,),rect.x,rect.y,rect.width);
    }
    hideCursor(){
        this.cursorVisible=false;
    }
    activate(){
        super.activate();
        this.cursorVisible=true;
    }
    /**
     * 
     * @param {Readonly<CommandItem>} word 
     * @param {boolean} enabled
     */
    addCommandWord(word,enabled=true){
        this.addCommand(word.name,word.symbol,enabled,word.description);

    }
    makeCommandList(){
        const command = JoyStickManager.commandList();
        const coneted = JoyStickManager.isGamepadConected();
        this.addCommand("直接設定","axes",coneted,"Axes設定を直接行います。");
        this.addCommandWord(command.test);
        this.addCommandWord(command.resetSettings);
        //this.addCommandWord(command.apply);

    }
}
const JOY_STICK_WINDOW_WIDTH=300;

class Scene_JoyStickConfig extends Scene_MenuBase{
    createAllWindows(){
        this.createHelpWindow();
        this.createAxesStateWindow();
        this.createCommandWindow();
        this.createMapperWindow();
    }
    create(){
        super.create();
        this.createAllWindows();
    }
    joyStickWindowWidth(){
        return JOY_STICK_WINDOW_WIDTH;;
    }
    joyStickStateWindowRect(){
        const width =this.joyStickWindowWidth();
        const height= JoyStickManager.workaround().mainAreaHeigth(this);
        //const height= this.mainAreaHeight();
        return new Rectangle(Graphics.boxWidth-width,this.mainAreaTop(),width,height);
    }
    commandWindowRect(){
        const mapperHeight=this.mapperWindowHeight();
        const width =Graphics.boxWidth -this.joyStickWindowWidth();
        const height = this.mainAreaHeight()-mapperHeight;
        const y = this.mainAreaTop()+mapperHeight;
        return new Rectangle(0,y,width,height);
    }
    mapperWindowHeight(){
        return this.calcWindowHeight(5,true);
    }
    mapperWindowRect(){

        const width =Graphics.boxWidth -this.joyStickWindowWidth();
        const height = this.mapperWindowHeight();
        return new Rectangle(0,this.mainAreaTop(),width,height);        
    }

    createCommandWindow(){
        const word = JoyStickManager.commandList();
        const rect = this.commandWindowRect();
        const cmd = new Window_JoyConfigCommand(rect);
        cmd.setHelpWindow(this._helpWindow);
        cmd.select(0);
        cmd.deactivate();
        cmd.setHandler("cancel",this.onCommandCancel.bind(this));
        cmd.setHandler("axes",this.commandAxes.bind(this));
        cmd.setHandler(word.test.symbol,this.commandTest.bind(this));
        cmd.setHandler(word.resetSettings.symbol,this.commandReset.bind(this));

        cmd.hideCursor();
        cmd.refresh();
        this._commandWindow=cmd;
        this.addWindow(cmd);
    }
    onCommandCancel(){
        this._commandWindow.hideCursor();
        this._mapperWindow.activate();

    }
    commandAxes(){
        this._axesStateWindow.endInputTestMode();
        const mapperItem= this._mapperWindow.currentItem();
        if(mapperItem){
            const axesIndex =mapperItem.getIndex();
            if((0 <= axesIndex && axesIndex < this._axesStateWindow.maxItems())){
                this._axesStateWindow.select(axesIndex);
            }else{
                this._axesStateWindow.select(0);
            }
        }
        this._axesStateWindow.activate();
    }
    commandTest(){
        this._axesStateWindow.startInputTestMode();
        this._axesStateWindow.activate();
    }
    commandReset(){
        JoyStickManager.resetConfig();
        this._mapperWindow.refresh();
        this._commandWindow.activate();
    }

    createAxesStateWindow(){
        const rect = this.joyStickStateWindowRect();
        const jssw = new Window_AxesState(rect);
        jssw.setHandler("ok",this.onAxesOk.bind(this));
        jssw.setHandler("cancel",this.onAxesCancel.bind(this));
        jssw.setHelpWindow(this._helpWindow);

        this.addWindow(jssw);
        this._axesStateWindow = jssw;
    }
    onAxesOk(){
        this._axesStateWindow.endInputTestMode();
        const item= this._mapperWindow.currentItem();
        if(item){
            const target =this._axesStateWindow.index();
            item.setIndex(target);
            this._mapperWindow.redrawCurrentItem();
        }
        this._axesStateWindow.deselect();
        this._commandWindow.activate();
    }
    onAxesCancel(){
        this._axesStateWindow.endInputTestMode();
        this._axesStateWindow.deselect();
        this._commandWindow.activate();

    }

    createMapperWindow(){
        const rect = this.mapperWindowRect();
        const jmw = new Window_JoyStickMapper(rect);
        jmw.setHelpWindow(this._helpWindow);
        jmw.refresh();
        jmw.select(0);
        jmw.activate();

        jmw.setHandler("ok",this.onMapperOk.bind(this));
        jmw.setHandler("cancel",this.popScene.bind(this));
        this.addWindow(jmw);
        this._mapperWindow=jmw;

    }
    onMapperOk(){
        this._commandWindow.activate();
    }
    terminate(){
        ConfigManager.save();
        super.terminate();
    }

}
if(Utils.RPGMAKER_NAME ==="MV"){
    /**
     * @param {number} numLines 
     * @param {boolean} selectable 
     * @returns 
     */
    Scene_JoyStickConfig.prototype.calcWindowHeight =function(numLines,selectable){
        if(selectable){
            return Window_Selectable.prototype.fittingHeight(( numLines))
        }
        return Window_Base.prototype.fittingHeight(numLines);
    }

    Scene_JoyStickConfig.prototype.mainAreaHeight =function(){
        const helpHeight = this.calcWindowHeight(2,false);
        return Graphics.boxHeight -helpHeight;
    };
    Scene_JoyStickConfig.prototype.mainAreaTop =function(){
        return this.calcWindowHeight(2,false);
    };
    Window_Selectable.prototype.itemRectWithPadding =function(index){
        const rect = this.itemRect(index);
        const padding = this.itemPadding();
        rect.x += padding;
        rect.width -= padding * 2;
        return rect;    
    };


    Window_Selectable.prototype.itemPadding = function(){
        return 8;
    };
    Window_JoyConfigCommand.prototype.windowWidth =function(){
        return Graphics.boxWidth -JOY_STICK_WINDOW_WIDTH;;
    };
}

const Input_updateGamepadState=Input._updateGamepadState;
Input._updateGamepadState =function(gamepad){

    Input_updateGamepadState.call(this,gamepad);
    JoyStickManager.updateGamepadState(gamepad);
};
const SceneManager_updateScene=SceneManager.updateScene;

if(Utils.RPGMAKER_NAME ==="MV"){
    SceneManager.updateScene =function(){
        if(this.isCurrentSceneStarted() ){
            JoyStickManager.onUpdateScene();
        }
        SceneManager_updateScene.call(this);
    }
}else{
    SceneManager.updateScene =function(){
        if(this._scene && this._scene.isStarted() ){
            JoyStickManager.onUpdateScene();
        }
        SceneManager_updateScene.call(this);
    };    
}



const Scene_Base_create=Scene_Base.prototype.create;
Scene_Base.prototype.create =function(){
    Scene_Base_create.call(this);
    JoyStickManager.onSceneCreate(this.constructor.name);
};
const SceneManager_onSceneCreate=SceneManager.onSceneCreate;
SceneManager.onSceneCreate =function(){
    SceneManager_onSceneCreate.call(this);
    JoyStickManager.changePadStateCopyMode( this._scene.constructor.name === Scene_JoyStickConfig.name);
};
const ConfigManager_makeData=ConfigManager.makeData;
ConfigManager.makeData =function(){
    const result =ConfigManager_makeData.call(this);
    const config=JoyStickManager.createConfig();
    result[CONIFG_KEY] = config;
    return result;
};
const ConfigManager_applyData=ConfigManager.applyData;
ConfigManager.applyData =function(config){
    const joyStick = config[CONIFG_KEY];
    if(joyStick){
        JoyStickManager.applyConfig(joyStick);
    }else{
        JoyStickManager.resetConfig();
    }
    ConfigManager_applyData.call(this,config);
};
const JOY_OPTION_SYMBOL="JOYPAD";
const Window_Options_statusText=Window_Options.prototype.statusText;
Window_Options.prototype.statusText =function(index){
    const symbol = this.commandSymbol(index);
    if(symbol ===JOY_OPTION_SYMBOL){
        return "";
    }
   return Window_Options_statusText.call(this,index);
};
const Window_Options_processOk=Window_Options.prototype.processOk;
Window_Options.prototype.processOk =function(){
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if(symbol ===JOY_OPTION_SYMBOL){
        JoyStickManager.startConfigScene();
        this.playOkSound();
        return;
    }

    Window_Options_processOk.call(this);
};
const Window_Options_addVolumeOptions=Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions =function(){
    Window_Options_addVolumeOptions.call(this);
    this.addCommand(JoyStickManager.word().optionCommandName,JOY_OPTION_SYMBOL);
};
if(Utils.RPGMAKER_NAME ==="MZ"){
    PluginManager.registerCommand(PLUGIN_NAME,"ShowConfig",()=>{
        JoyStickManager.startConfigScene();
    });
    PluginManager.registerCommand(PLUGIN_NAME,"ReadAxes",(arg)=>{

    })
}



}())
