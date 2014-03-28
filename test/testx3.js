/**
 * プロトタイプを使ったコンストラクタパターンで定義したクラス。
 * 
 * @param {string} name 
 * @param {integer} age
 */
var PrototypeWithConstructor = function(name, age) {
	this.name = name; // スコープが public なプロパティ
	this.age = age; // スコープが public なプロパティ
};
PrototypeWithConstructor.prototype = {
	/**
	 * プロパティを返す。
	 * 
	 * @return {string} プロパティの文字列結合
	 */
	toString: function() {
		return this.name + ":" + this.age;
	}
};

module("インスタンスの生成確認");
test("コンストラクタで指定した値が取得できること", function() {
	var sut = new PrototypeWithConstructor("hoge", 30);
	strictEqual(sut.toString(), "hoge:30");

});

module("プロパティのスコープ確認");
test("プロパティは public スコープなので外部から参照できることを確認する", function() {
	var sut = new PrototypeWithConstructor("hoge", 30);
	strictEqual(sut.toString(), "hoge:30", "コンストラクタで指定した値が取得できること");

	strictEqual(sut.name, "hoge", "プロパティ hoge を参照できること");
	strictEqual(sut.age, 30, "プロパティ age を参照できること");

});

test("プロパティは public スコープなので外部から値を変更できることを確認する", function() {
	var sut = new PrototypeWithConstructor("hoge", 30);
	strictEqual(sut.toString(), "hoge:30", "コンストラクタで指定した値が取得できること");

	sut.name = "fuga";
	sut.age = 40;
	strictEqual(sut.toString(), "fuga:40", "コンストラクタで指定した値が変更されていること");

});

module("プロパティの非共有");
test("プロパティの値がインスタンス間で共有されないことを確認する", function() {
	var hoge30 = new PrototypeWithConstructor("hoge", 30);
	strictEqual(hoge30.toString(), "hoge:30", "コンストラクタで指定した値が取得できること");

	var fuga40 = new PrototypeWithConstructor("fuga", 40);
	strictEqual(fuga40.toString(), "fuga:40", "コンストラクタで指定した値が取得できること");

	fuga40.age = 41;
	strictEqual(hoge30.toString(), "hoge:30", "fuga の age を変更しても hoge には反映されない");

});
