/**
 * TODO 
 * 
 */
var ModulePattern2 = (function() {

	var _gender = "male"; // スコープが private なプロパティ

	/**
	 * コンストラクタ関数。
	 * 
	 * @param  {string} name 
	 * @param  {integer} age 
	 */
	var constructor = function(name, age) {
		this.name = name; // スコープが public なプロパティ
		this.age = age; // スコープが public なプロパティ
	};

	/**
	 * prototype に関数を定義。
	 *
	 * ここに定義する関数はすべて public スコープになる。
	 * 
	 */
	constructor.prototype = {
		/**
		 * TODO
		 * 
		 * @return {string} 
		 */
		toString: function() {
			return this.name + ":" + this.age;
		},
		/**
		 * プロパティ _gender の getter。
		 * 
		 * @return {string} 性別
		 */
		getGender:  function() {
			return _gender;
		},
		/**
		 * プロパティ _gender の setter。
		 * 
		 * @param {string} gender 性別
		 */
		setGender: function(gender) {
			_gender = gender;
		}
	};

	return constructor;

})();

module("インスタンスの生成確認");
test("コンストラクタで指定した値が取得できること", function() {
	var sut = new ModulePattern2("hoge", 30);
	strictEqual(sut.toString(), "hoge:30");

});

module("プロパティのスコープ確認");
test("プロパティは public スコープなので外部から参照できることを確認する", function() {
	var sut = new ModulePattern2("hoge", 30);
	strictEqual(sut.name, "hoge", "プロパティ name を参照できること");
	strictEqual(sut.age, 30, "プロパティ age を参照できること");

});

test("プロパティは public スコープなので外部から値を変更できることを確認する", function() {
	var sut = new ModulePattern2("hoge", 30);
	sut.name = "fuga";
	sut.age = 40;
	strictEqual(sut.toString(), "fuga:40", "コンストラクタで指定した値が変更されていること");

});

module("スコープが public なプロパティの非共有");
test("スコープが public なプロパティの値がインスタンス間で共有されないことを確認する", function() {
	var hoge30 = new ModulePattern2("hoge", 30);
	strictEqual(hoge30.toString(), "hoge:30", "コンストラクタで指定した値が取得できること");

	var fuga40 = new ModulePattern2("fuga", 40);
	strictEqual(fuga40.toString(), "fuga:40", "コンストラクタで指定した値が取得できること");

	fuga40.age = 41;
	strictEqual(hoge30.toString(), "hoge:30", "fuga の age を変更しても hoge には反映されない");

});

module("スコープが private なプロパティの共有");
test("スコープが private なプロパティの値がインスタンス間で共有されることを確認する", function() {
	var hoge30 = new ModulePattern2("hoge", 30);
	strictEqual(hoge30.getGender(), "male", "gender の初期値は male");

	var fuga40 = new ModulePattern2("fuga", 40);
	strictEqual(fuga40.getGender(), "male", "gender の初期値は male");

	strictEqual(hoge30._gender, undefined, "スコープが private なので直接参照できない");
	hoge30.setGender("female"); // hoge30 の gender を female に変更する
	strictEqual(hoge30.getGender(), "female", "hoge30 の gender は female になる");
	strictEqual(fuga40.getGender(), "female", "fuga40 の gender も female になってしまう");

});
