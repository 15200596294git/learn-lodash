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
console.log("🚀 ~ map([4,8], square):", map([4, 8], square))

// map({a: 4, b: 8}, square)
// => [16,64]
console.log("🚀 ~ map({a: 4, b: 8}, square):", map({ a: 4, b: 8 }, square))


var users = [
  { user: 'barney' },
  { user: 'fred' }
]

// map(users, 'user')
// => ['barney', 'fred']
// console.log("🚀 ~ map(users, 'user'):", map(users, 'user'))

// map([], x=> x)

// console.log('🚀 ~ map([], x=> x):', map([], x=> x))
