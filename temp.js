// createBaseEach函数学习
const MAX_SAFE_INTEGER = 9007199254740991

function arrayMap(array, iteratee) {
  const result = []
  const length = array == null ? 0 : array.length
  let i = -1
  while (++i < length) {
    result[i] = iteratee(array[i], i, array)
  }

  return result
}

// typeof判断
// 大于-1 < 最大安全数
// 整数
function isLength(value) {
  return typeof value === 'number' && value > -1 && value < MAX_SAFE_INTEGER && value % 1 === 0
}

function isFunction(value) {
  return typeof value === 'function'
}

// 排除null和undefined
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value)
}

// 遍历对象的(并且除了类数组)
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    let index = -1
    const props = keysFunc(object)
    const iterable = Object(object)
    let length = props.length

    while(length--) {
      const key = props[fromRight ? length : ++index]
      if(iteratee(iterable[key], key, iterable) === false) {
        break
      }
    }

    return object
  }
}

var  baseFor = createBaseFor()

const keys = Object.keys

function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if(collection == null) return collection

    if(!isArrayLike(collection)) {
      return eachFunc(collection, iteratee)
    }

    let length = collection.length
    let index = fromRight ? length : -1
    const iterable = Object(collection)

    while(fromRight ? index-- : (++index < length)) {
      if(iteratee(iterable[index], index, iterable) === false)  {
        break
      }
    }

    return collection
  }
}

// 我理解的baseForOwn就是用来遍历非类数组的对象
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys)
}

var baseEach = createBaseEach(baseForOwn)

function baseMap(collection, iteratee) {
  let index = -1
  const result = isArrayLike(collection) ? Array(collection.length) : []

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection)
  })
  

  return result
}


function getIteratee() {
  // lodash.iteratee是用户自定义的，可以看作是全局的一个配置
  // 那就是获取迭代器，如果用户配置了优先获取用户配置的，否则获取默认的
  var result = lodash.iteratee || iteratee;
  // 如果使用的是默认配置，那么就赋值为baseIterate
  // 否则使用用户的配置
  result = result === iteratee ? baseIteratee : result;
  // 如果传入了参数就进行调用，否则之间返回迭代器函数而不调用
  return arguments.length ? result(arguments[0], arguments[1]) : result;
}

// 简化版
// function getIteratee() {
//   // 这样会出现一个问题就是，当lodash.iteratee === iteratee时，使用的时iteratee而不是baseIteratee,和原有的代码所要表示的功能会不一样
//   var result = lodash.iteratee || baseIteratee;
//   return arguments.length ? result(arguments[0], arguments[1]) : result;
// }

// 
function map(collection, iteratee) {
  const func = Array.isArray(collection) ? arrayMap : baseMap

  return func(collection, iteratee)
}

function square(n) {
  return n * n
}

// map([4,8], square)
// => [16,64]
// console.log("🚀 ~ map([4,8], square):", map([4, 8], square))

// map({a: 4, b: 8}, square)
// => [16,64]
// console.log("🚀 ~ map({a: 4, b: 8}, square):", map({ a: 4, b: 8 }, square))


var users = [
  { user: 'barney' },
  { user: 'fred' }
]

// map(users, 'user')
// => ['barney', 'fred']
// console.log("🚀 ~ map(users, 'user'):", map(users, 'user'))

// map([], x=> x)

// console.log('🚀 ~ map([], x=> x):', map([], x=> x))










// filter
function arrayFilter(array, predicate) {
  let index = -1
  const result = []
  const iterable = Object(array)
  let length = array == null ? 0 : array.length

  while(++index < length) {
    const value = iterable[index]
    if(predicate(value, index, array)) {
      result.push(value)
    }
  }

  return result
}

function baseFilter(collection, predicate) {
  const result = []

  baseEach(collection, (value, key, collection)=> {
    if(predicate(value,key,collection)) {
      result.push(value)
    }
  })

  return result
}

function filter(collection, predicate) {
  const func = Array.isArray(collection) ? arrayFilter : baseFilter

  return func(collection, predicate)
}

var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

const person = {
  a:1,
  b:2,
  c:3,
  d: 1
}
 
// filter(users, function(o) { return !o.active;  })
// console.log("🚀 ~ filter(users, function(o) { return !o.active; });:", filter(users, function(o) { return !o.active; }))
// => objects for ['fred']

filter(person, function filterFunc(v){ return v === 1 } )
// console.log("🚀 ~ filter(person, (v)=> v === 1 ):", filter(person, (v)=> v === 1 ))
 
// The `_.matches` iteratee shorthand.
// filter(users, { 'age': 36, 'active': true });
// console.log("🚀 ~ filter(users, { 'age': 36, 'active': true });:", filter(users, { 'age': 36, 'active': true }))
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
// filter(users, ['active', false]);
// console.log("🚀 ~ filter(users, ['active', false]);:", filter(users, ['active', false]))
// => objects for ['fred']
 
// The `_.property` iteratee shorthand.
// filter(users, 'active');
// console.log("🚀 ~ filter(users, 'active');:", filter(users, 'active'))
// => objects for ['barney']


// 遍历
// createBaseEach
//   // 如果不是类数组，就用baseForOwn遍历
//   baseForOwn 
//   // 否则，使用while遍历
//   customWhile
  