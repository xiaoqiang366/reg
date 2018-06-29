var preTestWords = document.getElementById('preTestWords')
var preTestReg = document.getElementById('preTestReg');
var btnRegTest = document.getElementById('btnRegTest');
var resultTestWords = document.getElementById('resultTestWords');

// ig
var chMutiple = document.getElementById('chMutiple');
var chIgnore = document.getElementById('chIgnore');

// 重置正则标识符
preTestReg.addEventListener('focus', function (event) {
  event.preventDefault();
  chMutiple.checked = false;
  chIgnore.checked = false;
  resultTestWords.innerText = '';
})


// 确认开始匹配
btnRegTest.addEventListener('click', function (event) {
  event.preventDefault();
  var regStr = preTestReg.value.trim(); // 正则
  var testWdStr = preTestWords.value; // 待匹配字符
  // 验证正则的正则
  var regCheckReg = /^\/([\W\w]+)\/((?:([gim])(?!\3))(?:([gim])(?!(?:\3|\4)))?)?(?:[gim])?$/;
  // var regCheckReg = /^\/[\s\S]+\/(?=[gmi]{0,3}$)(?:(.)(?!\1)(?:(.)(?!\1|\2).?)?)?$/;

  // 待检测字符非空验证
  if (!testWdStr) {
    alert('请输入待测试的字符!');
    preTestReg.focus();
    return;
  }

  // 正则格式验证
  if (!regStr || !regCheckReg.test(regStr)) {
    alert('请输入正确的JavaScript正则表达式!');
    preTestReg.focus();
    return;
  }

  // 正则基础格式正确 -> 正则参数截取
  var regParms = regStr.replace(regCheckReg, '$1, $2').split(', ');
  var regFlags = regParms[1];   // 正则标识符
  if (regFlags.indexOf('g') >= 0) {
    chMutiple.checked = true;
  } else if (chMutiple.checked) {
    regFlags += 'g';
  }

  if (regFlags.indexOf('i') >= 0) {
    chIgnore.checked = true;
  } else if (chIgnore.checked) {
    regFlags += 'i';
  }

  try {
    // 开始检测匹配
    var regExpObj = new RegExp(regParms[0], regFlags);
    var testResult = testWdStr.match(regExpObj);
    console.log(new Date().toTimeString() + '匹配结果: ');
    console.log(testResult);
    var resultStr = ''
    resultTestWords.style.color = '#000';
    if (testResult === null) {
      resultStr = 'null';
      resultTestWords.style.color = '#cecccc';
    } else {
      if (testResult.index === 0) {
        resultStr = testResult[0];
      } else {
        for (var index = 0; index < testResult.length; index++) {
          resultStr += testResult[index] + (index === (testResult.length - 1) ? '' : '\n');
        }
      }
    }
    resultTestWords.innerText = resultStr;
  } catch (error) {
    console.log(error);
  }
})

/**
  'xy'.match(/x(?=y)/) 正向先行断言
  'yx'.match(/(?<=y)x/) 正向后行断言

  'xy'.match(/x(?!y)/) 负向先行断言
  'yx'.match(/(?<!y)x/) 负向后行断言

 */