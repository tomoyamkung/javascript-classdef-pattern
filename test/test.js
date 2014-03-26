
module("");
test("hoge", function() {
	strictEqual("hoge", "hoge");
});

module("module pattern");
var ModulePattern = (function() {

	var _name; // return で返さない → private スコープ
	var _age; // return で返さない → private スコープ

	// return で返すプロパティや関数はクラスの外部からアクセス可能 → public スコープ
	return {
		/**
		 * プロパティを指定の値で初期化する。
		 * 
		 * @param  {string} name
		 * @param  {integer} age
		 */
		init: function(name, age) {
			_name = name;
			_age = age;
		},
		/**
		 * プロパティを返す。
		 * 
		 * @return {string} プロパティの文字列結合
		 */
		toString: function() {
			return _name + ":" + _age;
		},
		/**
		 * プロパティ age の setter
		 * 
		 * @param {integer} age 
		 */
		setAge: function(age) {
			_age = age;
		}
	};
})();
test("疑似初期化関数を使ってプロパティの値を設定する", function() {
	// コンストラクタ関数がないので、プロパティを初期化する疑似初期化関数で値を設定する
	ModulePattern.init("hoge", 30);
	strictEqual(ModulePattern.toString(), "hoge:30", "init 関数で設定した値が取得できること");
	
});
test("private スコープなプロパティの値は直接変更できないことを確認する", function() {
	strictEqual(ModulePattern.toString(), "hoge:30", "テストケースが異なってもプロパティの値は同じであること");

	ModulePattern._age = 31; // private スコープなプロパティの値は、クラスの外部から直接アクセスできない
	strictEqual(ModulePattern.toString(), "hoge:30", "age の値は変わらないこと");

	ModulePattern.setAge(31); // setter メソッドを通せば private スコープであってもプロパティの値は変更できる
	strictEqual(ModulePattern.toString(), "hoge:31", "age が 31 になること");

});
