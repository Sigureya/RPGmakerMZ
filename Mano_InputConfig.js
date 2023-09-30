
//=============================================================================
// Mano_InputConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 9.3.0 2023/09/30
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================



/*:
 * @plugindesc ゲームの操作に関する機能をまとめて管理します。
 * ユーザーによる拡張も支援します。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_InputConfig.js
 * 
 * @target MZ
 * @orderAfter VisuMZ_1_OptionsCore
 * @orderAfter MOG_TitleSplashScreen
 * 
 * @command GetButtonName
 * @text GetButton/ボタン名の取得
 * @desc 指定した操作がどのボタンにあるかを返します。
 * Returns which button has the specified action.
 * @arg symbol
 * @type select
 * @option ok(決定)
 * @value ok
 * @option cancel(取り消し)
 * @value cancel
 * @option shift(ダッシュ)
 * @value shift
 * @option menu(メニュー)
 * @value menu
 * @option pageup(前)
 * @value pageup
 * @option pagedown(次)
 * @value pagedown
 * @default ok
 * 
 * @arg nameVariable
 * @text ボタン名称/buttonName
 * @desc ボタン名称を受け取る変数です。
 * Variable to store the result.
 * @type variable
 * @default 0

 * @command GetButtonNameEX
 * @text GetButtonEX/ボタン名の取得
 * @desc 指定した操作がどのボタンにあるかを返します。
 * Returns which button has the specified action.
 * @arg symbol
 * @desc アクションのシンボル
 * 
 * @arg nameVariable
 * @desc ボタン名称を受け取る変数です。
 * Variable to store the result.
 * @type variable
 * @default 0
* 
 * @command IsKeyboardValid
 * @desc キーボードの設定が正しい場合、指定スイッチをONにします。
 * @arg switchId
 * @type switch
 * @default 0
 * @desc 結果を保存するスイッチ
 * Where to save the results
 * 
 * @command GamepadScene
 * @text GamepadScene/ゲームパッド設定を開く
 * @desc ゲームパッド設定のシーンを開きます。
 * Open the gamepad settings scene.
 * 
 * @command KeyboardScene
 * @text KeyboardScene/キーボード設定を開く
 * @desc キーボード設定のシーンを開きます。
 * Open the keyboard settings scene.
 * 
 * @param color
 * @text 色設定/ColorSetting
 * @type struct<ColorManager>
 * @default {"normal":"#880000","mandatory":"#22e488","move":"#22e488"}
 * 
 * @param basicOk
 * @text 決定/ok
 * @type struct<BasicSymbol>
 * @default {"mandatory":"true","name":"{\"jp\":\"決定\",\"en\":\"OK\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicCancel
 * @text 取り消し/cancle
 * @type struct<BasicSymbol>
 * @default {"mandatory":"true","name":"{\"jp\":\"キャンセル\",\"en\":\"cancel\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicShift
 * @text ダッシュ/dash
 * @type struct<BasicSymbol>
 * @default {"mandatory":"true","name":"{\"jp\":\"ダッシュ\",\"en\":\"dash\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicMenu
 * @text メニュー/menu
 * @type struct<BasicSymbol>
 * @default {"mandatory":"true","name":"{\"jp\":\"メニュー\",\"en\":\"menu\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicEscape
 * @text メニュー(2)/menu(2)
 * @type struct<BasicSymbol>
 * @default {"mandatory":"true","name":"{\"jp\":\"メニュー/キャンセル\",\"en\":\"menu/cancel\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicPageup
 * @text 次/next
 * @type struct<BasicSymbol>
 * @default {"mandatory":"true","name":"{\"jp\":\"次\",\"en\":\"next\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param basicPagedown
 * @text 前/prev
 * @type struct<BasicSymbol>
 * @default {"mandatory":"true","name":"{\"jp\":\"前\",\"en\":\"prev\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * 
 * 
 * @param mapperDelete
 * @text 設定を消去/delete
 * @type struct<MultiLangString>
 * @default {"en":"delete","jp":"設定を消去"}
 * 
 * 
 * @param extendsMapper
 * @desc ボタンイベント・追加の入力設定の登録
 * Registration of button events and additional input settings
 * @text 入力拡張/inputExtension
 * @type struct<InputDefine>[]
 * @default []
 * 
 * @param eventList
 * @desc コモンイベントの呼び出し設定(簡単版)
 * Registration of button events and additional input settings
 * @text コモンイベント/CommonEvent
 * @type struct<EventDefine>[]
 * @default []
 * 
 * @param GamepadIsNotConnectedText
 * @text 未接続/GamepadIsNotConnected
 * @desc ゲームパッドが接続されていない場合の文章です。
 * This is the text when the gamepad is not connected.
 * @type struct<MultiLangNote>
 * @default {"jp":"\"ゲームパッドが接続されていません\\nボタンを押して再度試してください\"","en":"\"The gamepad is not connected.\\nPress the button and try again.\""}
 * 
 * @param needButtonDetouchText
 * @text ボタンから手を放すように促すメッセージ
 * @desc キーコンフィグはボタンから手を離さない限り終了しません。
 * 手を放すように促すメッセージを設定します。
 * @type struct<MultiLangNote>
 * @default {"jp":"\"コンフィグを終了するために、\\nボタンから手を放してください。\"","en":"\"Release the button to exit the config.\""}
 * 
 * 
 * 
 * @param saveCommand
 * @text 設定の保存/SaveSetting
 * @type struct<MultiLangString>
 * @default {"en":"seve setting","jp":"設定を保存"}
 * 
 * @param saveValidTest
 * @text 設定検証/Validating the Configuration
 * @desc 入力設定の不備がある場合、保存を禁止。
 * If the input settings are incomplete, save is prohibited.
 * @type boolean
 * @default true
 * 
 * @param saveCommandWidth
 * @text 幅/width
 * @type number
 * @default 4
 * @parent saveCommand
 * 
 * @param saveDescription
 * @text 説明文/Description
 * @type struct<MultiLangString>
 * @default {"en":"seve setting","jp":"設定を保存"}
 * @parent saveCommand
 * 
 * 
 * @param resetCommand
 * @type struct<MultiLangString>
 * @default {"en":"reset","jp":"初期設定に戻す"}
 * 
 * @param resetWidth
 * @type number
 * @default 4
 * @parent resetCommand
 * 
 * @param resetDescription
 * @type struct<MultiLangString>
 * @default {"en":"reset","jp":"初期設定に戻します。"}
 * @parent resetCommand
 * 
 * 
 * @param WASDCommand
 * @type struct<MultiLangString>
 * @default {"en":"WASD","jp":"WASD"}

 * @param WASDwidth
 * @text WASD Command Width
 * @type number
 * @default 3
 * @parent WASDCommand
 * 
 * @param WASDhelp
 * @type struct<MultiLangString>
 * @default {"en":"seve setting","jp":"WASDのキーで移動できるようにします。"}
 * @parent WASDCommand
 *  
 * @param changeKeyLayoutCommand
 * @text キー配置/KeyLayout
 * @type struct<MultiLangString>
 * @default {"jp":"キー配置","en":"Key Layout"}
 * 
 * @param changeKeyLayoutCommandWidth
 * @type number
 * @default 4
 * @parent changeKeyLayoutCommand
 * 
 * 
 * 
 * @param exitCommand
 * @text やめる/exit
 * @type struct<MultiLangString>
 * @default {"en":"exit","jp":"やめる"}
 * 
 * @param exitWidth
 * @type number
 * @default 4
 * @parent exitCommand

 * @param exitHelp
 * @text 説明文
 * @type struct<MultiLangString>
 * @default {"en":"exit","jp":"変更を保存せずにやめる"}
 * @parent exitCommand

* 
 * @param gamepadConfigCommandText
 * @desc ゲームパッドコンフィグを開くコマンドの名前です
 * @type struct<MultiLangString>
 * @default {"en":"gamepad config","jp":"ゲームパッドコンフィグ"}
 * 
 * @param keyConfigCommandText
 * @desc キーコンフィグを開くコマンドの名前です
 * @type struct<MultiLangString>
 * @default {"en":"keyboard config","jp":"キーコンフィグ"}
 * 
 * @param gamepadSceneBackground
 * @type file
 * @dir img/titles1/
 * 
 * @param keySceneBackground
 * @type file
 * @dir img/titles1/
 * 
 * @param SettingsForYEP_OptionsCore
 * @type struct<DisguiseAsYEP>
 * @default {"gamepad":"true","Keyboard":"true"}
 * 
 * @help
 * ※日本語テキストは下の方にあるのでスクロールしてください
 * 
 *  Loads the settings at game startup as initial values.
 * Detects input changes regardless of where the plugin is installed.
 * It is OK even if the button is modified by another plug-in.
 *
 * The config data set by this plug-in is recorded in the file.
 * If you install a new plugin,
 * Please reset the config with "Reset to default" after starting the game.
 *
 * ■ What to do if strange characters such as "? KEY: Symbol" are displayed
 * Occurs because the input added by another plugin is unknown.
 * If the above display is displayed,
 * It can be handled by adding an element to extendsMapper.
 * 1. Add an element
 * 2. Try either of the following AB methods.
 * Copy the character corresponding to A: KEY and paste it into Key Setting.
 * B: Copy the characters corresponding to Symbol and paste them into symbol.
 * Be careful not to confuse the case.
 * 
 * ■ What to do if a display like unknow: XXXX appears
 * The following causes are possible.
 * -Symbols were set after the game started (after Scene_Boot)
 * -Initialization process was not performed correctly
 * It may be improved by moving this plugin down.
 * 
 * ■ Button operation diffusion function
 * If the operation is set by another plugin,
 * May be set on only one of the gamepad / keyboard.
 * In such a case, you can operate it from others by setting it in extendsMapper.
 * For example, suppose that the operation is set when you press only T on the keyboard.
 * If you want to set the operation for the buttons on the gamepad in this state, set as follows.
 * Key setting: T
 * Pad button: (any button number)
 * By doing this, this plugin will read the behavior set for T on the keyboard and
 * Set so that the same function can be used with the buttons on the gamepad.
 * The same is true for the opposite.
 *
 * If the operation is set on both the keyboard and the gamepad,
 * Determine which one to prioritize in the overwrite setting.
 * When using manual symbol settings (for advanced users)
 * Ignore the priority settings and use the contents set manually.
 * 
 * ■ Common event call button
 * extendsMapper has an item called "Events".
 * If you set an event here, the event will be called when the button is pressed.
 * You can use it to create a function to open the map when you press the button.
 * 
 * ■All functions can be used without eval ()
 * There are no items in this plugin that use eval ().
 * If you're writing a JavaScript expression for use with eval (),
 * you're wrong.
 * 
 * ■ If you want to control the transition with a script
 * Used when modifying other plugins or switching scenes directly with a script.
 * SceneManager.push (Mano_InputConfig.Scene_GamepadConfig); // Gamepad Config
 * SceneManager.push (Mano_InputConfig.Scene_KeyConfig); // Keyboard config
 * You can now move to the specified scene.
 * 
 * ゲームの起動時の設定を初期値として読み込みます。
 * プラグインの導入位置に関わらず、入力の変更を検知します。
 * 他のプラグインでボタンが改造されていてもOKです。
 * 
 * このプラグインで設定したコンフィグデータは、ファイルに記録されます。
 * 新しいプラグインを入れた場合、
 * ゲーム起動後にコンフィグを「初期設定に戻す」でリセットしてください。
 * 
 * ■"?KEY:Symbol"のような変な文字が表示される場合の対処法
 * 他のプラグインによって追加された入力が不明なために発生します。
 * 上記のような表示が出ている場合、
 * extendsMapperに要素を追加することで対応できます。
 * 1.要素を追加する
 * 2.下記のABどちらかの方法を試す。
 * A:KEYにあたる部分の文字をコピーして、KeySettingに貼り付ける。
 * B:Symbolにあたる部分の文字をコピーし、symbolに貼り付ける。
 *   大文字・小文字を間違えないように注意すること。
 * 
 * ■unknow:XXXXのような表示が出る場合の対処法
 * 以下の原因が考えられます。
 * ・シンボルの設定がゲーム起動後(Scene_Bootより後)で行われた
 * ・初期化処理が正しく行われなかった
 * このプラグインを下の方に移動することで改善する可能性があります。
 * 
 * ■ボタン操作拡散機能
 * 他のプラグインで操作が設定されている場合に、
 * ゲームパッド・キーボードの片方にしか設定されていない場合があります。
 * そういった場合、extendsMapperで設定を行うことで他からも操作できるようになります。
 * 例えば、キーボードのTにのみ押した場合の動作が設定されているとします。
 * この状態でゲームパッドのボタンにも操作を設定する場合、以下のように設定します。
 * キー設定:T
 * パッドボタン:(任意のボタン番号)
 * こうすることで、このプラグインはキーボードのTに設定されている動作を読み込み、
 * ゲームパッドのボタンでも同じ機能が使えるように設定を行います。
 * 逆の場合も同様です。
 * 
 * キーボードとゲームパッドの双方に操作が設定されている場合、
 * どちらを優先するかを上書き設定で決めます。
 * シンボル手動設定(上級者向け)を使った場合、
 * 優先設定を無視して手動設定による内容を使います。
 * 
 * ■コモンイベント呼び出しボタン
 * extendsMapperには「イベント」という項目があります。
 * ここにイベントを設定すると、ボタンが押された時にイベントを呼び出します。
 * ボタンを押したら地図を開く機能を作る時などに使えます。
 * 
 * ■eval()無しで全機能が使えます
 * このプラグインにはeval()を使う項目はありません。
 * eval()で使うJavaScriptの式を書いている場合、あなたは間違っています。
 * 
 * ■スクリプトで遷移を制御したい場合
 * 他のプラグインを改造したり、スクリプトで直接シーンを切り替える時に使います。
 * SceneManager.push(Mano_InputConfig.Scene_GamepadConfig  );  //ゲームパッドコンフィグ
 * SceneManager.push(Mano_InputConfig.Scene_KeyConfig );       // キーボードコンフィグ
 * これで、指定されたシーンに移動できます。
 * 
 * 更新履歴
 * 2023/09/30 ver 9.2.0
 * PS5 DualSenseで配置が大きく異なるので仮対応
 * 
 * 2023/07/05 ver 9.2.1
 * null参照で落ちる不具合があったのを修正
 * 
 * 2023/04/16 ver 9.2.0
 * 標準の操作の必須指定を変更可能に。
 * その他、軽微なバグ修正。
 * 
 * 2022/10/13 ver 9.0.0
 * 内部処理を作り直し。
 * 
 * 2022/06/10 ver 8.1.0
 * コモンイベントの設定方法が複雑という意見があったので簡易版を作成。
 * 
 * 2022/03/15 ver 8.0.1
 * ゲームパッドコンフィグをリニューアル。
 * MV環境での不具合を修正
 * 
 * 2022/03/08 ver 7.1.0
 * シンボルに対してボタンを割り当てる方式の廃止。
 * メンテナンスコストが大きいため。
 * ver8.0に向けた準備工事。
 * 
 * 2022/01/18 ver7.0.1
 * PP_Optionとの連携関連で不具合があったのを修正。
 * 
 * 2021/12/30 ver7.0.0
 * プラグインパラメータ「入力拡張」を中心に大改造。
 * 
 * 2021/12/24 ver6.3.1
 * エラーメッセージの英語表記を追加。
 * 
 * 2021/12/22 ver6.3.0
 * シンボル設定関連を更新。
 * ヘルプの内容を追加。
 * 
 * 2021/12/18 ver6.2.1
 * ラムダ式関連の記述を修正した際に、バグを埋め込んでいたのを修正。
 * プラグインコマンドを追加。
 * 
 * 2021/11/30 ver6.2.0
 * ManoPP_VisuMZ_OptionCore対応を実装。
 * 
 * 2021/08/30 ver6.1.2
 * 一部環境でラムダ式がエラーを起こすため、使用しない形に修正
 * 一部テキストが日本語のままだったのを英語対応
 * 
 * 2021/07/17 ver6.1.1
 * 拡張入力の上書き設定が機能していないのを修正
 * 
 * 2021/06/13 ver6.1.0
 * シンボルからボタンの名称を取得するプラグインコマンドを追加(MZのみ)
 * 
 * 2021/05/23 ver 6.0.0
 * ゲームパッドにシンボルに対してボタンを割り当てる機能を実装。
 * 
 * 
 * 2021/04/22 ver 5.4.0
 * MZのみ:タッチボタンの表示機能を試験的に実装
 * 
 * 2021/04/15 ver 5.3.1
 * コモンイベント呼び出しを修正(簡単にしました)
 * イベントコマンドでコンフィグを開くと保存されない不具合を修正
 * 
 * 2021/02/23 ver 5.3.0
 * ボタン入力がある時にコモンイベントを呼び出すプラグインコマンドを追加
 * 
 * 2021/01/27 ver 5.2.0
 * 不明なシンボルの表示機能を強化
 * 
 * 2021/01/23 ver5.1.0
 * 画面レイアウトを変更
 * 必須シンボルの扱いを調整
 * 不明なシンボルがある場合、画面上部へ表示するようにした
 * 
 * 2020/12/25 ver5.0.3
 * 必須シンボルチェックの動作が正しくなかったのを修正
 * バージョン管理を修正し、番号付けを変更。
 * 
 * 2020/12/25 ver5.0.2(旧5.2)
 * 拡張シンボル設定にバグがあったので修正
 * 
 * 2020/11/26 ver5.0.1(旧5.1)
 * プラグインが起動できないバグがあったので修正
 * 
 * 2020/11/24 ver5.0
 * プラグインパラメータを再設計。
 * 内部実装であるsymbolを意識する必要が無くなりました。
 * 
 * 2020/08/23 ver4.0
 * ツクールMZに対応。
 * 基本システムはMZ向けに最適化し、MVはラッパーで調整
 * 
 * 2020/05/25 ver 3.2
 * YEP_OptionCoreと競合するので、対策処理を追加。
 * 
 * 2020/04/01 ver 3.1
 * 英語対応につきヘルプを追加。
 * 
 * 2020/03/14 ver3.0
 * WASD移動を設定できる機能を追加。
 * キーコンフィグの内部実装を大幅改造。
 * 
 * 2020/02/26 ver2.9
 * コンフィグから抜けた際にボタンが連打されてしまう問題を対策。
 * RPGアツマールにおいて、他のゲームとコンフィグ設定が混ざる問題を修正。
 * 別プラグインとの競合があったので対策
 * symbolAutoSelectがキーコンフィグで機能していなかったのを修正。
 * 
 * 2019/07/12 ver2.8.1
 * ゲームパッドのハードごとの識別情報を表示する機能を追加。
 * 
 * 2019/07/06 ver2.8
 * 外部プラグインによって追加されたmapperのsymbolを強制的に取り込む機能。
 * プラグインパラメータで無効化できます。
 * 
 * 2019/03/19 ver2.7
 * キーボードに任意の初期設定を割り当てる機能を追加。
 * 
 * 2018/09/28 ver2.6
 * ゲームパッドコンフィグを改造すると誤作動があったので、誤作動を減らす修正。
 * プラグインの位置に関わらず初期設定の変更を捕まえられるように。
 * 
 * 2018/06/25 ver 2.5
 * 色々あった細かいバグ修正を重ねた最新版。
 * 
 * 2017/10/21 ver 2.2　更新
 * 外部から追加したシンボルがsymbolsと重複していた場合、追加しないようにした。
 * USキー配列に仮対応。
 * 
 * 2017/10/18 ver 2.1　更新
 * キーボードで目立ったバグの報告がなかったため、2.0に。
 * 外部からコンフィグを改造できる機能を導入。
 * 
 * 2017/10/13 ver 1.9　更新
 * キーボードのコンフィグにも対応。
 * 仕様が固まっていないので、1.9とします。
 * 2017/10/05 ver 1.0　公開
 * 
 */
/*~struct~BasicSymbol:
 * @param mandatory
 * @text 必須扱い/mandatory
 * @type boolean
 * @default true
 * 
 * @param name
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param keyText
 * @text キーの表示/keyText
 * @desc キーコンフィグの際の表示名を定義します(空欄OK)
 * Define the display name for key config (blank OK)
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param helpText
 * @text 詳細/helpText
 * @desc 画面上部に表示する説明文
 * Description to be displayed at the top of the screen
 * @type struct<MultiLangNote>
 * @default {"jp":"","en":""}
 * 
 */

