/*:
 * @plugindesc Provides integration with VisuMZ_1_OptionsCore.
 * @author しぐれん(siguren)
 * 
 * @target MZ
 * @orderAfter VisuMZ_1_OptionsCore
 *  
 * @param lookupTable
 * @desc Set where to allocate the items to be added.
 * @type struct<LookupItem>[]
 * @default ["{\"symbol\":\"GAMEPAD_CONFIG\",\"categoryVisuMZ\":\"General\",\"categoryIconVisuMZ\":\"245\"}","{\"symbol\":\"KEYBOARD_CONFIG\",\"categoryVisuMZ\":\"General\",\"categoryIconVisuMZ\":\"245\"}","{\"symbol\":\"TestData\",\"categoryVisuMZ\":\"Playtest\",\"categoryIconVisuMZ\":\"84\"}"]
 * 
 * @param testData
 * @text TestData/テストデータ
 * @desc For operation test. Use it to practice / learn this plugin.
 * 動作テスト用。このプラグインの練習・学習に使います。
 * @type struct<TestData>
 * @default {"okSound":"Cat","text":"TestData/テストデータ"}
 * 
 * @help
 * Helps add items to VisuMZ_1_OptionsCore.
 * This plugin adds a passage for registration.
 * Complex processing is done inside this plugin, so
 * All you have to do is call the methods of this plugin.
 * 

* ■ How to use the plug-in (for plug-in authors)
 * If VisuMZ_1_OptionsCore is installed,
 * Optional items will not be added in the usual way.
 * There are ways to add it, but you need to decipher and process the obfuscated code.
 * This is a lot of work, so this plugin does the complicated part of the registration process.
 * If VisualStudioCode is installed, you can call the registration function.
 * PP_Option.Manager has a method to do additional processing.
 * Please try the operation yourself from here.
 *  
 * ■ lookup Table
 * Defines which Category the option is assigned to.
 * Also, for Symbol data, we will add candidates if requested by the plugin author.
 * If you would like to add a candidate, please visit the author's Twitter.
 *
 * ■ About test data
 * This item is for understanding what the plugin is doing.
 * Loading plugin parameters is at the bottom of the plugin. * 
 * 
*/


/*:ja
 * @plugindesc VisuMZ_1_OptionsCoreとの連携を提供します。
 * @author しぐれん
 * 
 * @orderAfter VisuMZ_1_OptionsCore
 * @target MZ
 *  
 * @param lookupTable
 * @desc 追加された項目をどこに割り振るかを設定します。
 * @type struct<LookupItem>[]
 * @default ["{\"symbol\":\"GAMEPAD_CONFIG\",\"categoryVisuMZ\":\"General\",\"categoryIconVisuMZ\":\"245\"}","{\"symbol\":\"KEYBOARD_CONFIG\",\"categoryVisuMZ\":\"General\",\"categoryIconVisuMZ\":\"245\"}","{\"symbol\":\"TestData\",\"categoryVisuMZ\":\"Playtest\",\"categoryIconVisuMZ\":\"84\"}"]
 * 
 * @param testData
 * @text TestData/テストデータ
 * @desc 動作テスト用。このプラグインの練習・学習に使います。
 * @type struct<TestData>
 * @default {"okSound":"Cat","text":"TestData/テストデータ"}
 * 
 * @help
 * VisuMZ_1_OptionsCoreへ項目を追加する補助をします。
 * このプラグインは、登録のための窓口を追加します。
 * 複雑な処理はこのプラグインの内部で行いますので、
 * このプラグインのメソッドを呼び出すだけでOKです。
 * 
 * ■プラグインの使い方(プラグイン作者向け)
 * VisuMZ_1_OptionsCoreが導入されていると、
 * 通常の方法ではオプションの項目が追加されなくなります。
 * 追加する方法は存在しますが、難読化されたコードを解読して処理する必要があります。
 * これは手間が大きいので、このプラグインが登録作業の複雑な部分を行います。
 * VisualStudioCodeが導入されているのであれば、登録用の関数を呼び出すことができます。
 * PP_Option.Managerに追加処理を行うメソッドがあります。
 * ここから各自で動作を試してください。
 * 
 * ■lookupTable
 * オプションをどのCategoryに割り振るかを定義します。
 * また、Symbolのデータについてはプラグイン作者からの要望があれば候補を追加します。
 * 候補追加を希望する方は作者のTwitterへどうぞ。
 * 
 * ■テストデータについて
 * この項目はプラグインが何をやっているか理解するための項目です。
 * プラグインパラメータの読み込みは、プラグインの下の方にあります。
 * 
 * 
*/
/*~struct~TestData:
 * @param okSound
 * @type file
 * @dir audio/se/
 * 
 * @param text
 * @type string
 * @default TestData/テストデータ
 * 
 */
