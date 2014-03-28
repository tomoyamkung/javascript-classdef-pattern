/**
 * モジュールパターンで定義したクラス。
 *
 * シングルトン？
 */
var ModulePattern = (function() {

	var _name; // スコープが private なプロパティ
	var _age; // スコープが private なプロパティ
	var _gender = "male"; // return で返す → スコープが public なプロパティ

	/**
	 * return で返すプロパティや関数はクラスの外部からアクセス可能 → public スコープ
	 */
	return {
		gender: _gender, // "gender" という名前で外部からアクセスする

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
			return _name + ":" + _age + ":" + this.gender;
		},
		/**
		 * プロパティ age の setter
		 * 
		 * @param {integer} age 
		 */
		setAge: function(age) {
			_age = age;
		},
	};

})();

module("スコープが private なプロパティの初期化");
test("疑似初期化関数を使ってプロパティの値を設定する", function() {
	// コンストラクタ関数がないので、プロパティの初期化を行う「疑似初期化関数」で値を設定する
	ModulePattern.init("hoge", 30);
	strictEqual(ModulePattern.toString(), "hoge:30:male", "init 関数で設定した値が取得できること");

});

module("プロパティのスコープ確認");
test("スコープが private なプロパティの値は直接変更できないことを確認する", function() {
	strictEqual(ModulePattern.toString(), "hoge:30:male", "以下で値を変更する前に格納されている値を確認");

	ModulePattern._age = 31; // スコープが private なプロパティの値は、クラスの外部から直接アクセスできない
	strictEqual(ModulePattern.toString(), "hoge:30:male", "age の値は変わらないこと → 外部からアクセスできない");

	ModulePattern.setAge(31); // setter メソッドを通せば、スコープが private なプロパティであっても値は変更できる
	strictEqual(ModulePattern.toString(), "hoge:31:male", "age が 31 になること");

});

test("スコープが public なプロパティの値は直接変更できることを確認する", function() {
	ModulePattern.gender = "female"; // スコープが public なプロパティの値は、クラスの外部から直接アクセスできる
	strictEqual(ModulePattern.toString(), "hoge:31:female", "male が female になること");

});
