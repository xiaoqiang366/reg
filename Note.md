
> 正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript中，正则表达式也是对象([RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp))。

关于正则个人的感觉是又爱又恨，像个小精灵。有些时候使用做一些校验确实方便很多，但是正则的书写规范中个总会遇到了一些坑。有些看似没有问题的正则，其实还是有很多问题的，今天就好好把正则给整理一遍，免得以后又把一些标识符给弄混了。同时也在弄了个[在线正则可视化的工具](https://aoxiaoqiang.github.io/reg/)方便问题排查和在线字符串的校验。

## 正则对象RegExp

### 对象创建

创建一个正则对象有三种方式:

```javascript
// 1.字面量方式: /pattern/flags
var reg1 = /pattern/gim;

// 2.构造函数方式: new RegExp(pattern [, flags])
let reg2_1 = new RegExp(/^[a-zA-Z]+[0-9]*\W?_$/, 'gi');
let reg2_2 = new RegExp('^[a-zA-Z]+[0-9]*\\W?_$', 'gi'); // 注意这里的转义\\

// 3. 对象标识符方式: RegExp(pattern [, flags])
var reg3 = RegExp('^[a-zA-Z]+[0-9]*\\W?_$', 'gim');
```

注意: 使用后两种方式的时候如果pattern为字符串，字符串中的`\`是需要转义的!!!。

### 特殊字符

正则里的特殊字符主要有下面几类。 这里简单整理的一下，一些需要注意的后面有备注，简单的一些直接列出来了的。

+ 字符类别（Character Classes）

      - 常用字符 `\`, `.`, `\d`, `\D`, `\w`, `\W`, `\s`, `\S`, `\b`, `\B`
      - 其他 `\t`, `\r`, `\n`, `\v`, `\f`, `[\b]`, `\0`, `\cX`, `\xhh`, `\uhhhh`

+ 字符集合（Character Sets）

      - `[xyz]`
      - `[^xyz]`
      - 注意： 分组里面的`|`、`?`、`$`、`.`等会变为普通字符

+ 边界（Boundaries）

      - `^`
      - `$`
      - `\b`
      - `\B`

+ 分组（grouping）与反向引用（back references）

      - `(x)` 匹配 x 并且捕获匹配项, 称为捕获括号
      - `\n` n 是一个正整数。一个反向引用（back reference），指向正则表达式中第 n 个括号（从左开始数）中匹配的子字符串。
      - `(?:x)` 匹配 x 不会捕获匹配项, 称为非捕获括号

+ 数量词（Quantifiers）

      - `*` 匹配前面的模式 0 或多次。
      - `+` 匹配前面的模式 1 或多次, 等价于 {1,}。
      - `?` 匹配前面的模式 0 或1次; 注意如果在数量词 *、+、? 或 {}, 任意一个后面紧跟该符号（?），会使数量词变为非贪婪（ non-greedy） ，即匹配次数最小化。反之，默认情况下，是贪婪的（greedy），即匹配次数最大化。
      - `*?` 匹配前面的模式 0 或多次, 然而匹配是最小可能匹配。
      - `+?` 匹配前面的模式 1 或多次, 然而匹配是最小可能匹配。
      - `|` 或匹配。
      - `{n}` n 是一个正整数。前面的模式连续出现 n 次时匹配。
      - `{n,}` n 是一个正整数。前面的模式连续出现至少 n 次时匹配。
      - `{n,m}` n 和 m 为正整数。前面的模式连续出现至少 n 次，至多 m 次时匹配。

+ 断言（Assertions）

      - `x(?=y)` 仅匹配被y跟随的x。
      - `x(?!y)` 仅匹配不被y跟随的x。

## 正则的相关常用属性和方法

### 常用属性

```javascript
RegExp.prototype.source
RegExp.prototype.global
RegExp.prototype.ignoreCase
RegExp.prototype.multiline
RegExp.prototype.sticky
RegExp.prototype.unicode
```

## 常用方法

```javascript
// 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null
regexp.exec(string);

// 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。
regexp.test(string);
```

## 字符串常用的有关正则的方法

```javascript
// 检索匹配项, 如果字符串匹配到了表达式，会返回一个数组，数组的第一项是进行匹配完整的字符串，之后的项是用圆括号捕获的结果。如果没有匹配到，返回null
str.match(regexp);

// 使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。返回源字符串以分隔符出现位置分隔而成的一个 Array
str.split([separator[, limit]]);

// 返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式, 替换值可以是一个字符串或者一个每次匹配都要调用的函数。
//
str.replace(regexp|substr, newSubStr|fn);

// 执行正则表达式和 String对象之间的一个搜索匹配。如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引。否则，返回 -1
str.search(regexp);
```

`replace`方法中，替换字符串可以插入下面的特殊变量名

![image.png](https://upload-images.jianshu.io/upload_images/8532055-f95643b544667087.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

例如下面的例子中的 $1 可以匹配到第一个分组, 通过替换后可以取到值12.

```javascript
var str = 'abc=12'
var val = str.replace(/^\w+=(\d+)/, '$1');
console.log(val); // 12
```

补充内容

+ 将用户输入转义为正则表达式中的一个字面字符串, 可以通过简单的替换来实现：

    ```javascript
    function escapeRegExp(string) {
        return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$&");
        //$&表示整个被匹配的字符串
    }
    ```
+ 匹配正则的正则

    ```javascript
    var regStr1 = /^\/([\W\w]+)\/((?:([gim])(?!\3))(?:([gim])(?!(?:\3|\4)))?)?(?:[gim])?$/;
    var regStr2 = /^\/[\s\S]+\/(?=[gmi]{0,3}$)(?:(.)(?!\1)(?:(.)(?!\1|\2).?)?)?$/;
    ```