/*~struct~LookupItem:
 * @param symbol
 * @type combo
 * @option GAMEPAD_CONFIG
 * @option KEYBOARD_CONFIG
 * 
 * 
 * @param categoryVisuMZ
 * @desc コンフィグ画面での表示名と対応します。
 * @type combo
 * @option General
 * @option UI
 * @option Audio
 * @option Playtest
 * 
 * @param categoryIconVisuMZ
 * @desc VizuMZ_OptioneCoreのアイコンを参考に割り当てを行います。
 * @type number
 * @default 0
 * 
 * 
 **/
var Imported =Imported||{}
Imported.PP_Option =true;
const PP_Option= (function(){

     'use strict';
    if(!Imported.VisuMZ_1_OptionsCore){
         return null;
    }
    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('ManoPP_VisuMZ_OptionCore');
    function getCurrentScriptName(){
       const pluginName = decodeURIComponent(document.currentScript.src).match(/([^/]+)\.js$/);
       if(pluginName){ return pluginName[1];}
       return ''; 
    }
    /**
     * @param {String} officialFileName 
     */
    function TestFileNameValid(officialFileName){
        const currentFileName=getCurrentScriptName();
        if(officialFileName ===currentFileName){ return;}
        const message= `Do not rename the plugin file.<br>`+
                        `Current file name: currentFileName<br>`+
                        `Original file name: officialFileName<br>`+
                        `プラグインファイルの名前を変更してはいけません<br>`+
                        `現在のファイル名: currentFileName<br>`+
                        `本来のファイル名: officialFileName`
        throw new Error(message);
    }
    TestFileNameValid(PLUGIN_NAME);
     class OptionSceneState_T{
        constructor(){
            this.clear();
            
        }
        needsStateSave(){
            this._stateSaveNeeded=true;
        }
        clear(){
            this._stateSaveNeeded=false;
            this.setData(NaN,NaN);

        }
        /**
         * @param {Number} optionIndex 
         * @param {Number} categoryIndex 
         */
        setData(optionIndex,categoryIndex){
            this._optionIndex=optionIndex;
            this._categoryIndex=categoryIndex;

        }
        optionIndex(){
            return -1;
        }

        /**
         * @param {Window_Options} option 
         * @param {Window_Command} optionCategory 
         */
        saveLastState(option,optionCategory){
            if(this._stateSaveNeeded||true){
                this.setData(option.index(),optionCategory.index());
            }
        }
        /**
         * @param {Window_Options} option 
         * @param {Window_Command} optionCategory 
         */
        loadLastState(option,optionCategory){
            //TODO:スクロール位置が勝手に変わる問題は解決不能
            //maxItemsが常に0を返すため、正しく動かすことができない。
            //解決は不可能なので、カーソル位置が不便な状態は諦めてもらう
            if(this._optionIndex >=0 && this._categoryIndex >=0){
                optionCategory.select(this._categoryIndex);
                optionCategory.deactivate();
                const items=option.maxItems();
                if(option.setCategory){
                    const listExt=optionCategory.currentExt()
                    option.setCategory(listExt);
                }
                const items2=option.maxItems()
                //TODO:
                // A process that transitions to another scene during option operation and returns the cursor when it returns.
                // Index can be set, but Window scrolling is not working.
                // I think it's better to include this feature, but since there are current issues, we are considering removing it at the time of release.
                //option.forceSelect(8);
                //TODO
                //OptionCoreが勝手にスクロールさせているので、別の値で上書きする
            option.clearScrollStatus()
              option.forceSelect(this._optionIndex);
              //このタイミングでWindow_Commandのlistが空になっている
              //そのため、リストが空っぽでmaxItems=0である
              option._scrollY =572;
              //option._scrollDuration=0
              option.updateOrigin()
              option.active=true;
            }
            this.clear();
        }

     }

     const OptionSceneState=new OptionSceneState_T();

     class LookupItem{
        constructor(){
            this.setViuzMZ(NaN,"");
        }
        static create(objText){
            const obj=JSON.parse(objText);
            const iconIndex=Number(obj.categoryIconVisuMZ);
            const category=String(obj.categoryVisuMZ);
            const item=new LookupItem();
            item.setViuzMZ(iconIndex,category);
            return {
                item:item,
                symbol:String(obj.symbol),
            };

        }
        /**
         * @param {Number} iconIndex 
         * @param {String} category 
         */
        setViuzMZ(iconIndex,category){
            this._iconIndex=iconIndex;
            this._category=category;
        }
        getVisu(){
            const list= getList();
            for (const iterator of list) {
                if(iterator.Name ===this._category || iterator.Icon ===this._iconIndex){
                    return iterator;
                }
            }
            return null;
        }
     }

     /**
      * @returns { {Name:String,List:[],Icon:Number}[]}
      */
     function getList(){
         return Window_OptionsCategory.categoryList;

     }
     class PP_OptionManager_T{
        constructor(){
            /**
             * @type {PP_OptionInterface[]}
             */
             this._list=[];
            /**
             * @type {Map<String,LookupItem>}
             */
            this._loolupMap=new Map();
        }
        addTestData(){
            const testData=new PP_Option("TestGGG","実験");
            const hint=new LookupItem()
            hint.setViuzMZ(4,"Test");
            this.setItemWithHint(testData,hint);
        }
        /**
         * @param {PP_OptionInterface} option 
         */
        addItem(option){
            this._list.push(option);
        }
        /**
         * @param {PP_OptionInterface} option 
         * @param {LookupItem} hint
         */
        setItemWithHint(option,hint){
            this.addItem(option);
            this._loolupMap.set(option.symbol(),hint);
        }

        /**
         * @param {String} symbol
         * @param {LookupItem} hint 
         */
        addHint(symbol,hint){
            this._loolupMap.set(symbol,hint);
        }
        /**
         * @param {String} symbol 
         * @param {String} text 
         * @param {String} key 
         */
        addBooleanOption(symbol,text,key){
            const option=new PP_OptionBoolean(symbol,text,key);
            this.addItem(option);

        }

        /**
         * @param {String} symbol 
         * @param {String} text 
         * @param {(optionWindow:Window_Options,symbol:String,index:Number)=>void} handler 
         */
        addOption(symbol,text,handler){
            const option=new PP_Option(symbol,text);
            option.setOkHandler( handler );
            this.addItem(option);
        }

        /**
         * @param {String} symbol 
         * @param {()=>String} textHandler 
         * @param {(optionWindow:Window_Options,symbol:String,index:Number)=>void} handler 
         */
        addOptionEX(symbol,textHandler,okHandler){
            const option=new PP_OptionEX(symbol,textHandler,okHandler);
            this.addItem(option);
        }

        /**
         * @param {PP_OptionInterface} option 
         */
        findTargetVisu(option){
            const symbol=option.symbol()
            const hint=this._loolupMap.get(symbol);
            if(hint){
                return hint.getVisu();
            }
            return null;

        }
        /**
         * @param {PP_OptionInterface[]} list 
         */
        makeUnknowVisuMZ(list){


        }
        setupVisuMZ(){
            /**
             * @type {PP_OptionInterface[]}
             */
            const unknowsList=[];
            for (const iterator of this._list) {
                const target=this.findTargetVisu(iterator);
                if(target){
                    const visuData=iterator.createVisuMZ();
                    target.List.push(visuData);
                }else{
                    unknowsList.push(iterator);
                }
            }
            this.makeUnknowVisuMZ(unknowsList);
        }
     }



    /**
     * 
     * @param {PP_OptionInterface} ppOption 
     */
    function createVisuMZ_Data(ppOption){
        return {
            Symbol:ppOption.symbol(),
            TextStr:ppOption.itemName(),
            Icon:ppOption.iconIndex(),
            CursorRightJS:function(xx){
                ppOption.cursorRight();
            },
            CursorLeftJS:function(xx){
                ppOption.cursorLeft();
            },
            DefaultJS:function(optionStruct){
                ppOption.setupDefault(optionStruct);
                //return null;
            },
            DrawJS:function(symbol,index){
                ppOption.render(this,symbol,index);
            },
            EnableJS:function(){
                return ppOption.isEnabled();
            },
            ExtJS:function(){
                return null;
            },
            LoadJS:function(oo){
                //Saveと同様に省略

            },
            SaveJS:function(option,symbol){
                //不要なので省略
                //初期値を生成するならConfigManager.makeData()でデータを生成するべき
                // Omitted because it is unnecessary
                // If you want to generate the initial value, you should generate the data with ConfigManager.makeData ().
            },
            ShowJS:function(){return true},
            ProcessOkJS:function(symbol,index){
                ppOption.processOk(this,symbol,index);
            },

            TextJS:function(){
                return ppOption.itemName();
            },
        }
    }

    class PP_OptionInterface{
        isOptionValid(){
            return true;
        }
        symbol(){
            return "PP_UNKNOWN_SYMBOL";
        }
        createVisuMZ(){
            return createVisuMZ_Data(this);
        }
        /**
         * @param {String} category 
         * @param {String} targetSymbol 
         */
        registerFromThis(category,targetSymbol){

        }
        setupDefault(target){

        }
        align(){
            return "left"
        }
        /**
         * @param {Window_Options} windowOptions 
         * @param {String} symbol 
         * @param {Number} index 
         */
        renderTitle(windowOptions,symbol,index){
            const text=this.itemName();
            const rect=windowOptions.itemRectWithPadding(index);
            const width=rect.width/2
            windowOptions.drawTextEx( text,rect.x,rect.y,width );
        }
        /**
         * @param {Window_Options} windowOptions 
         * @param {String} symbol 
         * @param {Number} index 
         */
        render(windowOptions,symbol,index){
            this.renderTitle(windowOptions,symbol,index);
        }

        /**
         * @param {Window_Options} windowOptions 
         * @param {String} symbol
         * @param {Number} index
         */
        processOk(windowOptions,symbol,index){

        }
        itemName(){
            return "ItemName";
        }
        isEnabled(){
            return true;
        }
        iconIndex(){
            return 0;
        }
        cursorLeft(){

        }
        cursorRight(){

        }
    

    }

    class PP_OptionEX extends PP_OptionInterface{
        /**
         * 
         * @param {String} symbol 
         * @param {()=>String} nameHandler 
         * @param {(optionWindow:Window_Options,symbol:String,index:Number)=>void} okHandler 
         */
        constructor(symbol,nameHandler,okHandler){
            super();
            this._symbol=symbol;
            this._name=nameHandler;
            this._ok=okHandler;
        }
        symbol(){
            return this._symbol;
        }
        itemName(){
            return this._name();
        }
        processOk(w,s,i){
            this._ok(w,s,i);
        }
    }

    class PP_Option extends PP_OptionInterface{
        /**
         * @param {String} symbol 
         * @param {String} text 
         */
        constructor(symbol,text){
            super();
            this.setOkHandler(null);
            this._text=text;
            this._symbol=symbol;
        }
        static createTestData(objText){
            if(!Utils.isOptionValid("test")){
                return null;
            }
            const obj=JSON.parse(objText);
            const result=new PP_Option("TestData",obj.text);
            /**
             * @type {String}
             */
            const sound=(obj.okSound)||null;
            const se={
                name:sound,
                pos:0,
                pan:0,
                pitch:100,
                volume:90,
            }
            result.setOkHandler(function(optionWindow,symbol,index){
                AudioManager.playSe(se);
                optionWindow.activate();
            }  );
            return result;
        }
        symbol(){
            return this._symbol;
        }
        /**
         * 
         * @param {Window_Options} optionWindow 
         * @param {String} symbol 
         * @param {Number} index 
         */
        render(optionWindow,symbol,index){
            const rect=optionWindow.itemRectWithPadding(index);
            optionWindow.drawText(this._text,rect.x,rect.y,rect.width);

        }
        /**
         * @param {Window_Options} optionWindow 
         * @param {String} symbol
         * @param {Number} index
         */
        processOk(optionWindow,symbol,index){
            if(this._handler){
                this._handler(optionWindow,symbol,index);
            }

        }
        /**
         * 
         * @param {(optionWindow:Window_Options,symbol:String,index:Number)=>void} handler 
         */
        setOkHandler(handler){
            this._handler=handler;
        }
    }


    class PP_OptionBoolean extends PP_Option{
        /**
         * @param {String} symbol 
         * @param {String} text 
         * @param {String} key 
         */
        constructor(symbol,text,key){
            super(symbol,text);
            this._key=key;
            this.setStateText("ON","OFF");
        }
        /**
         * @param {String} on 
         * @param {String} off 
         */
        setStateText(on,off){
            this._on=on;
            this._off=off;
        }
        valueKey(){
            return this._key;
        }
        isEnabled(){
            const key=this.valueKey();
            return !!ConfigManager[key];
        }
        processOk(){
            ConfigManager[this._key] =!ConfigManager[this._key];
        }
        cursorLeft(){
            this.processOk();
        }
        cursorRight(){
            this.processOk();
        }
        /**
         * @param {Window_Options} window 
         */
        render(window,symbol,index){
            const rect=window.itemRectWithPadding(index);
            const text=this.itemName();
            const textWidth=rect.width/2;
            window.drawTextEx(text,rect.x,rect.y,textWidth);
            this.renderOnOff(window,rect.x + textWidth,rect.y,textWidth);
        }
        /**
         * @param {Window_Options} window 
         * @param {Number} x 
         * @param {Number} y 
         * @param {Number} width 
         */
        renderOnOff(window, x,y,width){
            const enabled=this.isEnabled();
            const helfWidth=width/2;
            window.changePaintOpacity(enabled);
            window.drawText(this._on,x,y,helfWidth,"center");
            window.changePaintOpacity(!enabled);
            window.drawText(this._off,x + helfWidth+20,y,helfWidth,"center");

        }
    }
    function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }
    const PP_OptionManager = (function(){
        const param =getParam();
        /**
         * @type {String[]}
         */
        const textList=JSON.parse(param.lookupTable);
        const list=textList.map( LookupItem.create );
        const testData=PP_Option.createTestData(param.testData);

        const result =new PP_OptionManager_T();
        for (const iterator of list) {
            result.addHint(iterator.symbol,iterator.item)
        }
        if(testData){
            result.addItem(testData);
        }
        return result;
    })();
//TODO:シーンから抜けてきた場合のコマンド関連
//いつかやる予定だけど、無理っぽいのであきらめ
//資料としてソースは残しておく
// const Window_Options_paint=Window_Options.prototype.paint;
// Window_Options.prototype.paint =function(){
//     Window_Options_paint.call(this);

// };
// const Window_Options_addCommand=Window_Options.prototype.addCommand;
// Window_Options.prototype.addCommand =function(){
//     Window_Options_addCommand.apply(this,arguments);
// }
// const Scene_Options_start=Scene_Options.prototype.start;
// Scene_Options.prototype.start =function(){
//     Scene_Options_start.call(this);
//     OptionSceneState.loadLastState(this._optionsWindow,this._categoryWindow);
// }
// const Scene_Options_terminate=Scene_Options.prototype.terminate;
// Scene_Options.prototype.terminate =function(){

//     OptionSceneState.saveLastState(this._optionsWindow,this._categoryWindow)
//     Scene_Options_terminate.call(this);

// }
// const Scene_Options_popScene =Scene_Options.prototype.popScene;
// Scene_Options.prototype.popScene =function(){
//     OptionSceneState.clear();
//     Scene_Options_popScene.call(this);
// };
const Scene_Boot_terminate=Scene_Boot.prototype.terminate;
Scene_Boot.prototype.terminate=function(){

    PP_OptionManager.setupVisuMZ();
    Scene_Boot_terminate.call(this);
}
const exportClass={
    Manager:PP_OptionManager,
    Interface:PP_OptionInterface,
}
return exportClass;
}())