/*~struct~TouchButton:
 * @param image
 * @type file
 * @dir img/
 * @desc 通常時は上の半分、押されている間は下の半分が使われます。
 * upper is used normally, and lower is used when pressed.
 * @default system
 * 
 * @param x
 * @type number
 * @default 0
 * 
 * @param y
 * @type number
 * @default 0
 * 
*/
/*~struct~EventCaller:
 * @param id
 * @text 呼び出すイベント/event
 * @desc ボタンを押した際に呼び出すコモンイベント(マップのみ)
 * Common event to call when a button is pressed(MapOnly)
 * @type common_event
 * @default 0
 * 
 * @param inputType
 * @text 入力方式/inputType
 * @desc 呼び出し時のボタンの入力形式。
 * Button input format when calling.
 * @type select
 * @option 押されている/pressed
 * @value 0
 * @option トリガー/triggerd
 * @value 1
 * @option リピート/repeated
 * @value 2
 * @default 0
 */
/*~struct~KeyboradSetting:

 * @param keys
 * @type string
 * @desc 半角英字で設定。例 Ef65
 * Set the key corresponding to the action (ex:Ef65)
 *
 * @param exKeys
 * @text 追加のキー
 * @desc 文字以外の特殊なキーを割り当てる場合に使用します。
 * @type select[]
 * @option Tab(9)
 * @value 9
 * @option Shift(16)
 * @value 16
 * @option CTRL(17)
 * @value 17
 * @option Alt(18)
 * @value 18
 * @option pageup(33)
 * @value 33
 * @option PageDown(34)
 * @value 34
 * @option End(35)
 * @value 35
 * @default []
 * 
 * @param text
 * @text キーの表示/keyText
 * @desc キーコンフィグの際の表示名を定義します(空欄OK)
 * Define the display name for key config (blank OK)
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
*/
/*
 * TODO:あとでキー設定にカラーを追加
 * @param color
 * @type combo
 * @option #FF00FF
 * @default 
 * 
 */

/*~struct~AdvancedSetting:
 * @param symbol
 * @text シンボル/symbol
 * @desc ボタンを押した場合の動作(上級者向け)
 * Operation when the button is pressed (for advanced users)
 * @type string
 * @default
 * 
 * @param overwrite
 * @text 上書き/overwrite
 * @desc どのボタンのシンボルを基準にするか
 * Which button symbol to base on
 * @type select
 * @option 上書きしない/none
 * @value 0
 * @option ゲームパッド/gamepad
 * @value 1
 * @option キーボード/Keyboard
 * @value 2
 * @option イベント/event
 * @value 3
 * @default 0
 * 
 * @param mandatory
 * @text 必須フラグ/mandatory
 * @type boolean
 * @default false
 */
/*~struct~EventDefine:
 * 

 * @param key
 * @type select
 * @option none/設定無し
 * @value 
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @default 
 * 
 * @param keyText
 * @desc キーコンフィグの際に表示するテキスト
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * 
 * @param button
 * @text パッドボタン/padButton
 * @desc ボタン設定。配置と名前は任天堂のスタイルを想定。
 * Button settings. The layout and name the style of Nintendo.
 * @type select
 * @default NaN
 * @option none
 * @value NaN
 * @option 0(B/×)
 * @value 0
 * @option 1(A/○)
 * @value 1
 * @option 2(X/□)
 * @value 2
 * @option 3(Y/△)
 * @value 3
 * @option 4(L1)
 * @value 4
 * @option 5(R1)
 * @value 5
 * @option 6(L2)
 * @value 6
 * @option 7(R2)
 * @value 7
 * @option 8(select)
 * @value 8
 * @option 9(start)
 * @value 9
 * @option 10(L3)
 * @value 10
 * @option 11(R3)
 * @value 11
 * @option 16(center)
 * @value 16
 * 
 * @param name
 * @text 行動名/actionName
 * @desc 言語別に行動の説明を入力します
 * Enter a description of the action by language
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param helpText
 * @text 詳細/helpText
 * @desc 画面上部に表示する説明文
 * Description to be displayed at the top of the screen
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param event
 * @text イベント/event
 * @desc ボタンを押した際にコモンイベントを実行します。
 * Executes a common event when the button is pressed.
 * @type struct<EventCaller>
 * @default {"id":"0","inputType":"0"}
 * 
 * @param enabled
 * @text 有効化
 * @desc テスト用に一時的に無効化したい場合などで使います。
 * @type boolean
 * @default true
 */

/*~struct~InputDefine:
 * 
 * 
 * @param keySetting
 * @text キー設定/keySetting
 * @type struct<KeyboradSetting>
 * @default {"keys":"","color":"","text":"{\"jp\":\"\",\"en\":\"\"}"}
 * 
 * @param button
 * @text パッドボタン/padButton
 * @desc ボタン設定。配置と名前は任天堂のスタイルを想定。
 * Button settings. The layout and name the style of Nintendo.
 * @type select
 * @default NaN
 * @option none
 * @value NaN
 * @option 0(B/×)
 * @value 0
 * @option 1(A/○)
 * @value 1
 * @option 2(X/□)
 * @value 2
 * @option 3(Y/△)
 * @value 3
 * @option 4(L1)
 * @value 4
 * @option 5(R1)
 * @value 5
 * @option 6(L2)
 * @value 6
 * @option 7(R2)
 * @value 7
 * @option 8(select)
 * @value 8
 * @option 9(start)
 * @value 9
 * @option 10(L3)
 * @value 10
 * @option 11(R3)
 * @value 11
 * @option 16(center)
 * @value 16
 * 
 * @param name
 * @text 行動名/actionName
 * @desc 言語別に行動の説明を入力します
 * Enter a description of the action by language
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param helpText
 * @text 詳細/helpText
 * @desc 画面上部に表示する説明文
 * Description to be displayed at the top of the screen
 * @type struct<MultiLangString>
 * @default {"jp":"","en":""}
 * 
 * @param event
 * @text イベント/CommonEvent
 * @desc ボタンを押した際にコモンイベントを実行します。
 * Executes a common event when the button is pressed.
 * @type struct<EventCaller>
 * @default {"id":"0","inputType":"0"}
 * 
 * @param touchButton
 * @text タッチボタン/touchButton
 * @type struct<TouchButton>
 * @desc MZのみ:画面上にタッチUI向けのボタンを追加します
 * 
 * @param adovanced
 * @text 上級者向け/adovanced
 * @desc 多くの場合、これを変更する必要はありません。
 * In most cases you do not need to change this.
 * @type struct<AdvancedSetting>
 * @default {"symbol":"","overwrite":"0","mandatory":"false"}
 * 
 * @param enabled
 * @text 有効化
 * @desc テスト用に一時的に無効化したい場合などで使います。
 * @type boolean
 * @default true
 */


/* 
 * @param sourcePlugin
 * @desc 指定した名前のプラグインがONの場合のみ、有効化します
 * @type combo
 * @default
 */


 /*~struct~MultiLangNote:
  * @param jp
  *  @text 日本語
  *  @type multiline_string
  *  @type note
  *  @param en
  *  @type multiline_string
  *  @type note
 */
 /*~struct~MultiLangNoteFull:
  * @param jp
  *  @text 日本語
  *  @type multiline_string
  *  @type note

  *  @param en
  *  @type multiline_string
  *  @type note

  *  @param ch
  *  @text 中文
  *  @type multiline_string
  *  @type note

  *  @param ko
  *  @text 한국
  *  @type multiline_string
  *  @type note

  *  @param ge
  *  @text Deutsche
  *  @type multiline_string
  *  @type note

  *  @param fr
  *  @text français
  *  @type multiline_string
  *  @type note

  *  @param ru
  *  @text русский
  *  @type multiline_string
  *  @type note
 */

 /*~struct~MultiLangString:
  * @param jp
  * @text 日本語

  * @param en
  * @text English
 */

 /*~struct~MultiLangStringFull:
  * @param jp
    @text 日本語

    @param en
    @text English

    @param ch
    @text 中文

    @param ko
    @text 한국

    @param ge
    @text Deutsche

    @param fr
    @text français

    @param ru
    @text русский
 */
 /*~struct~ColorManager:
  * 
  * @param normal
  * @default #880000
  * 
  * @param mandatory
  * @text 必須シンボル/mandatory
  * @default #22e488
  * 
  * @param move
  * @text 移動/move
  * @default #22e488
  * 
  * @param extends
  * @text 拡張シンボル/extends
  * @default #22e488
  * 
  * 
*/
/*~struct~DisguiseAsYEP:
 * @param gamepad
 * @desc Impersonate the configuration as if it were GamepadConfig.js (by Yanfly).
 * @type boolean
 * @default true
 * 
 * @param Keyboard
 * @desc Impersonate the configuration as if it were YEP_KeyboardConfig.js (by Yanfly).
 * @type boolean
 * @default true
 */
//@ts-ignore
var Imported = Imported || {};
if(Imported.Mano_InputConfig){
    throw new Error("Mano_InputConfig is Duplicate")
}
Imported.Mano_InputConfig = true;


