/**
 * TODO 
 * 
 */
var ModulePattern2 = (function() {

	/**
	 * コンストラクタ関数。
	 * 
	 * @param  {string} name 
	 * @param  {integer} age 
	 */
	var constructor = function(name, age) {
		this.name = name;
		this.age = age;
	};

	constructor.prototype = {
		/**
		 * TODO
		 * 
		 * @return {string} 
		 */
		toString: function() {
			return this.name + ":" + this.age;
		},
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

module("プロパティの非共有");
test("プロパティの値がインスタンス間で共有されないことを確認する", function() {
	var hoge30 = new ModulePattern2("hoge", 30);
	strictEqual(hoge30.toString(), "hoge:30", "コンストラクタで指定した値が取得できること");

	var fuga40 = new ModulePattern2("fuga", 40);
	strictEqual(fuga40.toString(), "fuga:40", "コンストラクタで指定した値が取得できること");

	fuga40.age = 41;
	strictEqual(hoge30.toString(), "hoge:30", "fuga の age を変更しても hoge には反映されない");

});