const Mano_InputConfig=( function(){
    'use strict'

//型Conceptp宣言 クラスの前方宣言みたいなやつ

    /**
     * @typedef {Object} MyRectType
     * @property {Number} x
     * @property {Number} y
     * @property {Number} width
     * @property {Number} height
     * @property {()=>MyRectType} clone
     */
/**
 * 
 * @typedef {object} CommandConcept
 * @property {()=>string} handle
 * @property {()=>string} name
 * 
 */
/**
 * @typedef {object} KeyConfigWindowConcept
 * @property {(index:number)=>Rectangle} baseRect
 * @property {(index:number)=>Rectangle} itemRect
 * @property {(commandName:string,rect:Rectangle)=>void} drawCommandXX
 * @property {(keyNumber:number)=>I_SymbolDefine} symbolObjectFromKeyNumber
 * @property {(key,inputDef:I_SymbolDefine,rect:Rectangle)=>void} drawInputDefine
 */ 
    const GetEnabledPlugins =function(){
        /**
         * @type {Set<String>}
         */
        const set=new Set();
        for (const iterator of $plugins) {
            if(iterator.status){
                set.add(iterator.name);
            }
        }
        return set;
    }

    /**
     * @type {String}
     */
    const  PLUGIN_NAME= ('Mano_InputConfig');
    function getCurrentScriptName(){
        //@ts-ignore
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
    
    const IS_Atsumaru = location.hostname==="html5.nicogame.jp";

    function getParam(){
        return PluginManager.parameters(PLUGIN_NAME);
    }
    
/**
 * @param {Window_Base|Window_Selectable} window_ 
 * @param {MyRectType} rect 
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
class Scene_MenuBaseMVMZ extends Scene_MenuBase{

    /**
     * @returns {string}
     */
    backgroundBitmapFileName(){
        return "";
    }
    createBackground(){
        const filename = this.backgroundBitmapFileName();
        if(filename){
            const backBitmap = ImageManager.loadTitle1(filename);
            if(backBitmap){
                const sprite = new Sprite(backBitmap);
                this.addChild(sprite);
                return;
            }
        }
        super.createBackground();
    }

    bottomAreaHeight(){
        return 20;
    }
    createHelpWindow(){
        const helpRect = this.helpWindowRect ? this.helpWindowRect():null;
        const hw = InputConfigManager.getWorkaround().createHelpWindow(helpRect);
        this.addWindow(hw);
        this._helpWindow=hw;
    }
    /**
     * @returns {Number}
     */
    mainAreaTop(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return this._helpWindow.y + this._helpWindow.height;
        }
        return Math.max(super.mainAreaTop(),this.helpAreaHeight());
    }
    isBottomButtonMode(){
        return false;
    }
    helpAreaHeight(){
        return this.calcWindowHeight(this.helpWindowLines(), false);
    }
    isBottomHelpMode(){
        return false;
    }
    helpWindowLines(){
        return 2;
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

/**
 * @param {Readonly<InputMapperType>} obj 
 * @returns {Readonly<InputMapperType>}
 */
function objectClone(obj){

    /**
     * @type {Record<Number,String>}
     */
    const result ={};
    Object.keys(obj).forEach(function(key){
        result[key] = obj[key];
    })
    return result;
}

//言語判定
//本体の処理タイミングがおかしいので、コピペしてきた
const isJapanese = function() {
    return $dataSystem.locale.match(/^ja/);
};
const isChinese = function() {
    return $dataSystem.locale.match(/^zh/);
};

const isKorean = function() {
    return $dataSystem.locale.match(/^ko/);
};

const isRussian = function() {
    return $dataSystem.locale.match(/^ru/);
};
class MultiLanguageText{
    /**
     * @param {String} en 
     * @param {String} jp 
     */
    constructor(en,jp){
        this.setNameEN(en);
        this.setNameJP(jp);
        this.setDefaultName("");
    }
    static create(objText){
        if(!objText){
            return null;
        }
        const obj = JSON.parse(objText);
        const en =noteOrString(obj.en||"");
        const jp =noteOrString( obj.jp||"");
        const mtext = new MultiLanguageText(en,jp);
        return mtext;
    }
    isEmpty(){
        return (!this.ja_JP)&&(!this.en_US);
    }
    /**
     * @param {String} name 
     */
    setNameJP(name){
        this.ja_JP =name;
    }
    /**
     * @param {String} name 
     */
    setNameEN(name){
        this.en_US =name;
    }
    /**
     * @param {String} name 
     */
    setDefaultName(name){
        this._defaultName=name;
    }
    isUnknow(){
        return this._defaultName[0]==="?";
    }
    refresh(){
        if(!this.isUnknow()){
            this.setDefaultName(this.currentName());
        }
    }
    currentName(){
        if(isJapanese() && this.ja_JP ){
            return this.ja_JP;
        }
        return this.en_US;
    }
    name(){
        return this._defaultName;
    }
}


class TouchButton{
    /**
     * @param {String} filePath 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(filePath,x,y){
        const result= (/(.*)\/(.*)/).exec(filePath);
        if(result){
            this.setFilePath("img/"+result[1]+"/",result[2]);
        }else{
            this.setFilePath("","");
        }
        this._x = x;
        this._y = y;
        this.setSymbolObject(null);
    }
    /**
     * 
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return null;
        }
        const obj = JSON.parse(objText);
        const x  =Number(obj.x);
        const y = Number(obj.y);
        const button = new TouchButton(obj.image,x,y);
        return button;    
    }
    /**
     * @param {String} folder 
     * @param {String} fileName 
     */
    setFilePath(folder,fileName){
        this._folder =folder;
        this._fileName = fileName;
    }
    isValid(){
        return !!this._fileName;
    }
    /**
     * @param {ExtendsSymbol} symbol 
     */
    setSymbolObject(symbol){
        this._symbol = symbol;
    }
    isVisible(){
        return true;
    }
    bitmap(){
        //@ts-ignore
        return ImageManager.loadBitmap(this._folder,this._fileName);
    }
    rect(){
        return new Rectangle();
    }
    symbol(){
        return this._symbol.symbol();
    }
    symbolObject(){
        return this._symbol;
    }
    x(){
        return this._x;
    }
    y(){
        return this._y;
    }
    isEnabled(){
        return true;
    }
    clearPress(){
        const symbol = this.symbol();
        Input._currentState[symbol]=false;
    }
    virtualPress(){
        const symbol = this.symbol();
        if(!Input._currentState[symbol]){
            Input._currentState[symbol]=TouchInput.isPressed();
        }
    }
}
class ButtonManager_T{
    constructor(){
        /**
         * @type {Array<TouchButton>}
         */
        this._list =[];
    }
    /**
     * @param {ReadonlyArray<TouchButton>} list 
     */
    addButtonList(list){
        this._list.push(...list);
    }
    /**
     * 
     * @returns {ReadonlyArray<TouchButton>}
     */
    getList(){
        return this._list;
    }

    /**
     * @private
     * @param {TouchButton} button 
     */
    addButton(button){
        this._list.push(button);
    }
    isTouchButtonEnabled(){
        return  Utils.RPGMAKER_NAME ==="MZ" && this._list.length > 0;
    }
}
const ButtonManager = new ButtonManager_T();

//todo
//必須シンボル不足の際に、色で知らせたほうが良さそう
class SymbolColorManager_T{
    /**
     * @param {string} normal 
     * @param {string} mandatory 
     * @param {string} move 
     * @param {string} extendsSymbol 
     */
    constructor(normal,mandatory,move,extendsSymbol){
        this._normal =(normal ||"#880000")
        this._mandatory=(mandatory||"#22e488");
        this._move=(move ||"#22e488");
        this._extends =extendsSymbol;
    }
    /**
     * 
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return new SymbolColorManager_T(null,null,null,null);
        }
        const obj =JSON.parse(objText);
        const normal =(obj.normal||null);
        const mandatory=(obj.mandatory||null);
        const move=(obj.move||null);
        const extendsSymbol = (obj.extends);

        return new SymbolColorManager_T(normal,mandatory,move,extendsSymbol);
    }

    paramatorInvalidColor(){
        return "#FF00FF";
    }
    emptyColor(){
        return "#000000";
    }
    mandatoryColor(){
        return this._mandatory;
    }
    normalColor(){
        return this._normal;
    }
    moveSymbolColor(){
        if(this._move){
            return this._move;
        }
        return this.mandatoryColor();
    }
}

//TODO
const SymbolColorManager =  SymbolColorManager_T.create(getParam().color);
//デバッグ用の情報を扱うクラス
class DebugSymbol{
    /**
     * 
     * @param {I_SymbolDefine} symbol 
     * @param {String} type 
     */
    constructor(symbol,type){
        this._symbol =symbol;
        this._type =type;
    }
    symbolName(){
        return this._symbol.name();
    }
    exInfos(){
        //return this._symbol.
    }


}
//TODO:基本・拡張の双方で使うので、1クラス追加
class SymbolFill{
    constructor(keys,button){

    }
}

class I_SymbolDefine{

    createDebugSymbol(){
        return new DebugSymbol(this,this.constructor.name);
    }
    isDeleter(){
        return false;
    }
    isParamatorValid(){
        if(!this.symbol()){
            return false;
        }
        if(!this.name()){
            return false;
        }
        if(this.isUnknow()){
            return false;
        }
        return true;
    }
    symbolBackColor(){
        return this.backColor();
    }
    customBackColor(){
        return "";
    }
    backColor(){
        const  custom = this.customBackColor();
        if(custom){
            return custom;
        }
        if(this.isMandatory()){
            return SymbolColorManager.mandatoryColor()
        }
        if(this.isEmpty()){
            return SymbolColorManager.emptyColor();
        }
        return SymbolColorManager.normalColor();
    }
    textColor(){
        return "#ffd530";
    }
    isUnknow(){
        return false;
    }
    name(){
        return "";
    }
    hasName(){
        return !!this.name();
    }
    isEnabled(){
        return !this.isEmpty() ;
    }
    symbol(){
        return "";
    }
    /**
     * @private
     * @returns 
     */
    isEscapeCompatible(){
        return Input._isEscapeCompatible(this.symbol());
    }
    /**
     * @param {*} set 
     */
    isSatisfyRequiredSymbols(set){


    }

    isMandatory(){
        return false;
    }
    debugInfo(){
        return "";
    }
    isEmpty(){
        return !this.symbol();
    }
    displayKeyName(){
        return this.symbol();
    }
    errorText(){
        if(!symbolManager.isInitialized()){
            return setting.errorText.initFauled.currentName();
        }
        if(this.isEmpty()){
            return setting.errorText.symbolEmpty.currentName();
        }
        if(!this.hasName()){
            return setting.errorText.nameEmpty.currentName()+this.symbol();
        }
        return "";
    }
    helpText(){
        return ""
    }
    getHelpText(){
        const errorText = this.errorText();
        if(errorText){
            return errorText;
        }
        return this.helpText();
    }
    createErrorObject(){

    }

    isPressed(){
        return Input.isPressed(this.symbol());
    }
    isRepeated(){
        return Input.isRepeated(this.symbol());
    }
    isTriggered(){
        return Input.isTriggered(this.symbol());
    }

}


class MoveSymbol extends I_SymbolDefine{
    /**
     * @param {String} symbol 
     * @param {String} name 
     */
    constructor(symbol,name){
        super();
        this._symbol =symbol;
        this._name =name;
    }
    backColor(){
        return SymbolColorManager.moveSymbolColor();
    }
    symbol(){
        return this._symbol;
    }
    name(){
        return this._name;
    }
    displayKeyName(){
        return this._name;
    }
    // isMandatory(){
    //     return true;
    // }
}
function createMoveSymbols(){
    const up = new MoveSymbol("up","↑");
    const down = new MoveSymbol("down","↓");
    const left =new MoveSymbol("left","←");
    const right =new MoveSymbol("right","→");
    return [up,down,left,right];
}
class SymbolDeleteObject extends I_SymbolDefine{
    isEnabled(){
        return true;
    }
    isDeleter(){
        return true;
    }
    name(){
        return setting.text.mapperDelete.currentName();
    }
    symbol(){
        return null;
    }
    errorText(){
        return "";
    }
    helpText(){
        return this.name();
    }
}
class EscapeSymbol extends I_SymbolDefine{
    /**
     * @param {MultiLanguageText} name 
     * @param {MultiLanguageText} helpText
     * @param {MultiLanguageText} keyText
     */
    constructor(name,helpText,keyText){
        super();
        this._name =name;
        this._helpText =xxxxMtext(helpText);
        this._keyText = xxxxMtext(keyText);
    }
    /**
     * 
     * @param {string} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            const name = new MultiLanguageText("menu/cancel","メニュー/キャンセル");
            const help = new MultiLanguageText("","");
            const keytext = new MultiLanguageText("","");
            return new EscapeSymbol(name,help,keytext);
        }
        const obj=JSON.parse(objText);

        const name =  MultiLanguageText.create(obj.name);
        const helpText =MultiLanguageText.create(obj.helpText);
        const keyText =MultiLanguageText.create(obj.keyText);
        return new EscapeSymbol(name,helpText,keyText);
    }

    helpText(){
        return this._helpText.currentName();
    }
    displayKeyName(){
        return this._keyText.currentName();
    }
   
    name(){
        return this._name.currentName();
    }
    symbol(){
        return "escape";
    }
    backColor(){
        return SymbolColorManager.mandatoryColor();
    }
}
/**
 * 
 * @param {MultiLanguageText} mText 
 */
function xxxxMtext(mText){
    return mText;
    // if(mText){
    //     if(!mText.isEmpty()){
    //         return mText
    //     }
    // }
    //ミスって、ぬるぽ発生していたので無効にする
    // return null;
}
class BasicSymbol extends I_SymbolDefine{
    /**
     * @private
     * @param {String} symbol 
     * @param {MultiLanguageText} name 
     * @param {MultiLanguageText} keyText
     * @param {MultiLanguageText} helpText
     * @param {boolean} mandatory
     */
    constructor(symbol,name,keyText,helpText ,mandatory){
        super();
        /**
         * @readonly
         */
        this._symbol = symbol;
        //名前が未設定の場合、シンボルで初期化してしまう
        /**
         * @readonly
         */
         this._name =name ? name : new MultiLanguageText(symbol,symbol);
        //テキストが空っぽならnullにして、基底クラスの処理に任せる
        /**
         * @readonly
         */
         this._keyText = xxxxMtext( keyText);
        /**
         * @readonly
         */
         this._helpText=xxxxMtext(helpText);
        /**
         * @readonly
         */
         this._mandatory=mandatory;
         //↓多分この二つはfillSymbol対応用の何か
        //this._exKeys=exKeys;
        //this._buttonId =exButton;
    }
    /**
     * 
     * @param {string} symbol 
     * @param {string} objText 
     * @param {boolean} mandatoryByMapper
     * @returns 
     */
    static create(symbol,objText,mandatoryByMapper){
        if(!objText){
            return new BasicSymbol(symbol,null,null,null,mandatoryByMapper);
        }
        const obj = JSON.parse(objText);
        const name =MultiLanguageText.create(obj.name);
        const keyText =MultiLanguageText.create(obj.keyText);
        const helpText =MultiLanguageText.create(obj.helpText);

        const mandatory = (obj.mandatory ==="true");
        //const exKeys =String(obj.exKeys||"");
        //const exButton =Number(obj.exButton );
        return new BasicSymbol(symbol,name,keyText,helpText,mandatoryByMapper && mandatory);
    }
    isMandatory(){
        return this._mandatory;
    }
    helpText(){
        if(this._helpText){
            const text= this._helpText.currentName();
            if(text){
                return text;
            }    
        }
        // const text= super.helpText();
        return this.name();
    }
    name(){
        return this._name.currentName();
    }
    symbol(){
        return this._symbol;
    }
    displayKeyName(){
        if(this._keyText){
            return this._keyText.currentName();
        }
        return super.displayKeyName();
    }
}
/**
 * 
 * @returns {ReadonlyArray<I_SymbolDefine>}
 */
function createBasicSymbols(){
    /**
     * @typedef {object} BasicSymbolTuple
     * @property {string} symbol
     * @property {string} paramText
     */
     const param    = getParam();
     /**
     * @type {readonly BasicSymbolTuple[]}
     */
    const list =[
        {
            symbol:"ok",
            paramText:param.basicOk
        },
        {
            symbol:"cancel",
            paramText:param.basicCancel,
        },
        {
            symbol:"shift",
            paramText:param.basicShift
        },
        {
            symbol:"menu",
            paramText:param.basicMenu,
        },
        {
            symbol:"pageup",
            paramText:param.basicPageup,
        },
        {
            symbol:"pagedown",
            paramText:param.basicPagedown,
        }
    ];
    const keySymbols =new Set(Object.values(Input.keyMapper));
    const gamepadSymnols =new Set(Object.values(Input.gamepadMapper));

    const result=[];

    for (const iterator of list) {
        const includedPad =gamepadSymnols.has(iterator.symbol);
        const includedKey =keySymbols.has(iterator.symbol);
        if(includedKey || includedPad){
            const symbolObject =BasicSymbol.create(
                iterator.symbol,
                iterator.paramText,
                includedKey && includedPad //両方にある場合のみ必須扱い
            );
            result.push(symbolObject);
        }
    }

    const esacape  = EscapeSymbol.create(param.basicEscape);
    result.push(esacape);
    return result;


    // const ok       = BasicSymbol.create("ok",param.basicOk);
    // const cancel   = BasicSymbol.create("cancel",param.basicCancel);
    // const shift    = BasicSymbol.create("shift",param.basicShift);
    // const menu     = BasicSymbol.create("menu",param.basicMenu);
    // const pageup   = BasicSymbol.create("pageup",param.basicPageup);
    // const pagedown = BasicSymbol.create("pagedown",param.basicPagedown);
    // return [ok,cancel,shift,menu,pageup,pagedown,esacape];
}

class EventCaller{
    /**
     * @param {Number} eventId 
     * @param {Number} triggereType 
     */
    constructor(eventId,triggereType){
        /**
         * @readonly
         */
        this._eventId = eventId;
        /**
         * @readonly
         */
         this._inputType = triggereType;
    }
    /**
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return new EventCaller(0,0);
        }
        const obj =JSON.parse(objText);

        const eventId =Number(obj.id);
        const inputType =Number(obj.inputType);
        return new EventCaller(eventId,inputType);
    }
    /**
     * @this {Readonly<EventCaller>}
     */
    isValidEvent(){
        return this._eventId > 0;
    }
    /**
     * @this {Readonly<EventCaller>}
     */
    eventId(){
        return this._eventId;
    }
    /**
     * @this {Readonly<EventCaller>}
     */
    callEvent(){
        if(!$gameTemp.isCommonEventReserved()){
            $gameTemp.reserveCommonEvent(this._eventId);
        }
    }
    /**
     * @param {String} symbol 
     */
    updateEvent(symbol){
        if(this._eventId >0 && this.needsEventCall(symbol)){
            this.callEvent();
        }
    }
    /**
     * @param {String} symbol 
     * @returns 
     */
    needsEventCall(symbol){
        switch (this._inputType) {
            case 0:
                return Input.isPressed(symbol);    
            case 1:
                return Input.isTriggered(symbol)
            case 2:
                return Input.isRepeated(symbol);
        }
        return false;
    }
    /**
     * @this {Readonly<EventCaller>}
     */
    typeIsPressed(){
        return this._inputType === 0;
    }
    /**
     * @this {Readonly<EventCaller>}
     */
    typeIsTriggered(){
        return this._inputType === 1;
    }
    /**
     * @this {Readonly<EventCaller>}
     */
    typeIsRepeated(){
        return this._inputType === 2;
    }
}
class KeySetting{
    /**
     * 
     * @param {String} keys 
     * @param {String} color 
     * @param {ReadonlyArray<number>} exKeyCode
     * @param {MultiLanguageText} text 
     */
    constructor(keys,color,exKeyCode,text){
        this._keys=keys.toUpperCase();
        this._color = color;
        this._exKeyCode= exKeyCode;
        this._mText=text;
    }
    /**
     * @param {string} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return new KeySetting("",null,[],new MultiLanguageText("",""));
        }
        const obj =JSON.parse(objText);
        const keys =obj.keys;
        const color = (obj.color||null);
        /**
         * @type {string[]}
         */
        const exKeys = JSON.parse(obj.exKeys ||"[]");
        const mtext = MultiLanguageText.create(obj.text);

        return new KeySetting(keys,color,exKeys.map(Number),mtext);
    }
    backColor(){
        return this._color;
    }
    keys(){
        return this._keys;
    }

    *iterateKeyCord(){
        const length = this._keys.length;
        for(let i=0 ; i< length; ++i){
            yield this._keys.charCodeAt(i);
        }
        for (const iterator of this._exKeyCode) {
            yield iterator;
        }
    }

    keyText(){
        if(this._mText){
            return this._mText.currentName();
        }
        return "";
    }


}
class AdovancedSetting{
    /**
     * 
     * @param {String} symbol 
     * @param {Number} overwriteType 
     * @param {boolean} mandatory 
     */
    constructor(symbol,overwriteType,mandatory){
        this._symbol =symbol;
        //シンボルが手動で設定されている場合、上書きで確定
        this._overwriteType=(!!symbol) ? 9: overwriteType;
        this._mandatory=  mandatory;
    }
    /**
     * @param {String} objText 
     * @returns 
     */
    static create(objText){
        if(!objText){
            return EMPTY_AdovancedSetting;
        }
        const obj=JSON.parse(objText);
        const symbol=(obj.symbol);
        const overwiteType =Number(obj.overwrite||0);
        const mandatory = (obj.mandatory==="true");
        return new AdovancedSetting(symbol,overwiteType,mandatory);
    }
    isSymbolValid(){
        return !symbolManager.isBasicSymbol(this._symbol);
    }
    symbol(){
        return this._symbol;
    }
    isOverwriteEnabled(){
        return this._overwriteType !==0;
    }
    /**
     * 
     * @param {Boolean} value 
     */
    setMandatory(value){
        this._mandatory=value;
    }
    isMandatory(){
        return this._mandatory;
    }
    overwriteType(){
        return this._overwriteType;
    }

}

const EMPTY_AdovancedSetting = new AdovancedSetting(null,0,false);
/**
 * @typedef {object} BasicSymbolJudge
 * @property {(symbol:string)=>boolean} isBasicSymbol
 */
/**
 * @typedef {object} ExtendsSymbolPair
 * @property {ExtendsSymbol} exSymbol
 * @property {TouchButton} button
 */
const createSimpleEventCaller =function(objText){
    const obj =JSON.parse(objText);
    const actionName =MultiLanguageText.create (obj.name)
    const helpText =MultiLanguageText.create(obj.helpText);
    const adv = EMPTY_AdovancedSetting;
    const eventCaller = EventCaller.create(obj.event);
    const enabled = (obj.enabled ==="true")
    const buttonNumber =Number(obj.button);    
    const keyText = MultiLanguageText.create(obj.keyText);
    const keySetting = new KeySetting(String(obj.key||""),null,[],keyText);

    const e= new ExtendsSymbol(adv,actionName,buttonNumber,eventCaller,enabled,helpText,keySetting);

    return {
        exSymbol:e,
        button:null,
    }

};

/**
 * @param {String} objText 
 * @returns {ExtendsSymbolPair}
 */
const createExtendsSymbol=function(objText){
    const obj = JSON.parse(objText);
    //名前が滅茶苦茶だけど、==="true"が使えない状態なのでやむを得ずこれ
    const enabled =(obj.enabled ==="false");
    if(enabled){
        return {
            exSymbol:null,
            button:null
        };
    }
    const adovanced = AdovancedSetting.create(obj.adovanced) ;
    const buttonId =Number(obj.button);

    const mtext = MultiLanguageText.create(obj.name);
    const helpText =MultiLanguageText.create(obj.helpText||"{}");
    const keySetting =  KeySetting.create(obj.keySetting);

    const eventObj =EventCaller.create(obj.event);
    const def = new ExtendsSymbol(adovanced,mtext, buttonId,eventObj ,enabled,helpText,keySetting);

    /**
     * @type {String}
     */
    const touchButtonText=(obj.touchButton)
    const button = TouchButton.create(touchButtonText);
    if(button && button.isValid()){
        button.setSymbolObject(def);
    }

    return {
        exSymbol:def,
        button:button,
    }
}

class ExtendsSymbol extends I_SymbolDefine{
    /**
     * @param {AdovancedSetting} adovanced
     * @param {MultiLanguageText} actionName 
     * @param {Number} buttonId 
     * @param {EventCaller} eventCaller
     * @param {Boolean} enabled
     * @param {MultiLanguageText} helpText
     * @param {KeySetting} keySetting
     */
    constructor(adovanced,actionName,buttonId,eventCaller,enabled,helpText,keySetting){
        super();
        this._event = eventCaller;
        this._symbol =null;
        //this._keys = (keys ||"").toUpperCase();
        this._buttonId =buttonId;
        this._actionName = actionName;
        //this._keyText=keyText;
        this._helpText =helpText;
        this._advanced =adovanced;
        this._keySetting=keySetting;
    }

    /**
     * @private
     * @returns 
     */
    getKeys(){
        return  this._keySetting.keys();
    }
    iterateKeyCode(){
        return this._keySetting.iterateKeyCord();
    }
    overwriteType(){
        return this._advanced.overwriteType();
    }
    isOverwriteEnabled(){
        return this._advanced.isOverwriteEnabled();
    }

    isMandatory(){
        return  this._advanced.isMandatory();
    }
    displayKeyName(){
        const keyText = this._keySetting.keyText();
        if(keyText){
            return keyText;
        }
        return super.displayKeyName();
    }
    helpText(){
        if(this._helpText){
            return this._helpText.currentName();            
        }
        return null;
    }
    hasName(){
        return !!this._actionName.currentName();
    }
    name(){
        const name= this._actionName.currentName();
        if(!this._symbol){
            return `empty(${this.overwriteType()}):${name}`;
        }
        if(!name){
            return `unnamed:${this._symbol}`;
        }
        return name;
    }
    customBackColor(){
        return this._keySetting.backColor();
    }
    symbol(){
        return this._symbol;
    }
    /**
     * @param {BasicSymbolJudge} judge
     * @returns {String}
     */
    readManualySymbol(judge){
        const symbol = this._advanced.symbol();
        if(judge.isBasicSymbol(symbol)){
            return null;
        }
        return symbol;
    }
    /**
     * @param {BasicSymbolJudge} judge
     * @returns {String}
     */
    padSymbol(judge){
        const symbol =Input.gamepadMapper[this._buttonId];
        if(judge.isBasicSymbol(symbol)){
            return symbol;
        }
        return null;
    }
    /**
     * @param {BasicSymbolJudge} judge
     * @returns {String}
     */
    firstKeySymbol(judge){

        for (const charCode of this._keySetting.iterateKeyCord()) {
            const symbol = Input.keyMapper[charCode];
            if(symbol){
                if(!judge.isBasicSymbol(symbol)){
                    return symbol;
                }
           }
        }
        return null;
    }

    eventCallSymbol(){
        if(this._event){
            const eventId =this._event.eventId()
            if(eventId > 0){
                 return "call"+eventId;
            }
        }
        return null
    }

    /**
     * @param {BasicSymbolJudge} judge 
     * @returns {String}
     * @description 優先シンボルの読み込み
     */
    readPreferredSymbol(judge){
        const manualSymbol=this.readManualySymbol(judge);
        if(manualSymbol){
            return manualSymbol;
        }
        const type =this._advanced.overwriteType()
        switch (type) {
            case 1:
                return this.padSymbol(judge);
            case 2:
                return this.firstKeySymbol(judge);
            case 3:
                return this.eventCallSymbol()
        }
        return "";
    }
    /**
     * @param {BasicSymbolJudge} judge 
     * @returns {String}
     */
    readMySymbol(judge){
        //上書き用の優先されるシンボルを取り出す
        const xxxx=this.readPreferredSymbol(judge);
        if(xxxx){
            return xxxx;
        }
        //無かったら、この順番で適当に読み込む
        const pad = this.padSymbol(judge);
        if(pad){
            return pad;
        }
        const key =this.firstKeySymbol(judge)
        if(key){
            return key; 
        }
        const eventCall =this.eventCallSymbol();
        if(eventCall){
            return eventCall;
        }
        return "";
    }
    /**
     * @param {BasicSymbolJudge} mapper 
     */
    loadSymbol(mapper){
        if(!this._symbol){
            const symbol =this.readMySymbol(mapper);
            this._symbol = symbol;
        }
        if(this.isEmpty()){
            this._advanced.setMandatory(false);
        }
    }
    /**
     * 
     * @param {Record<number,string>} mapper 
     * @param {number} targetKey 
     * @returns 
     */
    mapperWrite(mapper,targetKey){
        //上書きが許可されてない場合
        if(!this.isOverwriteEnabled()){
            //指定位置のシンボルがあるか調べる
            const oldSymbol =mapper[targetKey];	
            if(oldSymbol){
                //上書きせずに終了
                return;
            }
        }
        mapper[targetKey]= this._symbol;	
    }

    fillSymbol(){
        if(!this._symbol){return;}
        if(!isNaN( this._buttonId)){
            this.mapperWrite(Input.gamepadMapper,this._buttonId);
        }


        for (const keycord of this.iterateKeyCode()) {
            this.mapperWrite(Input.keyMapper,keycord);
        }

        // const keys=this.getKeys();


        // const len = keys.length;
        // for(let i =0; i< len;++i){
        //     const charcode =keys.charCodeAt(i);
        //     this.mapperWrite(Input.keyMapper,charcode);
        // }
    }
    updateEventCall(){
        if(this._event){
            const symbol = this.symbol();
            if(symbol){
                this._event.updateEvent(symbol);
            }
        }
    }
    errorText(){

        //シンボル手動設定で、標準シンボルと同じ文字列が指定されている
        if(!this._advanced.isSymbolValid()){

            const current= setting.errorText.advanceSymbolInvalid.currentName();
            return `${current}\nsymbol:${this._symbol}`;
        }
        return super.errorText();
    }
    isEnabled(){
        return super.isEnabled() && this._advanced.isSymbolValid();
    }
    debugInfo(){
        return `ot:${this.overwriteType()},id:${this._buttonId},keys:${this.getKeys()}`;
    }

}

/**
 * @description 指定したシンボルを持つキーの一覧を取得
 * @param {String} symbol 
 */
function KeyWithTheSymbolPlaced(symbol){
    let keys ="";
    for (const iterator of Object.entries(Input.keyMapper)) {
        if(iterator[1]===symbol){
            const keyN =Number(iterator[0]);
            const char = String.fromCodePoint(keyN);    
            keys +=char;
        }
    }
    return keys;
}

/**
 * @description 指定したシンボルを持つパッドボタン番号を取得
 * @param {String} symbol 
 */
function buttonWithTheSymbolPlaced(symbol){
    for (const iterator of Object.entries(Input.gamepadMapper)) {
        if(iterator[1]===symbol){
            return Number(iterator[0]);
        }
    }
    return NaN;
}

class UnknowSymbol extends I_SymbolDefine{
    /**
     * @param {String} symbol 
     */
    constructor(symbol){
        super();
        //TODO:初期化処理を変えて、下記の関数をメソッドへと移行する
        this._kesy = KeyWithTheSymbolPlaced(symbol);
        this._buttonId = buttonWithTheSymbolPlaced(symbol);
        this._symbol = symbol;
    }
    symbol(){
        return this._symbol;
    }
    
    name(){
        return "?"+this.buttonIdText()+this._kesy+":"+this.symbol();
    }
    buttonIdText(){
        if(isNaN(this._buttonId)){
            return "";
        }
        return "("+this._buttonId +")";
    }
    isUnknow(){
        return true;
    }

    debugInfo(){
        return "button:"+this._buttonId +",keys:"+this._kesy;
    }
    helpText(){
        return setting.errorText.unknowSymbol.currentName()+"\n" + this.debugInfo();
    }
}


class SymbolManager_T {
    /**
     * @param {ReadonlyArray<I_SymbolDefine>} basicSymbols 
     * @param {ReadonlyArray<MoveSymbol>} moveSymbols 
     */
    constructor(basicSymbols,moveSymbols){
        /**
         * @type {Map<string,I_SymbolDefine>}
         */
        this._symbolDictionary = new Map();
        /**
         * @type {Array<UnknowSymbol>}
         */
        this._unknowList=[];
        /**
         * @type {Array<ExtendsSymbol>}
         */
        this._extendSymbols =[];
        this._basicSymbols = basicSymbols
        this._moveSymbols = moveSymbols
        this.addDictionaryItems(this._basicSymbols);
        this.addDictionaryItems(this._moveSymbols);
        this._initialized=false;
        this._event=null;
    }
    /**
     * @this {Readonly<SymbolManager_T>}
     * @param {String} symbolString 
    */
    isBasicSymbol(symbolString){
        if(!symbolString){
            return false;
        }

        return this._basicSymbols.some( function(symbolObject){
            return symbolObject.symbol() ===symbolString;
        } )
    }
    
    /**
     * @param {ReadonlyArray<ExtendsSymbol>} list 
     */
    addExtendsSymbols(list){
         this._extendSymbols.push(...list);

    }
    /**
     * @private
     * @param {ExtendsSymbol[]} list 
     */
    setExtendSymbols(list){
        this._extendSymbols =list;
    }

    onBoot(){
        if(this._initialized){
            return;
        }
        this.loadExtendsSymbols();
        this.loadUnknowSymbols();
        //初期化成功フラグ
        //競合で頻繁に問題が起こるため
        this._initialized =true;
    }
    isInitialized(){
        return this._initialized;
    }
    loadExtendsSymbols(){
       const numExSymbols=this._extendSymbols.length;
        for (const iterator of this._extendSymbols) {
            iterator.loadSymbol(this);
        }
        if(numExSymbols!==this._extendSymbols.length){
            throw new Error("要素数を書き換えてはいけません")
        }
        for (const iterator of this._extendSymbols) {
            iterator.fillSymbol();
        }
        //他のプラグインによる設定が完了した後で呼び出される
        //なので、このタイミングで行う必要がある
        this.addDictionaryItems(this._extendSymbols);
    }
    loadUnknowSymbols(){
        /**
         * @type {Iterable<String>}
         */
        const padSymbols = Object.values(Input.gamepadMapper);
        //mapperにある全てのシンボルを列挙する
        const set = new Set(Object.values(Input.keyMapper));
        for (const iterator of padSymbols) {
            set.add(iterator);
        }
        //Managerにあるシンボルを列挙した中から消す
        for (const iterator of this.iterateSymbolList()) {
            const symbol = iterator.symbol();
            if (symbol) {
                set.delete(symbol);
            }
        }

        //移動シンボル4種を消す
        // for (const iterator of this._moveSymbols) {
        //     const symbol = iterator.symbol();
        //     if(symbol){
        //         set.delete(symbol);
        //     }
        // }
        for (const iterator of this.systemSymbols()) {
            set.delete(iterator);
        }
        for (const symbol of set) {
            const obj =new UnknowSymbol(symbol);
            this._unknowList.push(obj);
        }

        this.addDictionaryItems(this._unknowList)
    }

    

    callButtonEvent(){
        for (const iterator of this._extendSymbols) {
            //既に予約されている場合、あるいはupdateEventCall()で予約されたら処理を止める
            if($gameTemp.isCommonEventReserved()){
                break;
            }
            iterator.updateEventCall();
        }
    }
    /**
     * @param {Iterable<I_SymbolDefine>} list 
     */
    addDictionaryItems(list){
        for (const iterator of list) {
            const symbol = iterator.symbol();
            if(symbol){
                this._symbolDictionary.set(symbol,iterator);
            }
        }
    }

    *iterateSymbolList(){
        for (const iterator of this._basicSymbols) {
            yield iterator;
        }
        for (const iterator of this._extendSymbols) {
            yield iterator;
        }
        for (const iterator of this._unknowList) {
            yield iterator;
        }
        for (const iterator of this._moveSymbols) {
            yield iterator;
        }
    }
    /**
     * @returns {Array<I_SymbolDefine>}
     */
    getSymbolList(){
        return this._basicSymbols.concat(
            this._extendSymbols,
            this._unknowList,
            this._moveSymbols
            );
    }

    /**
     * @param {String} symbol 
     */
    actionName(symbol){
        if(!symbol){ return "";}
        const item = this.findSymbol(symbol);
        if(item){  return item.name();}

        //TODO:この表記になるとガチで正体不明になるので対策
        //この場合、初期化が正しく行われていない可能性
        return "unknow:"+symbol;
    }
    /**
     * @param {String} symbol 
     */
    findSymbol(symbol){
        return this._symbolDictionary.get(symbol);
    }

    systemSymbols(){
        return ["debug","control","tab"];
    }

    /**
     * @param {String} symbol 
     */
    isMandatorySymbol(symbol){
        if(!symbol){
            return false;
        }
        const def = this._symbolDictionary.get(symbol);
        if(def){
            return def.isMandatory();
        }
        return false;
    }
    /**
     * @returns {Iterable<I_SymbolDefine>}
     */
    allMandatorySymbols(){
        return this.getSymbolList().filter( function(def){ return def.isMandatory()});
    }

    /**
     * @param {ReadonlySet<string>} set 
     * @returns 
     */
    isValidMapper_V3(set){
        const m=this.allMandatorySymbols();
        for (const iterator of m) {
            if(iterator.isMandatory()){
                const symbol = iterator.symbol();
                if(Input._isEscapeCompatible(symbol)){
                    if(set.has("escape")){
                        continue;
                    }
                }
                if(!set.has(symbol)){
                    return false;
                }
            }
        }
        return true;
    }
}

const symbolManager = new SymbolManager_T(
    createBasicSymbols(),
    createMoveSymbols()
);

/**
 * @param {Iterable<string>} textList
 * @param {SymbolManager_T} symbolManager 
 * @param {ButtonManager_T} buttonManager
 * @param {(text:string)=>ExtendsSymbolPair} func
 */
function setupExtendsSymbols(textList,symbolManager,buttonManager,func){

    const buttons =[];
    const symbols=[];
    for (const iterator of textList) {
        const item=func(iterator);
        if(item.exSymbol){
            symbols.push(item.exSymbol);
        }
        if(item.button){
            buttons.push(item.button);
        }
    }
    symbolManager.addExtendsSymbols(symbols);
    buttonManager.addButtonList(buttons);
}
setupExtendsSymbols(JSON.parse(getParam().extendsMapper ||"[]") ,  symbolManager,ButtonManager,function(arg){
    return createExtendsSymbol(arg);
});
function createSymbolAndButton(objText){


}

setupExtendsSymbols(JSON.parse(getParam().eventList ||"[]") ,  symbolManager,ButtonManager,function(arg){
    return createSimpleEventCaller(arg);
});

if(ButtonManager.isTouchButtonEnabled()){

    class Sprite_EX_Base extends Sprite_Clickable{
        /**
         * @param {Bitmap} bitmap 
         */
        constructor(bitmap){
            super();
            this.bitmap =bitmap;
            this._imageHeight =0;
            this.setupBitmapOnLoad();
        }
        setupBitmapOnLoad(){
            if(this.bitmap.isReady()){
                this.onLoadeed();
            }else{
                //ラムダ禁止
                const selfObject=this;
                this.bitmap.addLoadListener(function(bitmap){
                    selfObject.onLoadeed();
                } );
            }
        }
        onLoadeed(){
            //画像を上下半々で使うように設定
            this._imageHeight=this.bitmap.height /2;
            this.setColdFrame();
        }
        setColdFrame(){
            this.setFrame(0,0,this.bitmap.width,this._imageHeight)
        }
        setHotFrame(){
            this.setFrame(0,this._imageHeight,this.bitmap.width,this._imageHeight);
        }
        updateFrame(){
            if(this.isPressed()){
                this.setHotFrame();
            }else{
                this.setColdFrame();
            }
        }
    }

    class Sprite_EX_ButtonMZ extends Sprite_EX_Base{
        /**
         * @param {TouchButton} touchButton 
         */
         constructor(touchButton){
             super(touchButton.bitmap());
             this._button = touchButton;
             this.resetPosition();

        }
        resetPosition(){
            this.x = this._button.x();
            this.y = this._button.y();
        }
        onPress(){
            this._button.virtualPress();
        }
        onClick(){
            Input.virtualClick(this._button.symbol()  );
        }
        update(){
            super.update();
            if(!this.isPressed()){
                this._button.clearPress();
            }
            this.updateFrame();
        }
    }
    class Spriteset_TouchButton extends PIXI.Container{
        constructor(){
            super();
            this._buttons =[];
            const buttons = ButtonManager.getList();
            for (const iterator of buttons) {
                const sprite = new Sprite_EX_ButtonMZ(iterator);
                this.addChild(sprite);
                this._buttons.push(sprite);
            }
        }
        get z(){
            return 1;
        }
        update(){
            for (const iterator of this._buttons) {
                iterator.update();
            }
        }
        isAnyButtonPressed(){
            //ラムダ禁止
            return this._buttons.some(function (button){
                 return button.isPressed()
            });
        }
    }

    const Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons =function(){
        Scene_Map_createButtons.call(this);
        if(ConfigManager.touchUI){
            const spriteset = new Spriteset_TouchButton();
            this.addWindow(spriteset);
            //@ts-ignore
            this._touchButtonsMA = spriteset;
        }
    };
    const Scene_Map_isAnyButtonPressed=Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed =function(){
        const result= Scene_Map_isAnyButtonPressed.call(this);
        if(result){
            return true;
        }
        //@ts-ignore
        return this._touchButtonsMA && this._touchButtonsMA.isAnyButtonPressed();
    };

}
//ボタンとキーの共通基底クラス
class I_InputButton{

    name(){
        return "";
    }
    mapperId(){
        return NaN;
    }
}

/**
 * @template {I_InputButton} T_Button
 */
class I_DeviceLayout{
    deviceSymbol(){
        return "";
    }
    name(){
        return "";
    }
    /**
     * @param {Number} index 
     * @returns {T_Button}
     */
    button(index){
        return null;
    }
    numButtons(){
        return 0;
    }
}
/**
 * @template {I_InputButton} T_Button
 * @extends {I_DeviceLayout<T_Button>}
 */
class DeviceLayout extends I_DeviceLayout{
    /**
     * @param {ReadonlyArray<T_Button>} list 
     * @param {String} name 
     * @param {String} symbol 
     */
    constructor(list,name,symbol){
        super();
        this._name=name;
        this._list=list;
        /**
         * @private
         */
        this._symbol=symbol;
    }
    /**
     * @returns {ReadonlyArray<T_Button>}
     */
    buttons(){
        return this._list;
    }
    name(){
        return this._name;
    }
    deviceSymbol(){
        return this._symbol;
    }
    numButtons(){
        return this._list.length;
    }
    /**
     * @param {T_Button} button 
     * @returns 
     */
    lastIndexOf(button){
        return this._list.lastIndexOf(button);
    }
    /**
     * @param {Number} index 
     */
    button(index){
        return this._list[index];
    }
    /**
     * @param {Number} code 
     */
    getButtonByCode(code){
        for (const iterator of this._list) {
            if(iterator.mapperId()===code){
                return iterator;
            }
        }
        return null;
    }
}
/**
 * @template {I_InputButton} T_Button
 */
 class LayoutSelecter{
    /**
     * @param {ReadonlyArray<DeviceLayout<T_Button>>} list 
     */
    constructor(list){
        this._list=list;
        this._index=0;
    }
    topItemName(){
        const item = this._list[0];
        if(item){
            return item.name();
        }
        return "";
    }
    list(){
        return this._list;
    }
    /**
     * 
     * @param {String} symbolText 
     */
    selectOfSymbol(symbolText){
        for (let index = 0; index < this._list.length; index++) {
            const element = this._list[index];
            if(element && element.deviceSymbol()===symbolText){
                this._index =index;
                return;
            }
        }
        this._index=-1;
    }
    changeNext(){
        this._index+=1;
        if(this._index >= this._list.length){
            this._index=0;
        }

    }
    /**
     * @param {Number} code 
     * @returns 
     */
    getButtonByCode(code){
        const d =this.currentLayout();
        if(d){
            return d.getButtonByCode(code);
        }
        return null;
    }
    /**
     * @returns {DeviceLayout<T_Button> }
     */
    currentLayout(){
        return this._list[this._index];
    }
    currentLayoutName(){
        const layout = this.currentLayout();
        if(layout){
            return layout.name();
        }
        return "";
    }
    currentDeviceSymbol(){
        const device=this.currentLayout();
        if(device){
            return device.deviceSymbol();
        }
        return "";
    }
    /**
     * @param {number} index 
     * @returns 
     */
    buttonAt(index) {
        const device =this.currentLayout();
        if(device){
            return device.button(index);
        }
        return null;
    }
    numButtons(){
        const device=this.currentLayout();
        if(device){
            return device.numButtons();
        }
        return 0;
    }
    /**
     * @private
     * @param {Number} index 
     * @returns 
     */
    buttonName(index) {
        const device=this.currentLayout();
        if(device){
            //TODO:
            //return device.button(index)
        }
        return "";
    }
}

/**
 * @typedef {Object} SymbolCodePair
 * @property {Number} code
 * @property {String} symbol
 */

class I_ReadonlyMapper{
    /**
     * @param {Number} buttonId 
     * @returns 
     */
    symbolString(buttonId){
        return "";
    }
    /**
     * @param {I_InputButton} button 
     */
    symbolString_V8(button){
        return this.symbolString(button.mapperId());
    }
    /**
     * @returns {Iterable<SymbolCodePair>}
     */
    xxList(){
        return null;
    }
    /**
     * @param {string} symbol 
     * @param {Iterable<I_InputButton>} buttonList
     * @returns 
     */
    buttonFromSymbol_XX(symbol,buttonList){
        if(!symbol){
            return null;
        }
        for (const button of buttonList) {
            const id = button.mapperId();
            if(symbol===this.symbolString(id)){
                return button;
            }
        }
        return null;
    }
    /**
     * @description Map<>を生成するための補助関数
     * @returns {ReadonlyMap<Number,String>}
     * @param {InputMapperType} mapper 
     */
    createMapSupport(mapper){
        const map =new Map();
        for (const iterator of Object.entries(mapper)) {
            const code = Number(iterator[0]);
            if(!isNaN(code)){
                map.set(code,iterator[1]);
            }
        }
        return map;
    }
    applyGamepad(){
        if(this.isValidMapper()){
            Input._latestButton=null;
            const mapper = this.cloneMapper();
            Input.gamepadMapper =mapper;
        }
    }
    applyKeyboard(){
        if(this.isValidMapper()){
            Input._latestButton=null;
            const mapper = this.cloneMapper();
            Input.keyMapper =mapper;
        }
    }
    /**
     * @returns {InputMapperType}
     */
    cloneMapper(){
        throw new Error("未実装")
    }
    isValidMapper(){
        return false;
    }
}

//ゲーム実行中のマッパーに直接触れるヤツ
//主にFillSymbol用
//初期状態も、これに持たせてしまう
class MainMapperBase{
    constructor(){
        this._defaultMapper=null;
    }
    target(){
        return {};
    }

    /**
     * 
     * @param {Number} key 
     * @param {String} symbolString 
     */
    change(key,symbolString){
        const target=this.target();
        target[key]=symbolString;
    }
    saveDefault(){
        this._defaultMapper =new DefaultMapper(this.target());
    }
    loadDefault(){
        this.reset(this._defaultMapper.cloneMapper());
    }
    /**
     * @param {InputMapperType} mapper 
     */
    reset(mapper){
    }
}
class MainGamepadMapper extends MainMapperBase{
    target(){
        return Input.gamepadMapper;
    }
    reset(){
        
    }
}

class DefaultMapper {
    /**
     * 
     * @param {InputMapperType} obj 
     */
    constructor(obj){
        //super();
        /**
         * @type {Readonly<{[x:number]:string;}>}
         */
        this._mapper= ( objectClone(obj));

    }
    mapper(){
        return this._mapper;
    }
    cloneMapper(){
        return objectClone(this._mapper);
    }
}


class InputDeviceBase extends I_ReadonlyMapper{
    constructor(){
        super();
        this.setDefaultMapper(null);
    }
    /**
     * @param {DefaultMapper} mapper 
     */
    setDefaultMapper(mapper){
        this._defaultMapper=mapper;

    }

    /**
     * @desc ABC順に並んだリスト
     * @returns {ReadonlyArray<I_InputButton>}
     */
    indexList(){
        return [];
    }
    /**
     * @returns {ReadonlyArray<I_InputButton>}
     */
    buttonList(){
        return []
    }
    /**
     * @param {Number} buttonId 
     * @returns {I_InputButton}
     */
    buttonAt(buttonId){
        return null
    }
    numButtons(){
        return this.buttonList().length;
    }
    /**
     * @returns {I_ReadonlyMapper}
     */
    defaultMapper_v2(){
        return null;
    }
    defaultMapper(){
        return {};
    }
    /**
     * 
     * @returns {Record<number,string>}
     */
    currentMapper(){
        return {}
    }

    /**
     * @param {String} symbol 
     * @returns 
     */
    getButtonBySymbol(symbol){
        const indexList = this.indexList();

        return this.buttonFromSymbol_XX(symbol,indexList);
    }
    /**
     * @param {Number} buttonId 
     * @returns {String}
     */
    symbolString(buttonId){
        const mapper = this.currentMapper();
        const symbol = mapper[buttonId];
        if(symbol){
            return symbol;
        }
        return "";
    }
    createTemporaryMapper(){
        const tmp = new TemporaryMappper(this.currentMapper());
        return tmp;
    }
}
class GamepadButtonObj extends I_InputButton{
    /**
     * @param {Number} buttonId 
     * @param {String} name 
     */
    constructor(buttonId,name){
        super();
        /**
         * @private
         */
        this._name =name;
        /**
         * @private
         */
         this._buttonId=buttonId;
    }

    name(){
        return this._name;
    }
    mapperId(){
        return this.buttonId();
    }
    
    buttonId(){
        return this._buttonId;
    }
    text(){
        const buttonNumber= this._buttonId.toString().padStart(2,"  ");
        return buttonNumber +":"+this.name();
    }
    color(){
        return "#000000";
    }
}

/**
 * @typedef {Object} keylayoutItem
 * @property {()=>string} name
 * @property {()=>number} mapperId keycordと同じ
 * @property {()=>boolean} isCommand
 * @property {()=>string} helpText
 * @property {()=>boolean} isEnabled
 * @property {()=>string} handle
 */

//キーボードのキーを表現するクラス
class Key_Base extends I_InputButton{
    isLocked(){
        return !this.isEnter();
    }
    keycord(){
        return NaN;
    }
    /**
     * @returns {string}
     */
    char_(){
        return "";
    }
    /**
     * @param {KeyConfigWindowConcept} keyWindow 
     * @param {Number} index 
     */
    drawBasicChar(keyWindow,index){
        const s = keyWindow.symbolObjectFromKeyNumber(this.keycord());
        const rect = keyWindow.itemRect(index);
        keyWindow.drawInputDefine(this,s,rect);
    }
    isEnter(){
        return this.keycord()===13;
    }
    isNull(){
        return isNaN(this.keycord());
    }
    isCommand(){
        return false;
    }
}
class Key_Command {
    /**
     * @param {String} handlerName 
     * @param {MultiLanguageText} mtext 
     * @param {Number} width 
     * @param {MultiLanguageText} helpText
     */
    constructor(handlerName,mtext,width,helpText){
        this._callBackHandle =handlerName;
        this._widthEx =width;
        this._mtext = mtext;
        this._helpText =helpText;
    }
    isEnabled(){
        return true;
    }
    width(){
        return this._widthEx;
    }
    // isBig(){
    //     return this.width() >1;
    // }
    text(){
        return this.name();
    }

    name(){
        return this._mtext.currentName();
    }

    keycord(){
        return 0;
    }
    mapperId(){
        return NaN;
    }
    isCommand(){
        return true;
    }
    handle(){
        return this._callBackHandle;
    }
    // /**
    //  * @param {Window_Selectable} keyConfigWindow 
    //  */
    // onOk(keyConfigWindow){
    //     keyConfigWindow.callHandler(this._callBackHandle);
    // }
    /**
     * @param {Number} index 
     */
    setIndex(index){
        if(isNaN(this._index)){
            this._index = index;
        }
    }

    // /**
    //  * @param {KeyConfigWindowConcept} keyWindow 
    //  * @param {Number} index
    //  */
    // rect(keyWindow,index){
    //     const rect = keyWindow.baseRect(this._index);
    //     rect.width *=this._widthEx;
    //     return rect;
    // }
    // /**
    //  * @param {KeyConfigWindowConcept} keyWindow 
    //  * @param {Number} index
    //  */
    // draw(keyWindow,index){
    //   if(index ===this._index){
    //     const rect = this.rect(keyWindow,index);
    //     keyWindow.drawCommandXX(this.char,rect);
    //   }
    // }
    helpText(){
        return this._helpText.currentName();
    }
}


class Key_Char{
    /**
     * @param {string} char_ 
     * @param {number} code 
     */
    constructor(char_,code){
        //super();
        this._char = char_;
        this._code = code;
    }
    mapperId(){
        return this._code;
    }
    isCommand(){
        return false;
    }
    handle(){
        return "key";
    }
    char_(){
        return this._char;
    }
    name(){
        return this._char;
    }
    keycord(){
        return this._code;
    }
    numLines(){
        return 2;
    }
    //TODO:使うかわからない
    /**
     * @private
     * @returns 
     */
    isBig(){
        return this._code ===96  //tenkey0
            || this._code===13   //enter
            || this._code===32   //space
    }
    helpText(){
        return "";
    }
    isEnabled(){
        //Enter,上下左右以外
        return  (this._code < 37 || 40 < this._code) && this._code > 17;
            // this._code !==17 &&
            // this._code !==13 && 
            // this._code !==0 ;
    }
}
/**
 * @param {string} char 
 * @returns 
 */
function keychar(char){
    const code =char.charCodeAt(0);
    return new Key_Char(char,code);
}
/**
 * @param {string} char 
 * @param {number} code 
 * @returns 
 */
function keyinfo(char,code){
    return new Key_Char(char,code)
}

/**
 * 
 * @param {string} char 
 * @param {number} code 
 */
function keylocked(char,code){
    return new Key_Char(char,code);
}
const KEYS={
    NULL:keyinfo("",0),
    ENTER:keyinfo("Enter",13),
    ENTER_JIS:keyinfo("Enter",13),
    ENTER_JIS_NULL:keyinfo("",13),
    ENTER_NULL:keyinfo("",13),
    ENTER_US:keyinfo("Enter",13),
    SPACE:keyinfo("Space",32),
    SHIFT:keylocked('Shift',16),
    CTRL:keylocked('CTRL',17),
    UP:keylocked("↑",38),
    DOWN:keylocked("↓",40),
    LEFT:keylocked("←",37),
    RIGHT:keylocked("→",39),
    TENKEY0:keyinfo("0",96),        
    TENKEY1:keyinfo('1',97),
    TENKEY2:keyinfo('2',98),
    TENKEY3:keyinfo('3',99),
    TENKEY4:keyinfo('4',100),
    TENKEY5:keyinfo('5',101),
    TENKEY6:keyinfo('6',102),
    TENKEY7:keyinfo('7',103),
    TENKEY8:keyinfo('8',104),
    TENKEY9:keyinfo('9',105),
    TENKEY_DOT:keyinfo('.',110),
    _0:keychar("0",),
    _1:keychar("1",),
    _2:keychar("2",),
    _3:keychar("3",),
    _4:keychar("4",),
    _5:keychar("5",),
    _6:keychar("6",),
    _7:keychar("7",),
    _8:keychar("8",),
    _9:keychar("9",),
    A:keychar("A"),
    B:keychar("B"),
    C:keychar("C"),
    D:keychar("D"),
    E:keychar("E"),
    F:keychar("F"),
    G:keychar("G"),
    H:keychar("H"),
    I:keychar("I"),
    J:keychar("J"),
    K:keychar("K"),
    L:keychar("L"), 
    M:keychar("M"),
    N:keychar("N"),
    O:keychar("O"),
    P:keychar("P"),
    Q:keychar("Q"), 
    R:keychar("R"),
    S:keychar("S") ,
    T:keychar("T"), 
    U:keychar("U"),
    V:keychar("V"),
    W:keychar("W"),
    X:keychar("X"),
    Y:keychar("Y"),
    Z:keychar("Z"),
    TAB:keyinfo("TAB",9),
    INSERT:keyinfo('Ins',45),
    BACK:keyinfo('Back',8),
    HOME:keyinfo('Home',36),
    END:keyinfo('End',35),
    PAGEUP:keyinfo('PgUp',33),
    PAGEDOWN:keyinfo('PgDn',34),
    ESC:keyinfo('esc',27),

    ATMARK:keyinfo("@", 192),

    TENKEY_MINUS :keyinfo('-',109),
    TENKEY_PLUS :keyinfo('+',107),
    MINUS :keyinfo('-',189),
    COMMA :keyinfo(',',188),
    SEMICOLON:keyinfo(';',186),

    SLASH:keyinfo('/',191),
    BACKSLASH:keyinfo('\\',226),
    DOT :keyinfo('.',190),
    
    COLON:keyinfo(':',58),
    CARET:keyinfo('^',222),
    APOSTROPHE:keyinfo("'",222), 

    EQUAL_JIS:keyinfo('=',189),
    
    SQUARE_BRACKETS_OPEN :keyinfo('[',219),
    SQUARE_BRACKETS_CLOSE :keyinfo(']',221),
};

/**
 * @extends {DeviceLayout<keylayoutItem>}
 */
class KeyboardLayout extends DeviceLayout{

    wasdMapper(){

    }
}

/**
 * @typedef {object} mappingPair
 * @property {number} code
 */
/**
 * @param {ReadonlyArray<keylayoutItem>} keylist 
 * @param {string} name 
 * @param {string} symbol 
 */
function createKeyboardLayout(keylist,name,symbol){

    const layout = new KeyboardLayout(keylist,name,symbol);
    return layout;

}

//ハードメーカーの違いに対応するためのやつ

class KeyboardObject extends InputDeviceBase{
    /**
     * 
     * @param {LayoutSelecter<keylayoutItem>} layout 
     */
    constructor(layout){
        super();
        this._selector=layout;
    }
    numButtons(){
        return this._selector.numButtons();
    }
    /**
     * @param {number} index 
     * @returns {keylayoutItem}
     */
    buttonAt(index){
        return this._selector.buttonAt(index);
    }
    currentMapper(){
        return Input.keyMapper;
    }
    currentLayoutName(){
        return this._selector.currentLayoutName()
    }
    currentLayout(){
        return this._selector.currentLayout();
    }
    layoutSelector(){
        return this._selector;
    }
    currentSymbol(){
        return this._selector.currentDeviceSymbol();
    }




}

class KeyboardTemporay{
    isValidMapper(){
        return true;
    }
    layoutName(){
        return "";
    }

}


/**
 * @param {CommandSet} cmd 
 * @param {Array<keylayoutItem>} keys 
 */
function pushCommad(cmd,keys){

    const list= [cmd.save,cmd.wasd,cmd.reset,cmd.keyLayout,cmd.exit];
    for (const iterator of list) {
        const length =iterator.width();
        for(let i=0; i < length; ++i){
            keys.push(iterator);
        }
    }
}

/**
 * 
 * @param {CommandSet} command 
 * @returns {ReadonlyArray<keylayoutItem>}
 */
 function createUS_Keyboard(command){
    const list =[
        KEYS.ESC,
        KEYS._1 ,
        KEYS._2 ,
        KEYS._3 ,
        KEYS._4, 
        KEYS._5, 
        KEYS._6, 
        KEYS._7, 
        KEYS._8, 
        KEYS._9, 
        KEYS._0, 
        KEYS.MINUS,
        KEYS.EQUAL_JIS,
        KEYS.INSERT ,
        KEYS.BACK ,
        KEYS.HOME ,
        KEYS.END ,
        KEYS.PAGEUP ,
        KEYS.PAGEDOWN ,
    
        KEYS.TAB,
        KEYS.Q ,
        KEYS.W ,
        KEYS.E ,
        KEYS.R ,
        KEYS.T ,
        KEYS.Y ,
        KEYS.U ,
        KEYS.I ,
        KEYS.O ,
        KEYS.P ,
        KEYS.SQUARE_BRACKETS_OPEN,
        KEYS.SQUARE_BRACKETS_CLOSE, 
        KEYS.BACKSLASH,
        KEYS.NULL,
        KEYS.TENKEY7 ,
        KEYS.TENKEY8 ,
        KEYS.TENKEY9 ,
        KEYS.TENKEY_MINUS,
        KEYS.NULL,
        KEYS.A ,
        KEYS.S ,
        KEYS.D ,
        KEYS.F ,
        KEYS.G ,
        KEYS.H ,
    
        KEYS.J ,
        KEYS.K ,
        KEYS.L ,
        KEYS.SEMICOLON,
        KEYS.APOSTROPHE, 
        KEYS.ENTER_US,
        KEYS.ENTER_US,
        KEYS.ENTER_US,
        KEYS.TENKEY4 ,
        KEYS.TENKEY5 ,
        KEYS.TENKEY6 ,
        KEYS.TENKEY_PLUS,

        KEYS.SHIFT ,
        KEYS.Z ,
        KEYS.X ,
        KEYS.C ,
        KEYS.V ,
        KEYS.B ,
        KEYS.N ,
        KEYS.M ,
        KEYS.COMMA,
        KEYS.DOT,
        KEYS.SLASH,
        
        KEYS.SHIFT,
        KEYS.SHIFT,
        KEYS.UP,
        KEYS.NULL,
        
        KEYS.TENKEY1 ,
        KEYS.TENKEY2 ,
        KEYS.TENKEY3 ,
        KEYS.NULL,
        
        KEYS.CTRL  ,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.LEFT,
        KEYS.DOWN,
        KEYS.RIGHT,
        KEYS.TENKEY0,
        KEYS.TENKEY0,
        KEYS.TENKEY_DOT,
        KEYS.NULL,
    ];
    pushCommad(command,list);
    return list;
}
/**
 * 
 * @param {CommandSet} command 
 * @returns {ReadonlyArray<keylayoutItem>}
 */
function createJIS_Keyboard(command){
    /**
     * @type {Array<keylayoutItem>}
     */
     const KEY_LAYOUT_JIS =[
        KEYS.ESC,
        KEYS._1 ,
        KEYS._2 ,
        KEYS._3 ,
        KEYS._4, 
        KEYS._5, 
        KEYS._6, 
        KEYS._7, 
        KEYS._8, 
        KEYS._9, 
        KEYS._0, 
        KEYS.MINUS,
        KEYS.CARET,
        KEYS.INSERT ,
        KEYS.BACK ,
        KEYS.HOME ,
        KEYS.END ,
        KEYS.PAGEUP ,
        KEYS.PAGEDOWN ,

        KEYS.TAB,

        KEYS.Q ,
        KEYS.W ,
        KEYS.E ,
        KEYS.R ,
        KEYS.T ,
        KEYS.Y ,
        KEYS.U ,
        KEYS.I ,
        KEYS.O ,
        KEYS.P ,
        KEYS.ATMARK,
        KEYS.SQUARE_BRACKETS_OPEN,
        KEYS.ENTER_JIS,
        KEYS.ENTER_JIS_NULL,
        KEYS.TENKEY7 ,
        KEYS.TENKEY8 ,
        KEYS.TENKEY9 ,
        KEYS.TENKEY_MINUS,
        KEYS.NULL,
        KEYS.A ,
        KEYS.S ,
        KEYS.D ,
        KEYS.F ,
        KEYS.G ,
        KEYS.H ,
        KEYS.J ,
        KEYS.K ,
        KEYS.L ,
        KEYS.SEMICOLON,
        KEYS.COLON,
        KEYS.SQUARE_BRACKETS_CLOSE, 
        KEYS.ENTER_JIS_NULL,
        KEYS.ENTER_JIS_NULL,
        KEYS.TENKEY4 ,
        KEYS.TENKEY5 ,
        KEYS.TENKEY6 ,
        KEYS.TENKEY_PLUS,

        KEYS.SHIFT ,
        KEYS.Z ,
        KEYS.X ,
        KEYS.C ,
        KEYS.V ,
        KEYS.B ,
        KEYS.N ,
        KEYS.M ,
        KEYS.COMMA,
        KEYS.DOT,
        KEYS.SLASH,
        
        KEYS.BACKSLASH,
        KEYS.SHIFT,
        KEYS.UP,
        KEYS.NULL,
        
        KEYS.TENKEY1 ,
        KEYS.TENKEY2 ,
        KEYS.TENKEY3 ,
        KEYS.NULL,

        KEYS.CTRL  ,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.LEFT,
        KEYS.DOWN,
        KEYS.RIGHT,
        KEYS.TENKEY0,
        KEYS.TENKEY0,
        KEYS.TENKEY_DOT,
        KEYS.NULL,
    ];
    pushCommad(command,KEY_LAYOUT_JIS);

    return KEY_LAYOUT_JIS;
}
/**
 * 
 * @param {CommandSet} command 
 * @returns {ReadonlyArray<keylayoutItem>}
 */
 function createFR_Keyboard(command){
    /**
     * @type {Array<keylayoutItem>}
     */
     const KEY_LAYOUT_AZERTY =[
        KEYS.ESC,
        KEYS._1 ,
        KEYS._2 ,
        KEYS._3 ,
        KEYS._4, 
        KEYS._5, 
        KEYS._6, 
        KEYS._7, 
        KEYS._8, 
        KEYS._9, 
        KEYS._0, 
        KEYS.MINUS,
        KEYS.CARET,
        KEYS.INSERT ,
        KEYS.BACK ,
        KEYS.HOME ,
        KEYS.END ,
        KEYS.PAGEUP ,
        KEYS.PAGEDOWN ,

        KEYS.TAB,

        KEYS.A ,
        KEYS.Z ,
        KEYS.E ,
        KEYS.R ,
        KEYS.T ,
        KEYS.Y ,
        KEYS.U ,
        KEYS.I ,
        KEYS.O ,
        KEYS.P ,
        KEYS.ATMARK,
        KEYS.SQUARE_BRACKETS_OPEN,
        KEYS.ENTER_JIS,
        KEYS.ENTER_JIS_NULL,
        KEYS.TENKEY7 ,
        KEYS.TENKEY8 ,
        KEYS.TENKEY9 ,
        KEYS.TENKEY_MINUS,
        KEYS.NULL,
        KEYS.Q ,
        KEYS.S ,
        KEYS.D ,
        KEYS.F ,
        KEYS.G ,
        KEYS.H ,
        KEYS.J ,
        KEYS.K ,
        KEYS.L ,
        KEYS.M,
        KEYS.COLON,
        KEYS.SQUARE_BRACKETS_CLOSE, 
        KEYS.ENTER_JIS_NULL,
        KEYS.ENTER_JIS_NULL,
        KEYS.TENKEY4 ,
        KEYS.TENKEY5 ,
        KEYS.TENKEY6 ,
        KEYS.TENKEY_PLUS,

        KEYS.SHIFT ,
        KEYS.W ,
        KEYS.X ,
        KEYS.C ,
        KEYS.V ,
        KEYS.B ,
        KEYS.N ,
        KEYS.NULL ,
        KEYS.COMMA,
        KEYS.DOT,
        KEYS.SLASH,
        
        KEYS.BACKSLASH,
        KEYS.SHIFT,
        KEYS.UP,
        KEYS.NULL,
        
        KEYS.TENKEY1 ,
        KEYS.TENKEY2 ,
        KEYS.TENKEY3 ,
        KEYS.NULL,

        KEYS.CTRL  ,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.SPACE,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.NULL,
        KEYS.LEFT,
        KEYS.DOWN,
        KEYS.RIGHT,
        KEYS.TENKEY0,
        KEYS.TENKEY0,
        KEYS.TENKEY_DOT,
        KEYS.NULL,
    ];
    pushCommad(command,KEY_LAYOUT_AZERTY);

    return KEY_LAYOUT_AZERTY;
}

/**
 * @param {Readonly<CommandSet>} command 
 * @returns 
 */
function createKeyboard(command){
    const jisKey = createJIS_Keyboard(command);
    const uskey = createUS_Keyboard(command);
    const frKey =createFR_Keyboard(command);

    const US =createKeyboardLayout(uskey,"US","en-US");
    const JIS =createKeyboardLayout(  jisKey,"JIS","ja_JP");
    const AZERTY=createKeyboardLayout(frKey,"AZERTY","fr_FR");

    const select = new LayoutSelecter([JIS,US,AZERTY]);

    return new KeyboardObject(select);
}


/**
 * 
 * @param {String} symbol 
 * @param {String} name 
 * @param {String} button0 
 * @param {String} button1 
 * @param {String} button2 
 * @param {String} button3 
 */
function createGamepadLayout(symbol,name,button0,button1,button2,button3){

    const buttons=[
        new GamepadButtonObj(0,button0),
        new GamepadButtonObj(1,button1),
        new GamepadButtonObj(2,button2),
        new GamepadButtonObj(3,button3),
        new GamepadButtonObj(4,"L1"),
        new GamepadButtonObj(5,"R1"),
        new GamepadButtonObj(6,"L2"),
        new GamepadButtonObj(7,"R2"),
        new GamepadButtonObj(8,"select"),
        new GamepadButtonObj(9,"start"),
        new GamepadButtonObj(10,"L3"),
        new GamepadButtonObj(11,"R3")
    ];
    return new DeviceLayout(buttons,name,symbol);
}
/**
 * 
 * @param {String} symbol 
 * @param {String} name 
 */
function createButtonNumberLayout(symbol,name){
    const buttonNumber=[0,1,2,3,4,5,6,7,8,9,10,11];
    const buttons =buttonNumber.map( function(number){
        const buttonName = String(number);
        return new GamepadButtonObj(number,buttonName);
    });
    return new DeviceLayout(buttons,name,symbol);
}

/**
 * @extends {LayoutSelecter<GamepadButtonObj>}
 */
 class GamepadLayoutSelector extends LayoutSelecter{}

//ボタンの名前を入れておくクラス
//また、編集可能なボタンを制御する際にも使う
class GamepadObject extends InputDeviceBase{
    /**
     * @param {GamepadLayoutSelector} layout 
     */
    constructor(layout){
        super();
        this._selector=layout;
        this._defaultMapper_V2=null;
    }
    onBoot(){

    }
    buttonList(){
        const d= this._selector.currentLayout();
        if(d){
            return d.buttons();
        }
        return [];
    }

    /**
     * @param {Number} code 
     */
    getButtonByCode(code){
        if(code <=11){
            return this._selector.getButtonByCode(code);
        }

        return null;
        
    }
    /**
     * @param {number} index
     */
    buttonAt(index){
        return this._selector.buttonAt(index);
    }
    /**
     * @param {Number} index
     */
    buttonName(index){
        const b = this.buttonAt(index);
        if(b){ return b.name();}
        return "";
    }
    // buttonList(){
    //     return this._list;
    // }
    // defaultMapper(){
    //     return Mano_InputConfig.defaultGamepadMapper;
    // }
    currentMapper(){
        return Input.gamepadMapper;
    }
    isConected(){
        const pad = createPadState(0);
        return !!pad;
    }
    deviceName(){
        const pad = createPadState(0);
        if(pad){
            return pad.id
        }
        return "";
    }
    defaultMapper_v2(){
        const tmp = new TemporaryMappper(this.defaultMapper());
        return tmp;
    }
    numButtons(){
        return this._selector.numButtons();
    }
    currentLayout(){
        return this._selector.currentLayout();
    }
    layoutSelector(){
        return this._selector;
    }
}



/**
 * @return {ReadonlyArray<string>}
 */
function createMandatorySymbols(params){
    return ["ok","cancel","menu"];
}
/**
 * @param {String} text 
 * @returns {String}
 */
function noteOrString(text){
    if(text ==undefined){
        return "undefined"
    }
    const last = text[text.length-1]
    if(text[0]==='"'&&last ==='"'){
        return JSON.parse(text);
    }
    return String(text);
}
function createText(params){
    const guid = new MultiLanguageText("This is an unknown symbol. Add an item to the input extension","不明なシンボルです 入力拡張に項目を追加してください");

    return{
        gamepadConfigCommandText:MultiLanguageText.create(params.gamepadConfigCommandText),
        keyConfigCommandText:MultiLanguageText.create(params.keyConfigCommandText),
        mapperDelete:MultiLanguageText.create(params.mapperDelete),
        //TODO:安定したら今後のバージョンで消す
        gamepadIsNotConnected: MultiLanguageText.create(params.GamepadIsNotConnectedText),
        needButtonDetouch:MultiLanguageText.create(params.needButtonDetouchText),
        unknowguid:guid,
    }
}
class ErrorObject{
    
    constructor(mtext,errorCategory){

    }
    errorNumber(){
        //E1 

        //E9 その他のエラー
    }
    createErrorMessage(symbol){

    }
    //一覧表示用の内容を返す
    itemText(){

    }
    //解決方法を返す
    helpText(){

    }
}

function createErrorTexts(){
    const advanceSymbolInvalid =new MultiLanguageText("","拡張シンボルは標準シンボルと異なる内容でなければいけません。");
    const initFauled =new MultiLanguageText("The initialization process was not performed correctly. \nThere is a possibility of a plugin conflict. \nMove the plugin down may help.","初期化処理が正しく行われませんでした。\nプラグインの競合の可能性があります。\nプラグインを下の方に移動すると解決する場合があります。");
    const unknowSymbol = new MultiLanguageText("This is an unknown symbol. Add an item to the input extension","不明なシンボルです 入力拡張に項目を追加してください");
    const symbolEmpty=new MultiLanguageText("The symbol is not set \n Check the contents of the inputExtension from the plugin parameters","シンボルが設定されていません\nプラグインパラメータから拡張設定の内容を確認してください");
    const nameEmpty= new MultiLanguageText("The name for display is not set\nsymbol:","表示用の名称が設定されていません\nsymbol:");

    return {
        advanceSymbolInvalid:advanceSymbolInvalid,
        initFauled:initFauled,
        unknowSymbol:unknowSymbol,
        symbolEmpty:symbolEmpty,
        nameEmpty:nameEmpty,
    }

}
class InputDevice_Readonly{
    /**
     * 
     * @param {Record<number,string>} mapper 
     */
    constructor(mapper){
        this._mapper=mapper;
    }
    mapper(){
        return this._mapper;
    }

}




//TODO:新たなるマネージャー
class DeviceXXX{
    constructor(){
        this._defaultKeyMapper=null;
        this._defaultGamepadMapper=null;
        //this.setKeyLayout(null,null);
    }
    onBoot(){
        this.setupDefaultMapper()
    }
    setupDefaultMapper(){
        //this._defaultKeyMapper= new InputDevice_Readonly(  Object.freeze(objectClone(Input.keyMapper)));
        this._defaultGamepadMapper =new InputDevice_Readonly(  Object.freeze(objectClone(Input.gamepadMapper)));
    }
    // keyMapper(){
    //     return this._defaultKeyMapper;
    // }
    gamepadMapper(){
        return this._defaultGamepadMapper;
    }
}
function createGamepad(){
    //TODO:helpText差し込み
    const nintendo=createGamepadLayout("N","nintendo","B","A","Y","X");
    const xbox =createGamepadLayout("X","xbox","A","B","X","Y");
    const playstation=createGamepadLayout("P","playstation4","×","○","□","△");
    const ps5DualDualSense = createGamepadLayout("PS5","playstation5","□","×","○","△");

    const numberGamepad =createButtonNumberLayout("Number","ButtonNumber");
    const gamepadLayoutSelector = new LayoutSelecter([numberGamepad,nintendo,xbox,playstation,ps5DualDualSense]);
    const gamepad= new GamepadObject(gamepadLayoutSelector);
    return gamepad;
}

class Key_CommandManager_T{
    /**
     * 
     * @param {Key_Command} apply 
     * @param {Key_Command} wasd 
     * @param {Key_Command} exit 
     * @param {Key_Command} reset 
     * @param {Key_Command} changeButtonLayout 
     * @param {Key_Command} changeKeyLayout
     */
    constructor(apply,wasd,exit,reset,changeButtonLayout,changeKeyLayout){
        //const params = getParam();
        this._apply =apply;
        this._wasd=wasd;
        this._exit=exit;
        this._reset=reset;
        //this._alt = Key_Command.create(params.style,"ALT");
        this._changeButtonLayout =changeButtonLayout;
        this._changeLayout=changeKeyLayout;
    }
    buttonLayout(){
        return this._changeButtonLayout;
    }
    keylayout(){
        return this._changeLayout;
    }
    getKeylayoutText(){
        return this._changeLayout.text();
    }
    wasd(){
        return this._wasd;
    }
    getWasdText(){
        return this._wasd.text();
    }
    reset(){
        return this._reset;
    }
    getResetText(){
        return this._reset.text();
    }
    apply(){
        return this._apply
    }
    getApplyText(){
        return this._apply.text();
    }
    // alt(){
    //     return this._alt;
    // }
    exit(){
        return this._exit;
    }
    getExitText(){
        return this._exit.text();
    }
    /**
     * @private
     * @returns 
     */
    createCommandList_ForKeyLayout(){
        const commandList =[
            this._reset,
            this._apply,
            this._wasd,
            this._changeLayout,
            this._exit
        ];
        const result =[];
        for (const iterator of commandList) {
            for(var i=0; i <iterator._widthEx;++i){
                result.push(iterator);
            }
        }
        return result;
    }
    /**
     * @private
     * @returns 
     */
    createCommandList_ForGamepad(){
        const layout = this.buttonLayout();
        const exit =this.exit();
        const reset =this.reset()
        //const alt = this.alt();
        const apply = this.apply();
        return [
            apply,
            reset,
            layout,
            exit
        ];
    }
}
/**
 * 
 * @param {string} handlerName 
 * @param {string} name_mText 
 * @param {number} width 
 * @param {string} helpText_mText 
 */
function createCommandV2(handlerName,name_mText,width,helpText_mText){
    const name =MultiLanguageText.create(name_mText);
    const help = helpText_mText ?  (MultiLanguageText.create(helpText_mText)) :null;
    return new Key_Command(handlerName,name,Number(width),help);
}

/**
 * @typedef {Object} CommandSet
 * @property {Key_Command} save
 * @property {Key_Command} wasd
 * @property {Key_Command} exit
 * @property {Key_Command} reset
 * @property {Key_Command} buttonLayout
 * @property {Key_Command} keyLayout
 */
/**
 * @returns {Readonly<CommandSet>}
 */
function createCommandManager(){
    const params = getParam();
    const save =createCommandV2("apply",params.saveCommand,params.saveCommandWidth,params.saveDescription);
    const wasd= createCommandV2("WASD",params.WASDCommand,(params.WASDwidth),params.WASDhelp)
    const exit =createCommandV2("EXIT",params.exitCommand,params.exitWidth,params.exitHelp)
    const reset =createCommandV2("reset",params.resetCommand,params.resetWidth,params.resetDescription);
    const changeLayout = createButtonLayoutChangeCommand();
    const changeKeyLayout = createCommandV2("KeyLayout",params.changeKeyLayoutCommand,params.changeKeyLayoutCommandWidth,null);


    /**
     * @type {CommandSet}
     */
    const comandSet={
        save,
        exit,
        wasd,reset,keyLayout: changeKeyLayout,buttonLayout:changeLayout
    };
    return comandSet;
    // const cm = new Key_CommandManager_T(
    //     save,wasd,exit,reset,changeLayout,changeKeyLayout
    // );

    // return cm;
}

class DeviceManager_T{
    /**
     * @param {string} symbol 
     */
    selectButtonLayout(symbol){

    }
    /**
     * 
     * @param {string} symbol 
     */
    selectKeyLayout(symbol){

    }
}

const setting = (function(){
    const params = getParam();
    const keyText ={
        up:"↑",
        down:"↓",
        right:"→",
        left:"←"
    };

    const buttonUsedForALT =new MultiLanguageText("","");
    buttonUsedForALT.setNameJP("このボタンには%1が割り当て済みです");
    buttonUsedForALT.setNameEN("%1 has been assigned to this button");

    //const keyboardLayoutSelector = new LayoutSelecter([KEY_LAYOUT_US,KEY_LAYOUT_JIS])
    const commandManager=createCommandManager()

    //const keyboardV10 = new Keyboard_V10(keyboardLayoutSelector);
    const result= {
        command:commandManager,
        //gamepadSelector:gamepadLayoutSelector,
        //keyboard:keyboardV10,
        gamepad :createGamepad(),
        Keyboard:createKeyboard(commandManager),
        device:new DeviceXXX(),
        errorText:createErrorTexts(),
        text:createText(params),
        buttonUsedForALT:buttonUsedForALT,
        keyWindowLineHeight:22,
        keyText:keyText,
        emptySymbolText:String(params.textEmpty),
        mandatorySymbols:createMandatorySymbols(params),
        windowSymbolListWidht:Number(params.windowSymbolListWidth),
        //なんか異常が起きているので、そのうち対処
        gamepadBackground:String(params.gamepadSceneBackground),
        keyBackground:String(params.keySceneBackground),
        numVisibleRows:16,//Number(params.numVisibleRows),
        cols:4,
    };
    return result;
})();

function currentGamepadConfigText(){
    return setting.text.gamepadConfigCommandText.currentName();
}
function currentKeyConfigText(){
    return setting.text.keyConfigCommandText.currentName();
}


/**
 * @param {String} base 
 */
function makeCONFIG_KEY(base) {
    if(IS_Atsumaru){
        //@ts-ignore
        return base +location.pathname;
    }
    return base;
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
        return 2;
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

class InputConfigReadOnly{
    /**
     * @param {I_MVMZ_Workaround} workaround 
     */
    constructor(workaround){
        this._workaround=workaround;
    }
    workaround(){
        return this._workaround;
    }

}


class InputConfigManager_T{
    /**
     * @param {InputConfigReadOnly} readonlyData 
     * @param {GamepadObject} gamepad
     * @param {KeyboardObject} keyboard
     */
    constructor(readonlyData,gamepad,keyboard){
        this._readonly=readonlyData;
        this._defaultGamepad =null;
        this._defaultKeyborad =null;
        /**
         * @readonly
         */
        this._gamepad = gamepad;
        /**
         * @readonly
         */
        this._keyboard = keyboard;
        this.setLayout("","");
    }
    getWorkaround(){
        return this._readonly.workaround();
    }

    makeDefaultMapper(){
        if(this._defaultGamepad===null){
            this._defaultGamepad= new DefaultMapper(Input.gamepadMapper);
        }
        if(this._defaultKeyborad ===null){
            this._defaultKeyborad =new DefaultMapper(Input.keyMapper);
        }
    }
    defaultGamepadMapper(){
        return this._defaultGamepad;
    }
    defaultKeyMapper(){
        return this._defaultKeyborad;
    }

    /**
     * @param {Rectangle} rect 
     * @returns 
     */
    createHelpWindow(rect){
        return this._readonly.workaround().createHelpWindow(rect);
    }

    padLayoutTopItemName(){
        return setting.gamepad.layoutSelector().topItemName();

    }

    makeSaveData(){
        if(!this._config){
            this.setConfigSaveData(null);
        }
    }

    /**
     * @private
     * @param {InputConifgSaveData} config 
     * @returns {InputConifgSaveData}
     */
    validateSaveData(config){
        return{
            keylayout:(config && config.keylayout) || this.defaultKeyLayout(),
            keyMapper:(config && config.keyMapper) || this._defaultKeyborad.cloneMapper(),
            gamepadMapper:(config && config.gamepadMapper ) || this._defaultGamepad.cloneMapper(),
            padlayout:(config && config.padlayout) ||this.padLayoutTopItemName(),
        }
    }
    /**
     * 
     * @param {string} key 
     * @param {string} pad 
     */
    setLayout(key,pad){
        this._config={
            keyLayout:key,
            padLayout:pad,
        };
    }

    /**
     * @param {InputConifgSaveData} config 
     */
    setConfigSaveData(config){
        const saveData= this.validateSaveData(config);

        const tmpGamepad = new TemporaryMappper(saveData.gamepadMapper);
        const tmpKeyMapper= new TemporaryMappper(saveData.keyMapper);
        Input.gamepadMapper =tmpGamepad.createNormalizedMapper();
        Input.keyMapper = tmpKeyMapper.createNormalizedMapper();
        this.setLayout(saveData.keylayout,saveData.padlayout);
    }

    /**
     * @returns {InputConifgSaveData}
     */
    createConfigData(){
        return {
            keylayout:setting.Keyboard.currentLayout().deviceSymbol(),
            padlayout: setting.gamepad.currentLayout().deviceSymbol(),
            gamepadMapper:Input.gamepadMapper,
            keyMapper:Input.keyMapper,
        };
    }
    
    defaultKeyLayout() {
        //オプション系プラグインで先行してmakeData()するタイプへの対策
        if($gameSystem && $gameSystem.isJapanese()){
            return 'JIS';
        }
        return 'US';
    }

    createTemporalyGamepadMapper(){

        return new TemporaryMappper(Input.gamepadMapper);
    }
    // applyGamepadConfig(){
    //     // if(this._saveData){
    //     //     Input.gamepadMapper= objectClone(this._saveData.gamepadMapper);
    //     // }
    // }

    isAllButtonDetouch(){
        return Input._latestButton===null;
    }

    isAnyButtonLongPressed(){
        //@ts-ignore
        return Input._pressedTime > 60;
    }

}

const InputConfigManager =(function(){

    const mvmz = (Utils.RPGMAKER_NAME==="MV") ? new MV_Impriment() :new MZ_Impriment();
    const readonlyData =new InputConfigReadOnly(mvmz)

    return new InputConfigManager_T(readonlyData,setting.gamepad,setting.Keyboard);
}())

const MA_INPUTCONFIG_CONTENTS =makeCONFIG_KEY("MANO_INPUTCONFIG");

const MA_INPUTCONFIG_STYLE =makeCONFIG_KEY( "MA_INPUTCONFIG_STYLE");
const MA_KEYBOARD_CONFIG =makeCONFIG_KEY('KEYBOARD_CONFIG');
const MA_GAMEPAD_CONFIG = makeCONFIG_KEY('GAMEPAD_CONFIG');
const MA_KEYBOARD_LAYOUT =makeCONFIG_KEY('KEYBOARD_LAYOUT');

function readGamePadConfig( config ){
    const value = config[MA_GAMEPAD_CONFIG];
    if(value){
        return value;
    }
    return null;
}
function readKeyboardConfig(config){
    const value =config[MA_KEYBOARD_CONFIG];
    //todo:リセット壊れているので無効化
    // if(value){
    //     return value;
    // }
    return null;
}

/**
 * @typedef {object} InputConifgSaveData
 * @property {string} keylayout
 * @property {string} padlayout
 * @property {Record<number,string>} keyMapper
 * @property {Record<number,string>} gamepadMapper
 */
/**
 * @typedef {object} InputConifgLayoutData
 * @description マネージャーで所持するデータ
 * @property {string} keylayout
 * @property {string} padlayout
 */

//saveconfig
const  ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData =function(){
    
    const data= InputConfigManager.createConfigData();
    const result = ConfigManager_makeData.call(this);
    result[MA_INPUTCONFIG_CONTENTS]=data;
    // result[MA_INPUTCONFIG_STYLE] = ConfigManager[MA_INPUTCONFIG_STYLE] ||"normal";
    // result[MA_GAMEPAD_CONFIG] =Input.gamepadMapper;
    // result[MA_KEYBOARD_CONFIG] = Input.keyMapper;
    // //@ts-ignore
    // result[MA_KEYBOARD_LAYOUT] = ConfigManager.keyLayout_MA ||defaultKeyLayout();
    return result;
};
//loadconfig
const ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData =function(config){
    ConfigManager_applyData.call(this,config);
    /**
     * @type {InputConifgSaveData}
     */
    const data = config[MA_INPUTCONFIG_CONTENTS];
    if(data){
        InputConfigManager.setConfigSaveData(data);
    }
    Input.clear();
};
//@ts-ignore
const ColorSrc = window["ColorManager"] || null;
/**
 * @returns {Window_Base}
 * @param {Window_Base|Window_Selectable} window_base 
 */
function getColorSrc(window_base){
    return ColorSrc||window_base;
}

class TemporaryMappperBase extends I_ReadonlyMapper{
    /**
     * 
     * @param {String} symbol 
     * @returns 
     */
    hasSymbol(symbol){
        return false;
    }
    isValidMapper(){
        return false;
    }
    /**
     * @param {Number} code 
     * @param {String} symbol 
     */
    executeChangeSymbol(code,symbol){

    }
    /**
     * @protected
     * @returns {InputMapperType}
     */
    createNormalizedMapper(){
        return {}
    }
    reset(mapper){

    }
}
/**
 * @typedef {Record<Number,String> } InputMapperType
 */


//TODO:mapperのリセット用に保存してあるデータを何とかする
//主にリセットで使うので、それに向いた構造に改造したい
class TemporaryMappper extends TemporaryMappperBase{
    /**
     * @private
     * @returns {Map<number,string>}
     * @param {InputMapperType} mapper 
     */
    static createMap(mapper){
        /**
         * @type {Map<Number,String>}
         */
        const map =new Map();
        for (const iterator of Object.entries(mapper)) {
            const code = Number(iterator[0]);
            if(!isNaN(code)){
                map.set(code,iterator[1]);
            }
        }
        return map;
    }
    /**
     * 
     * @param {Record<number,string>} mapper 
     */
    constructor(mapper){
        super();
        this.reset(mapper);
    }
    /**
     * @returns 
     */
    createNormalizedMapper(){
        /**
         * @type {InputMapperType}
         */
        const result ={};
        for (const iterator of this._map.entries()) {
            const n =(iterator[0]);
            const symbol =iterator[1];
            if(!isNaN(n) &&symbol){
                result[n] = symbol;
            }
        }
        return result;
    }
    cloneMapper(){
        return this.createNormalizedMapper();
    }


    createSymbolsSet(){
        const set =new Set(this._map.values());
        return set;
    }
    /**
     * @param {I_ReadonlyMapper} mapper 
     */
    readOtherMapper(mapper){

    }
    /**
     * @param {DefaultMapper} mapper 
     */
    reset_V2(mapper){
        this.reset(mapper.cloneMapper());

    }
    /**
     * @param {InputMapperType} mapper 
     */
    reset(mapper){
        this._map = TemporaryMappper.createMap(mapper);
    }
    /**
     * @param {Number} code 
     * @param {String} symbol 
     */
    executeChangeSymbol(code,symbol){
        this._map.set( Number(code),symbol);
    }

    /**
     * 
     * @param {I_InputButton} button 
     * @param {I_SymbolDefine} symbol 
     */
    needsRirite(button,symbol){
        const obj= this._map.get(button.mapperId());
        return obj !==symbol.symbol();
    }
    /**
     * @returns {boolean} 内部の更新を行ったかどうか
     * @param {I_InputButton} botton 
     * @param {I_SymbolDefine} symbolObject 
     */
    change(botton,symbolObject){
        if(this.needsRirite(botton,symbolObject)){
            this.executeChangeSymbol(botton.mapperId(),symbolObject.symbol());
            return true;
        }
        return false;


    }
    /**
     * 
     * @param {I_InputButton} button 
     */
    getSymbolObjectByCode_V8(button){
        return this.getSymbolObjectByCode(button.mapperId());
    }

    /**
     * @param {Number} codeId 
     * @returns 
     */
    getSymbolObjectByCode(codeId){
        const symbol = this._map.get(codeId);
        return symbolManager.findSymbol(symbol);
    }
    /**
     * @param {Number} codeId 
     */
    symbolString(codeId){
        const symbol = this.getSymbolObjectByCode(codeId);
        if(symbol){
            return symbol.symbol();
        }
        return ""
    }
    /**
     * @param {Number} code 
     * @returns {String}
     */
    findSymbolByCode(code){
        return this._map.get(code);
    }
    /**
     * @param {Number} code 
     * @returns 
     */
    findObjectByCode(code){
        const symbolString = this.findSymbolByCode(code);
        return symbolManager.findSymbol(symbolString);
    }
    // /**
    //  * @param {String} symbol 
    //  */
    // findFromSymbol(symbol){
    //     for (const iterator of this._map.entries()) {
    //         if(iterator[1]===symbol){
    //             return iterator[0];
    //         }
    //     }
    //     return NaN;
    // }
    findObjectFromSymbol(symbolString){
        
    }

    /**
     * @param {String} symbol 
     * @param {Number} code
     */
    canSymbolChange(symbol,code){
        return !this.areSymbolAndCode(symbol,code);
    }
    /**
     * @param {String} symbol 
     * @param {Number} code
     */
     areSymbolAndCode(symbol,code){
        const aa = this._map.get(code);
        return aa ===symbol;
    }
    /**
     * @param {Number} code 
     */
    daleteByCode(code){
        this._map.delete(code);
    }


    /**
     * @param {String} symbol 
     */
    hasSymbol(symbol){
        const isEscapeCompatible = Input._isEscapeCompatible(symbol);
        for (const iterator of this._map.values()) {
            if(iterator ===symbol){
                return true;
            }
            if(isEscapeCompatible){
                if(iterator ==="escape"){
                    return true;
                }
            }
        }
        return false;
    }
    isValidMapper(){
        return symbolManager.isValidMapper_V3(this.createSymbolsSet());
    }
}

class Window_Selectable_InputConfigVer extends Window_Selectable{
    /**
     * @param {Rectangle} rect 
     */
    constructor(rect){
        super(rect);
    }
    itemLineRect(index){
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        return rect;    
    }

    /**
     * @returns {Number}
     */
    bottom(){
        return this.y + this.height;
    }
    /**
     * @param {MyRectType} rect 
     */
    initialize(rect){
        window_initializeMVMZ(this,rect,super.initialize);
    }
    isOkTriggered(){
        return Input.isTriggered("ok");
    }
    isCancelTriggered(){
        return Input.isTriggered('cancel');
    }
    textPadding(){
        return 6;
    }
    /**
     * @param {MyRectType} rect
     * @param {String} color
     */
    drawSymbolBack(rect, color) {
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
        this.changePaintOpacity(true);
    }
    /**
     * @returns {typeof ColorManager}
     * @desc MV/MZ共用処理。ソースコードはMZ向けで記述。
     */
    colorSrc(){
        //@ts-ignore
        return getColorSrc(this);
    }
    /**
     * @param {I_SymbolDefine} symbolObject 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     */
    drawSymbolObject(symbolObject,x,y,width){
        this.changePaintOpacity(symbolObject.isEnabled());
        this.drawText(symbolObject.name(),x,y,width);
    }

    numberWidth(){
        return 26;
    }
    /**
     * @param {I_InputButton} button 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     */
     drawButton_V3(button,x,y,width){
        const numberWidth  = this.numberWidth();
        this.drawText(button.mapperId(),x,y,numberWidth);
        const nameWidth= width -numberWidth
        const nameX = x + numberWidth;
        this.drawText(":"+button.name(),nameX,y,nameWidth);
    }
}
class Window_InputSymbolListBase extends Window_Selectable_InputConfigVer{
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect) {
        this.makeItemList();
        super.initialize(rect);
        this.deactivate();
        this.deselect();
        this.refresh();
    }
    makeItemList(){
        this._list = symbolManager.getSymbolList();
    }
    maxItems(){
        return this._list.length;
    }
    /**
     * @param {Number} index 
     */
    symbolObject(index){
        return this._list[index];
    }
    currentSymbolObject(){
        return this.symbolObject(this.index());
    }
    /**
     * @param {String} symbol 
     */
    indexOfSymbol(symbol){
        const numItms = this.maxItems();
        for (let i = 0; i < numItms; i++) {
            const symbolObj = this.symbolObject(i);
            if(symbolObj && symbolObj.symbol()===symbol){
                return i;
            }
        }
        return -1;
    }
    /**
     * @param {String} symbol 
     */
    selectSymbol(symbol){
        if(symbol){
            const index = this.indexOfSymbol(symbol);
            if(index >=0){
                this.select(index);
                return;
            }
        }
        this.select(0);
    }
    /**
     * @param {Number} index 
     */
    drawItem(index){
        const item = this.symbolObject(index);
        if(item){
            const rect = this.itemRectWithPadding(index);
            this.drawSymbolObject(item,rect.x,rect.y,rect.width);
        }
    }
    isCurrentItemEnabled(){
        return this.isItemEnabled(this._index);
    }
    /**
     * @private
     * @returns 
     */
    currentItemIsDeleter(){
        const item = this.symbolObject(this.index());
        if(item){
            return item.isDeleter();
            //有効化されていて、シンボルがnullなのはdeleteにしかない
            //return item.isEnabled() && (!item.symbol());
        }
        return false;
    }
    /**
     * @param {Number} index 
     */
    isItemEnabled(index){
        const symbol = this.symbolObject(index);
        if(symbol){
            return symbol.isEnabled();
        }
        return false;
    }
    updateHelp(){
        const symbol = this.currentSymbolObject()
        if(symbol){
            this._helpWindow.setText(symbol.getHelpText());
        }else{
            this._helpWindow.clear();
        }
    }
}
class Window_InputSymbolList extends Window_InputSymbolListBase{
    makeItemList(){
        super.makeItemList();
        //TODO:初期設定に戻す(ボタン単位)を追加 原理的には可能
        this._list.push(new SymbolDeleteObject());
    }
    maxCols(){
        return 4;
    }

}

function createPadState(padId) {
    //@ts-ignore
    if (!navigator.getGamepads) {
        return null;
    }
    //@ts-ignore
    const gamepads =navigator.getGamepads();
    if(!gamepads){return null}
    return  gamepads[padId];
}

class V8_Item{
    /**
     * @param {String} handlerSymbol 
     */
    constructor(handlerSymbol){
        this._commandSymbol=handlerSymbol;

    }
    refresh(){}
    leftText(){
        return "";
    }
    rigthText(){
        return "";
    }
    xxOpacity(){
        return true;
    }
    helpText(){
        return "";
    }
    handlerSymbol(){
        return this._commandSymbol;
    }
    /**
     * @returns {GamepadButtonObj}
     */
    button(){
        return null;
    }
}
class V8Item_Button extends V8_Item{

    /**
     * @param {GamepadButtonObj} button 
     * @param {TemporaryMappper} mapper
     */
    constructor(button,mapper){
        super("button");
        this._button=button;
        this._mapper =mapper;
        this.refresh();
    }
    refresh(){
        this._symbolObject= this._mapper.getSymbolObjectByCode_V8(this._button);
    }
    helpText(){
        if(this._symbolObject){
            return this._symbolObject.helpText();
        }
        return "";
    }
    button(){
        return this._button;
    }
    leftText(){
        return this._button.name();
    }
    rigthText(){
        const symbolName = this._symbolObject ?this._symbolObject.name():"";
        return `:${symbolName}`;
    }
}

class V8Item_Command extends V8_Item{
    /**
     * @param {CommandConcept} command 
     */
    constructor(command){
        super(command.handle());
        this._command=command;
        
    }
    leftText(){
        return this._command.name();
    }
    handlerSymbol(){
        return this._command.handle();
    }
}
class V8_Itemn_LayoutCommand extends V8Item_Command{
    /**
     * @param {CommandConcept} command 
     */
    constructor(command){
        super(command);
        this.setLayout(null);
    }
    /**
     * 
     * @param {DeviceLayout<GamepadButtonObj>} layout 
     */
    setLayout(layout){
        this._layout=layout;
    }
    helpText(){
        if(this._layout){
            return this._layout.name();
        }
        return "";
    }
}

class V8_Item_ApplyCommand extends V8Item_Command{

    /**
     * @param {CommandConcept} command 
     * @param {I_ReadonlyMapper} mapper
     */
    constructor(command,mapper){
        super(command);
        this._mapper=mapper;
    }
    refresh(){

    }

    xxOpacity(){
        return this._mapper.isValidMapper();
    }
}


class Window_GamepadConfig_V8 extends Window_Selectable_InputConfigVer{

    /**
     * @param {Rectangle} rect 
     */
    initialize(rect){
        const CommandManager =setting.command;
        this._tmpMapper= new TemporaryMappper(Input.gamepadMapper);
        this._layoutCommand = new V8_Itemn_LayoutCommand(setting.command.buttonLayout);
        this._exitCommand = new V8Item_Command(CommandManager.exit);
        this._resetCommand = new V8Item_Command(CommandManager.reset);
        this._applyCommand = new V8_Item_ApplyCommand(CommandManager.save,this._tmpMapper);
        const layout= setting.gamepad.currentLayout();
        /**
         * @type {ReadonlyArray<V8_Item>}
         */
        this._v8List=[];
        super.initialize(rect);
        this.setLayout(layout);
    }
    maxCols(){
        return 4;
    }
    getMapper(){
        return this._tmpMapper;
    }
    isCurrentCommandExit(){
        return this.currentItem() ===this._exitCommand;
    }
    selectExitCommand(){
        const index= this._v8List.lastIndexOf(this._exitCommand);
        if(index>=0){
            this.select(index);
        }
    }
    refresh(){
        this.makeV8Item();
        super.refresh();
    }
    /**
     * @private
     */
    makeV8Item(){
        const self_=this;
        const baseList =this._layout.buttons().map(  function(b){
            /**
             * @type {V8_Item}
             */
            const result= new V8Item_Button(b,self_._tmpMapper);
            return result;
        });
        baseList.push(this._applyCommand,this._resetCommand,this._layoutCommand,this._exitCommand);
        /**
         * @type {ReadonlyArray<V8_Item>}
         */
        this._v8List=baseList;
    }

    maxItems(){
        return this._v8List.length;
    }
    /**
     * @param {Number} index 
     * @returns 
     */
    drawItem(index){
        const item = this.itemAt(index);
        if(!item){return}
        const right = item.rigthText();
        const left = item.leftText();

        const rect = this.itemRectWithPadding(index);

        this.changePaintOpacity(item.xxOpacity());
        const rightWidth = (!!right) ? rect.width *0.7 : 0;
        this.drawText(left,rect.x,rect.y, rect.width - rightWidth);

        if(!!right){
            const rightX =rect.x + rect.width -rightWidth;
            this.drawText(right,rightX,rect.y,rightWidth);
        }
    }

    isOkEnabled(){
        return true;
    }

    callOkHandler(){
        const item=this.currentItem();
        if(item){
            const handlerSymbol = item.handlerSymbol();
            if(this.isHandled(handlerSymbol)){
                this.callHandler(handlerSymbol);
            }
        }
    }
    /**
     * @private
     * @param {Number} index 
     */
    itemAt(index){
        return this._v8List[index];
    }
    currentItem(){
        return this.itemAt(this.index());
    }
    currentButton(){
        const item = this.currentItem();
        if(item){
            return item.button();
        }
        return null;
    }
    isCurrentItemEnabled(){
        const item =this.currentItem();
        if(item){
            return item.xxOpacity();
        }

        return false;
    }
    /**
     * @param {GamepadButtonObj} button 
     */
    buttonName(button){
        return button.name();
    }

    /**
     * @param {DeviceLayout<GamepadButtonObj>} layout 
     */
    setLayout(layout){
        this._layout =layout;
        this._layoutCommand.setLayout(layout);
        this.makeV8Item();
        this.refresh();
    }

    updateHelp(){
        const item = this.currentItem();
        if(item){
            this._helpWindow.setText(item.helpText());
        }
    }
}
/**
 * @typedef {Object} GamepadDetailCommand
 * @property {()=>string} helpText
 */
/**
 * @extends {Window_Command<GamepadDetailCommand>}
 */
class Window_GamepadDetail extends Window_Command{

    updateHelp(){
        super.updateHelp();
        const ext = this.currentExt();
        if(ext){
            this._helpWindow.setText(ext.helpText());
        }
    }


}

class ButtonFindTask{

    constructor(){
        //NaNではない適当な値を入れておく
        //比較とかの関係
        this.clear();
    }
    clear(){
        this._lastButtonId =NaN;
        this._triggerLock = false;
        this._sameButtonPressCount =0;
    }

    isXXXX(){
        //ボタンを指定回数以上押したか？
        return !isNaN(this._lastButtonId) && this._sameButtonPressCount >=3;
    }

    /**
     * @param {number} buttonId 
     */
    #countUpButtonPressed(buttonId){

        this._lastButtonId = buttonId;
        this._sameButtonPressCount++;

    }

    buttonFindMode(){
        if(!navigator.getGamepads){
            return;
        }
        const gamepads = navigator.getGamepads();
        for (const iterator of gamepads) {
            this.#readButtonState(iterator);
        }
    }
    /**
     * @param {Gamepad} gamepad 
     */
    #readButtonState(gamepad){
        let buttonId =NaN;
        for (let index = 0; index < gamepad.buttons.length; index++) {
            if(gamepad.buttons[index].pressed){
                //既にボタンが押されている？
                if(!isNaN(buttonId) ){
                    //2個以上押されているので入力を無視
                    //入力を消去
                    this.clear();
                    return;
                }
                //押されたボタンを一時記録
                buttonId = index;
            }
        }
        //ボタンが押されなかった
        if(isNaN(buttonId)){
            this._triggerLock = false;
            return;
        }
        //一度ボタンが離されているか？
        if(!this._triggerLock){
            this.#countUpButtonPressed(buttonId);
        }
    }
   
}

class Scene_GamepadConfig_V8 extends Scene_MenuBaseMVMZ{
    constructor(){
        super();
        this._detailWindow = null;
        this._sybmolWindow = null;
        this._gamepadWindow = null;
        this._helpWindow = null;
    }
    backgroundBitmapFileName(){
        return setting.gamepadBackground;
    }

    symbolListHeight(){
        const mainAreaHeight=InputConfigManager.getWorkaround().mainAreaHeigth(this);
        return mainAreaHeight- this.mainWindowHeight();
    }
    mainWindowHeight(){
        return this.calcWindowHeight(4,true);
    }
    mainWindowRect(){
        const x = 0;
        const y= this.mainAreaTop();
        const width = Graphics.boxWidth;
        const height =this.mainWindowHeight()
        return new Rectangle(x,y,width,height);
    }



    createGamepadWindow(){
        const rect= this.mainWindowRect();
        const ww = new Window_GamepadConfig_V8(rect);
        ww.setHandler("button",this.onGamepadButton.bind(this));
        ww.setHandler("cancel",this.onGamepadCancel.bind(this));
        ww.setHandler(setting.command.exit.handle(),this.onGamepadCancel.bind(this));
        ww.setHandler(setting.command.save.handle(),this.onApply.bind(this));
        ww.setHandler(setting.command.reset.handle(),this.onReset.bind(this));
        ww.setHandler(setting.command.buttonLayout.handle(),this.onChangeLayoutOk.bind(this));
        this.addWindow(ww);

        this._gamepadWindow=ww;
    }
    createSymbolListRect(){
        const width =Graphics.boxWidth;
        const height = this.symbolListHeight();
        const x =0;
        const y = Graphics.boxHeight -height;

        return new Rectangle(x,y,width,height);
    }
    createSymbolListWindow(){
        const rect = this.createSymbolListRect();
        const sw = new Window_InputSymbolList(rect);
        sw.setHandler("ok",this.onSymbolListOk.bind(this));
        sw.setHandler("cancel",this.onSymbolListCnacel.bind(this));
        this._sybmolWindow=sw;
        this.addWindow(sw);
    }

    create(){
        super.create();
        this.createAllWindows();
    }
    createAllWindows(){
        this.createHelpWindow();
        this.createGamepadWindow();
        this.createSymbolListWindow();
        this.linkWindow();
    }
    linkWindow(){
        this._sybmolWindow.setHelpWindow(this._helpWindow);
        this._gamepadWindow.setHelpWindow(this._helpWindow);
        this._gamepadWindow.activate();
        this._gamepadWindow.select(0);
    }
    onGamepadReset(){
        const mapper = this._gamepadWindow.getMapper();
        mapper.reset_V2(InputConfigManager.defaultGamepadMapper());
        this._gamepadWindow.refresh();
        this._gamepadWindow.activate();
    }
    onGamepadButton(){
        const button = this._gamepadWindow.currentButton();
        if(!button){
            this._gamepadWindow.activate();
            return;
        }
        const mapper = this._gamepadWindow.getMapper();
        //そのボタンからシンボルを決定する
        const symbol= mapper.getSymbolObjectByCode_V8(button);
        const symbolString = symbol ? symbol.symbol():"";

        this._sybmolWindow.selectSymbol(symbolString);
        this._sybmolWindow.show();
        this._sybmolWindow.activate();
    }
    onGamepadCancel(){
        if(this._gamepadWindow.isCurrentCommandExit()){
            this.popScene();
            return;
        }
        this._gamepadWindow.selectExitCommand();
        this._gamepadWindow.activate();
    }

    onSymbolListOk(){
        //tmpMapperを捕まえる
        const mapper = this._gamepadWindow.getMapper();

        //シンボルとボタンを特定する
        const button =this._gamepadWindow.currentButton();
        const symbol =this._sybmolWindow.currentSymbolObject();
        if(button && symbol){
            SoundManager.playEquip();
            //書き換えを行う
            if(mapper.change(button,symbol)){
                //gamepadWindowを再描画
                this._gamepadWindow.refresh();
            }
        }
        //制御を移す
        this._sybmolWindow.deselect();
        this._gamepadWindow.activate();
    }

    onSymbolListCnacel(){
        this._sybmolWindow.deselect();
        //this._sybmolWindow.hide();
        this._gamepadWindow.activate();
    }
    onReset(){
        //マッパーを捕まえる
        const mapper=this._gamepadWindow.getMapper();
        const defaultMapper=InputConfigManager.defaultGamepadMapper()
        //デフォルトのマッパーを持ってくる
        //書き込む
        mapper.reset_V2(defaultMapper);

        //再描画する
        this._gamepadWindow.refresh();
        this._gamepadWindow.activate();
    }
    onApply(){
        //mapperを取得
        const mapper= this._gamepadWindow.getMapper();
        //状態が正しいかを確認
        if(mapper.isValidMapper()){
            mapper.applyGamepad();
            this.popScene();
        }else{
            this._gamepadWindow.activate();
        }

    }
    onChangeLayoutOk(){
        const selector = setting.gamepad.layoutSelector();
        selector.changeNext();
        this._gamepadWindow.setLayout(selector.currentLayout() );
        this._gamepadWindow.activate();
    }

    gamepadDetailRect(){
        return new Rectangle(200,200,200,400);
    }

    isButtonFindMode(){
        return false;
    }

    startButtonFindMode(){


    }

    buttonFindMode(){
        if(!navigator.getGamepads){
            return;
        }
        const gamepads = navigator.getGamepads();

        
    }



    createGamepadDetailWindow(){
        const rect = this.gamepadDetailRect();
        const gdw = new Window_GamepadDetail(rect);
        //TODO:ボタン検索モード


        for (const iterator of setting.gamepad.layoutSelector().list()) {
            //gdw.addCommand(iterator.name(),iterator.)
        } 


        this._detailWindow=gdw;
        this.addWindow(gdw);

    }
    onDetailLayoutOk(){
        const selector = setting.gamepad.layoutSelector();
        selector.selectOfSymbol(this._detailWindow.currentSymbol())
        this._gamepadWindow.setLayout(selector.currentLayout() );
        this._gamepadWindow.activate();

        this._detailWindow.deactivate();
        this._detailWindow.hide();
    }
}


function createButtonLayoutChangeCommand(){
    const mText = new MultiLanguageText("Change button notation","ボタン表記変更");
    const command = new Key_Command("ButtonLayout",mText,3,null);
    return command;
}






/**
 * @returns {Readonly<InputDeviceBase>}
 */
function getCurrentDevice(){
    if(setting.gamepad.isConected()){
        return setting.gamepad;
    }
    return setting.keyboard;
}
/**
 * @template T
 */
class Window_WideButton_Selectable extends Window_Selectable_InputConfigVer{

    /**
     * @param {Rectangle} rect 
     */
    constructor(rect){
        super(rect);
        this._lastBackground =-1;

    }

    /**
     * @param {number} index 
     */
    drawItemBackground(index){
        const head = this.itemHeadIndex(index);
        if(head!==this._lastBackground ){
            super.drawItemBackground(index);
            this._lastBackground =index;
        }
    }

    /**
     * @param {number} index 
     * @returns {T}
     */
    itemAt(index){
        return null;
    }
    /**
     * @returns {T}
     */
    currentItem(){
        return this.itemAt(this.index());
    }
    /**
     * @param {number} index 
     */
    itemHeadIndex(index){
        const item = this.itemAt(index);
        if(!item){
            return index;
        }
        for(let i =index; i >=0; --i){
            const preItem =this.itemAt(i-1);
            if(item !== preItem){
                return i;
            }
        }
        return index;
    }
    /**
     * 
     * @param {number} index 
     */
    itemTallIndex(index){
        const item = this.itemAt(index);
        const last =this.maxItems();
        for(let i= index ; i <last; ++i){
            if(item !== this.itemAt(i+1)){
                return i;
            }
        }
        return index;
    }
    /**
     * @param {number} index 
     * @returns 
     */
    itemRect(index){
        const item = this.itemAt(index);
        if(!item){
            return super.itemRect(index);
        }
        const head = this.itemHeadIndex(index);
        const tail = this.itemTallIndex(index);

        const rect = super.itemRect(head);
        const distance = tail - head;
        const widthEx= (this.itemPadding() +this.itemWidth() ) *distance;

        rect.width += widthEx;
        return rect;
    }

}
/**
 * @extends Window_WideButton_Selectable<keylayoutItem>
 */
class Window_KeyConfig_MA_V10 extends Window_WideButton_Selectable{

    enterJIS_Rect(){
        const rect = super.itemRect(32);
        if(this.itemAt(32)===KEYS.ENTER_JIS){
            rect.width += this.itemWidth();
            rect.height += this.itemHeight();
        }
        return rect;
    }
    /**
     * @param {Number} index 
     * @returns {Rectangle}
     */
    itemRect(index){
        const item = this.itemAt(index);
        if(item===KEYS.ENTER_JIS || item===KEYS.ENTER_JIS_NULL){
            return this.enterJIS_Rect();
        }
        return super.itemRect(index);

    }
    /**
     * @returns {{color1:string,color2:string}}
     * @param {number} index 
     */
    colorPair(index){
        const item = this.itemAt(index);
        if(item){
            const symbol= this.symbolObject(item);
            if(symbol){
                const color1= symbol.backColor();

                return {
                    color1,
                    color2:ColorManager.itemBackColor2(),
                }
            }
        }
        return {
            color1:ColorManager.itemBackColor1(),
            color2:ColorManager.itemBackColor2(),
        }

    }
    /**
     * @param {number} index 
     */
    drawItemBackground(index){
        const rect = this.itemRect(index);
        const pair = this.colorPair(index);
        this.drawItemBackgroundEx(rect,pair.color1,pair.color2);
    }

    /**
     * 
     * @param {Rectangle} rect 
     * @param {string} color1 
     * @param {string} color2 
     */
    drawItemBackgroundEx(rect,color1,color2){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        this.contentsBack.gradientFillRect(x, y, w, h, color1, color2, true);
        this.contentsBack.strokeRect(x, y, w, h, color1);
    
    }

    /**
     * @private
     * @param {Window_KeyCommand} command 
     */
    setCommandWindow(command){
        this._keyCommandWindow=command;
    }
    /**
     * @param {Rectangle} rect 
     */
    initialize(rect){
        //this._commandWindow=null;
        this._mapper=( setting.Keyboard.createTemporaryMapper());
        this._layout = setting.Keyboard.currentLayout();
        super.initialize(rect);
    }
    /**
     * @param {DeviceLayout<keylayoutItem>} layout 
     */
    setLayout(layout){
        this._layout=layout;
        this.refresh();
    }
    changeNextLayout(){
        const selector = setting.Keyboard.layoutSelector();
        selector.changeNext();
        this.setLayout(selector.currentLayout())
    }
    isValidMapper(){
        return this._mapper.isValidMapper();
    }
    executeSave(){
        this._mapper.applyKeyboard();
    }
    /**
     * @param {DefaultMapper} value 
     */
    resetMapper(value){
        this._mapper.reset_V2(value);
        this.refresh();
    }
    /**
     * 
     * @param {DeviceLayout<keylayoutItem>} layout 
     */
    setKeyLayout(layout){

        this.refresh();
    }
    setupWASD(){
        /**
         * @type {Array<{code:number,symbol:string}>}
         */
        const WASD= [
            {code:81,symbol:"pageup"},
            {code:69,symbol:"pagedown"},
            {code:87,symbol:"up"},
            {code:65,symbol:"left"},
            {code:83,symbol:"down"},
            {code:68,symbol:"right"}
        ];
        for (const iterator of WASD) {
            this._mapper.executeChangeSymbol(iterator.code,iterator.symbol);
        }
        this.refresh();
    }
    /**
     * @param {boolean} wrap 
     */
    cursorRight(wrap){
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        const horizontal = this.isHorizontal();
        const teli =this.itemTallIndex(index);
        if (maxCols >= 2 && (teli < maxItems - 1 || (wrap && horizontal))) {
            this.smoothSelect((teli + 1) % maxItems);
        }    
    }
    /**
     * @param {boolean} wrap 
     */
    cursorLeft(wrap){
        const index = Math.max(0, this.index());
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        const horizontal = this.isHorizontal();
        const head = this.itemHeadIndex((index));
        if (maxCols >= 2 && (head > 0 || (wrap && horizontal))) {
            this.smoothSelect((head - 1 + maxItems) % maxItems);
        }
    }
    maxItems(){
        return this._layout.numButtons();
    }
    /**
     * @param {number} index 
     * @returns 
     */
    itemAt(index){
        return this._layout.button(index);
    }

    /**
     * @param {string} keyName 
     * @param {string} symbolName 
     * @param {Rectangle} rect 
     */
    drawKey(keyName,symbolName,rect){
        const keyNameFontSize =this.keyNameFontSize();
        
        this.contents.fontSize =keyNameFontSize;
        this.drawText(keyName,rect.x,rect.y,rect.width,"center");
        this.contents.fontSize = this.symbolNameFontSize();
        this.drawText(symbolName,rect.x,rect.y +this.symbolNameFontSize()+2 ,rect.width,"center");
    }
    

    /**
     * @param {number} index 
     * @returns 
     */
    drawItem(index){

        const item = this.itemAt(index);
        if(!item){ return;}
        if(item ===KEYS.ENTER_JIS_NULL){
            return;
        }
        const preItem = this.itemAt(index-1);
        if(preItem ===item){return;}
        const symbol = this.symbolObject(item);
        
        const rect = (item.isCommand() || item ===KEYS.ENTER_JIS  ) ? this.itemLineRect(index)  :  this.itemRectWithPadding(index);
        const keyName = item.name();
        const symbolName = symbol ? symbol.displayKeyName() : "";
        this.drawKey(keyName,symbolName,rect);
    }
    keyNameFontSize(){
        return 22;
    }
    symbolNameFontSize(){
        return 18;
    }
    /**
     * @param {keylayoutItem} item 
     */
    symbolObject(item){
        return this._mapper.findObjectByCode(item.mapperId());
    }
    lineHeight(){
        return 24;
    }
    itemHeight(){
        return this.keyNameFontSize()+this.symbolNameFontSize()+this.rowSpacing() +2;
    }
    itemPadding(){
        return 2;
    }
    colSpacing(){
        return 2;
    }
    rowSpacing(){
        return 2;
    }
    maxCols(){
        return 19;
    }


    /**
     * 
     * @param {number} index 
     * @returns 
     */
    itemRectWithPadding(index){
        const rect = this.itemRect(index);
        const padding = this.itemPadding();
        rect.x += padding;
        rect.width -= padding * 2;
        return rect;            
    }
    redrawApplyCommand(){
        this.redrawItem(95);
    }
    layoutHelpText(){
        return this._layout.name();
    }
    /**
     * @this {Readonly<Window_KeyConfig_MA_V10>}
     * @param {number} index 
     * @returns 
     */
    getHelpText(index){
        const item = this.itemAt(index);
        if(!item){
            return ""
        }
        if(item ===setting.command.keyLayout){
            return this.layoutHelpText();
        }
        if(item.isCommand()){
            return item.helpText();
        }

        const obj= this.symbolObject(item);
        if(obj){
            return obj.helpText();
        }
        return "";
    }
    
    updateHelp(){
        const text = this.getHelpText(this.index());

        this._helpWindow.setText(text);
    }
    isOkEnabled(){
        return true;
    }
    selectExit() {
        const index = this._layout.lastIndexOf(setting.command.exit);
        this.select(index);
    }
    currentItemIsExit(){
        return this.currentItem() === setting.command.exit;
    }

    isCurrentItemEnabled(){
        const item = this.currentItem();
        if(!item){
            return false;
        }
        //保存
        if(item ===setting.command.save){
            return this._mapper.isValidMapper();
        }
        return item.isEnabled();
    }

    processOk(){
        if (this.isCurrentItemEnabled()) {
            //this.playOkSound();
            this.updateInputData();
            this.deactivate();
            const item = this.currentItem();
            if(item){
                this.callHandler(item.handle());
            }
        } else {
            this.playBuzzerSound();
        }    
    }
    /**
     * @param {I_SymbolDefine} newSymbol 
     */
    changeSymbol(newSymbol){
        const key = this.currentItem();
        if(!key.isCommand()){
            if(this._mapper.change(key,newSymbol)){
                this.refresh();
            }
        }
    }
}


class Window_KeyCommand extends Window_Command{
    initialize(rect){
        window_initializeMVMZ(this,rect,super.initialize);
    }
    makeCommandList(){
    }
    /**
     * @param {Key_Command} command 
     */
    addCommandEx(command){
        this.addCommand(command.name(),command.handle(),true);
    }
    testKeyMapper(b){
        this.clearCommandList();


        this.addCommandEx(setting.command.wasd);
        this.addCommandEx(setting.command.reset);

    }
}
class Scene_KeyConfig_V10 extends Scene_MenuBaseMVMZ{
    constructor(){
        super();
        this._symbolWindow =null;
        this._keyConfigWindow=null;
    }
    backgroundBitmapFileName(){
        return setting.keyBackground;
    }



    create(){
        super.create();
        this.createAllWindows();
    }
    createAllWindows(){
        this.createHelpWindow();
        this.createKeyboardWindow();
        this.createSymbolListWindow();

        this.linkWindow();
    }
    linkWindow(){
        this._keyConfigWindow.setHelpWindow(this._helpWindow);
        this._keyConfigWindow.activate();
        this._symbolWindow.setHelpWindow(this._helpWindow);
    }

    playChangeKeySound(){
        SoundManager.playEquip();
    }

    symbolListHeight(){
        const mainAreaHeight=InputConfigManager.getWorkaround().mainAreaHeigth(this);
        return mainAreaHeight- this.mainWindowHeight();
    }
    symbolListRect(){
        const width =Graphics.boxWidth;
        const height = this.symbolListHeight();
        const x =0;
        const y = Graphics.boxHeight -height;

        return new Rectangle(x,y,width,height);
    }
    createSymbolListWindow(){
        const rect = this.symbolListRect();
        const sw = new Window_InputSymbolList(rect);
        sw.setHandler("ok",this.onSymbolOk.bind(this));
        sw.setHandler("cancel",this.onSymbolCancel.bind(this));
        this._symbolWindow=sw;
        this.addWindow(sw);
    }
    onSymbolOk(){
        const symbol =this._symbolWindow.currentSymbolObject();
        if(symbol){
            this._keyConfigWindow.changeSymbol(symbol);
        }
        this.playChangeKeySound();
        this._symbolWindow.deselect();
        this._keyConfigWindow.activate();

    }
    onSymbolCancel(){
        this._symbolWindow.deselect();
        this._keyConfigWindow.activate();
    }

    mainWindowRect(){
        const x = 0;
        const y= this.mainAreaTop();
        const width = Graphics.boxWidth;
        const height =this.mainWindowHeight()
        return new Rectangle(x,y,width,height);
    }
    mainWindowHeight(){
        if(Utils.RPGMAKER_NAME ==="MV"){
            return 300;
        }
        return 288;
        //return this.calcWindowHeight(8,true);
    }

    createKeyboardWindow(){
        const rect = this.mainWindowRect();
        const kw = new Window_KeyConfig_MA_V10(rect);        
        kw.setHandler("cancel",this.onKeyboardCancel.bind(this));
        kw.setHandler("key",this.onKey.bind(this));
        kw.setHandler(setting.command.reset.handle(),this.onKeyboardReset.bind(this));
        kw.setHandler(setting.command.exit.handle(),this.onKeyboardCancel.bind(this));
        kw.setHandler(setting.command.keyLayout.handle(),this.onKeyLayout.bind(this));
        kw.setHandler(setting.command.wasd.handle(),this.onKeyWASD.bind(this));
        kw.setHandler(setting.command.save.handle(),this.onApply.bind(this));
        kw.refresh();
        kw.select(0);
        this._keyConfigWindow=kw;
        this.addWindow(kw);
    }
    onKeyWASD(){
        this.playChangeKeySound();
        SoundManager.playEquip();
        this._keyConfigWindow.setupWASD();
        this._keyConfigWindow.activate();
    }
    onKeyboardReset(){
        this.playChangeKeySound();
        this._keyConfigWindow.resetMapper(InputConfigManager.defaultKeyMapper());
        this._keyConfigWindow.activate();



    }
    onKeyboardCancel(){
        if(this._keyConfigWindow.currentItemIsExit()){
            this.popScene();
        }else{
            this._keyConfigWindow.selectExit();
            this._keyConfigWindow.activate();

        }

    }
    commandWindowRect(){
        const height =this.calcWindowHeight(1,true);
        const y = this.mainAreaTop() + this.mainWindowHeight();
        return new Rectangle(0,y,Graphics.boxWidth,height);
    }
    onKey(){
        this._keyConfigWindow.playOkSound();
        const item = this._keyConfigWindow.currentItem();
        this._symbolWindow.activate();
        if(item){
            const symbol= this._keyConfigWindow.symbolObject(item);
            if(symbol){
                this._symbolWindow.selectSymbol(symbol.symbol());
                return;
            }
        }
        this._symbolWindow.select(0);            
    }
    onKeyLayout(){
        this.playChangeKeySound();
        this._keyConfigWindow.changeNextLayout();
        this._keyConfigWindow.activate();
    }
    onApply(){
        if(this._keyConfigWindow.isValidMapper()){
            this.playChangeKeySound();
            this._keyConfigWindow.executeSave();
            this.popScene();
            return;
        }else{
            this._keyConfigWindow.playBuzzerSound();
            this._keyConfigWindow.activate();
        }
        
    }

}




    const Window_Options_addVolumeOptions=Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions=function(){
        Window_Options_addVolumeOptions.call(this);
        this.addCommand(currentGamepadConfigText(),MA_GAMEPAD_CONFIG,true);
        this.addCommand(currentKeyConfigText(),MA_KEYBOARD_CONFIG,true);
    }
    const Window_Options_statusText=Window_Options.prototype.statusText;
    /**
     * @param {Number} index 
     * @returns 
     */
    Window_Options.prototype.statusText =function(index){
        const symbol=this.commandSymbol(index)
        if(symbol===MA_GAMEPAD_CONFIG){
            return "";
        }
        if(symbol===MA_KEYBOARD_CONFIG){
            return "";
        }
        return Window_Options_statusText.call(this,index);
    }

    const Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk =function(){
        Window_Options_processOk.call(this);
        if(SceneManager.isSceneChanging()){
            return;
        }
        if(this.currentSymbol()===MA_GAMEPAD_CONFIG){
            this.playOkSound();
            Mano_InputConfig.gotoGamepad();
            return;
        }
        if(this.currentSymbol()===MA_KEYBOARD_CONFIG){
            this.playOkSound();
            Mano_InputConfig.gotoKey();
            return;
        }
    };
const Scene_Options_maxCommands=Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands =function(){
    return Scene_Options_maxCommands.call(this)+2;
};

function setupPP_option(){
    //これ以外の方法だと、変数が宣言されていないエラーで死ぬ
    if(!Imported.PP_Option){
        return;
    }
    if(PP_Option && PP_Option.Manager){
        PP_Option.Manager.addOptionEX(MA_GAMEPAD_CONFIG, currentGamepadConfigText,function(w,s,i){
            Mano_InputConfig.gotoGamepad();
        });
        PP_Option.Manager.addOptionEX(MA_KEYBOARD_CONFIG, currentKeyConfigText,function(w,s,i){
            Mano_InputConfig.gotoKey();
        });    
    }
}
function setupDefaultMapper(){
    //メモ
    //この処理はConfigManager.load()よりも先に行う必要がある。
    //MVでの挙動が怪しい予感はする
    symbolManager.onBoot();
    //TODO:これの型を変更する 変数の保存場所も変更する
    InputConfigManager.makeDefaultMapper();
}
const DataManager_loadDatabase=DataManager.loadDatabase;
DataManager.loadDatabase =function(){
    DataManager_loadDatabase.call(this);
    //メモ・MV/MZの双方で、ここの方がタイミングとして安全
    setupDefaultMapper();
    setupPP_option();
};
const Game_Map_setupStartingEvent =Game_Map.prototype.setupStartingEvent;
Game_Map.prototype.setupStartingEvent =function(){
    symbolManager.callButtonEvent();
    return Game_Map_setupStartingEvent.call(this);
};


class Window_DebugSymbols extends Window_InputSymbolListBase{


}
//TODO:エラー診断　パラメータの問題を検出して、解決方法を提示
class Scene_ErrorDetection extends Scene_MenuBaseMVMZ{


}


/**
 * @param {String} symbol 
 * @returns 
 */
const GetButtonNameMV =function(symbol){
    const device = getCurrentDevice();
    const button = device.getButtonBySymbol(symbol);
    if(button){
        return button.name();
    }
    return "";
};

/**
 * @param {{symbol:String, nameVariable:Number}} arg 
 */
const GetButtonName =function(arg){
    const device =getCurrentDevice();
    const button = device.getButtonBySymbol(arg.symbol);
    if(button){
        $gameVariables.setValue(arg.nameVariable,button.name());
    }
};



if(Utils.RPGMAKER_NAME =="MV"){
    (function(){

        Window_Selectable_InputConfigVer.prototype.smoothSelect =function(index){
            this.select(index);
        }

        // const Scene_Boot_start =Scene_Boot.prototype.start;
        // Scene_Boot.prototype.start =function(){
        //     Scene_Boot_start.call(this);
        //     setupDefaultMapper();
        // };
        Window_Selectable_InputConfigVer.prototype.drawItemBackground =function(){};

        Window_Selectable_InputConfigVer.prototype.maxVisibleItems =function(){
            const visibleRows = Math.ceil(this.contentsHeight() / this.itemHeight());
            return visibleRows * this.maxCols();        
        };
        Window_Selectable_InputConfigVer.prototype.itemRectWithPadding = Window_Selectable_InputConfigVer.prototype.itemRectForText;
    })();
}else{
    PluginManager.registerCommand( PLUGIN_NAME,"IsGamepadValid",function(arg){
        const sid = (arg.switchId);
        const set = new Set( Object.values(Input.gamepadMapper))
        const value = symbolManager.isValidMapper_V3(set);
        $gameSwitches.setValue(sid,value);
    });
    PluginManager.registerCommand( PLUGIN_NAME,"IsKeyboardValid",function(arg){
        const sid = (arg.switchId);
        const set = new Set( Object.values(Input.keyMapper))
        const value = symbolManager.isValidMapper_V3(set);
        $gameSwitches.setValue(sid,value);
    });
    PluginManager.registerCommand( PLUGIN_NAME,"GetButtonName",GetButtonName);
    PluginManager.registerCommand( PLUGIN_NAME,"GetButtonNameEX",GetButtonName);

    PluginManager.registerCommand(PLUGIN_NAME,"GamepadScene",function(){
        Mano_InputConfig.gotoGamepad();
    });

    PluginManager.registerCommand(PLUGIN_NAME,"KeyboardScene",function(){
        Mano_InputConfig.gotoKey();
    });


}

// class Mano_InputConfigExport{
//     get Scene_KeyConfig(){
//         return Scene_KeyConfig_V10;
//     }
//     get Scene_GamepadConfig(){
//         return Scene_GamepadConfig_V8;
//     }
//     gotoKey(){
//         SceneManager.push(Mano_InputConfig.Scene_KeyConfig );
//     }
//     gotoGamepad(){
//         SceneManager.push(Mano_InputConfig.Scene_GamepadConfig );
//     }
//     /**
//      * 
//      * @param {string} symbol 
//      */
//     GetButtonNameMV(symbol){
//         return GetButtonNameMV(symbol);
//     }
// }

// return new Mano_InputConfigExport();

const exportClass ={
    //MV用・ヘルプへの記載予定なし
    GetButtonNameMV:GetButtonNameMV,
    //Scene_ConfigBase:Scene_InputConfigBase_MA,
    Scene_KeyConfig:Scene_KeyConfig_V10,
    Scene_GamepadConfig: Scene_GamepadConfig_V8,
    //Scene_GamepadConfig_ALT:Scene_GamepadConfig_ALT,
    // Window_InputSymbolList:Window_InputSymbolList,
    // Window_GamepadConfig:Window_GamepadConfig_MA,
    //Window_KeyConfig:Window_KeyConfig_MA,
    //defaultKeyMapper:{},
    //defaultGamepadMapper:{},
    gotoKey:function(){
        SceneManager.push(Mano_InputConfig.Scene_KeyConfig );
    },
    gotoGamepad:function(){
        SceneManager.push(Mano_InputConfig.Scene_GamepadConfig );
    },
};

return exportClass;
})();
{
//Sorry for the dirty implementation.
//Since there were many questions from users who use YEP_OptionCore together on how to set plug-in parameters, we are responding by the following method.
    const param = PluginManager.parameters("Mano_InputConfig");
    if(param && param.SettingsForYEP_OptionsCore){
        const obj =JSON.parse(param.SettingsForYEP_OptionsCore);

        //インポート情報を偽装し、GamepadConfig/KeybordConfigと認識させる
        if(obj.gamepad==="true"){
            Imported.GamepadConfig = true;
            //@ts-ignore
            window["Scene_GamepadConfig"] =Mano_InputConfig.Scene_GamepadConfig;
            //何かよくわからない関数が追加されているので、適当に追加する
            //@ts-ignore
            Input.isControllerConnected =Input.isControllerConnected||function(){return true;};
        }
        if(obj.Keyboard==="true"){
            Imported.YEP_KeyboardConfig = true;
            //@ts-ignore
            window["Scene_KeyConfig"] = Mano_InputConfig.Scene_KeyConfig;    
        }
    }
}

