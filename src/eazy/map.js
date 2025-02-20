// function baseEach(collection, iterateFn) {
//   if(Array.isArray(collection)) {
//     for(let i = 0; i <= collection.length - 1; i++) {
//       const v = collection[i]

//       iterateFn(v, i, collection)
//     }
//   } else {
//     for(let key in  collection) {
//       const v = collection[key]
//       iterateFn(v, key, collection)
//     }
//   }
// }

// function map(value, fnOrKey) {
//   const ret = []
//   baseEach(value, (v, k, collection)=> {
//     if(typeof fnOrKey === 'function') {
//       ret.push(fnOrKey(v,k,collection))
//     } else {
//       ret.push(v[fnOrKey])
//     }
//   })

//   return ret
// }

function arrayMap(array, iteratee) {
  const result = []
  const length = array == null ? 0 : array.length
  let i = -1
  while (++i < length) {
    result[i] = iteratee(array[i], i, array)
  }

  return result
}

// arrayMap(null, (i)=> console.log(i))

function baseMap(collection, iteratee) {
  const ret = []
  baseEach(collection, (value, key, collection) => {
    ret.push(iteratee(value, key, collection))
  })

  return ret
}

function baseEach() { }

// 接收fromRight参数，是否从右边开始遍历
// 返回一个函数，这个函数接收一个对象，一个迭代函数，一个获取keys的函数

function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    let i = -1
    const props = keysFunc(object)
    const iterable = Object(object)
    let length = props.length

    while(length--) {
      const key = props[fromRight ? length : ++i]
      if(iteratee(iterable[key], key, object) === false) {
        break
      }
    }

    return object
  }
}


const baseFor = createBaseFor()
// baseFor({a: 1, b: 2, c: 3}, (v)=> console.log(v), Object.keys)
// baseFor(null, (v)=> console.log(v), Object.keys)
// baseFor(undefined, (v)=> console.log(v), Object.keys)
// baseFor('1abcd', (v) => console.log(v), Object.keys)

// 接收两个参数，一个对象，一个迭代函数
// 返回
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys)
}

// 接收两个参数
// 一个是迭代参数
// 一个是是否从右边开始

// 返回一个函数，这个函数接收两个参数
// 如果第一个参数为null，提前返回
// 如果第一个参数不是类数组，那么直接调用eachFunc
// 否则，对类数组进行遍历处理
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if(collection == null) return collection

    if(!isArrayLike(collection)) {
      return eachFunc(collection, iteratee)
    }

    const iterable = Object(collection)
    let length = collection.length
    let index = -1

    while(length--) {
      const key = fromRight ? length : ++index
      if(iterable(iterable[key], key , collection)) {
        break
      }
      
    }

    return collection
  }
}

var baseEach = createBaseEach(baseForOwn)

// lodash
// function map(collection, iteratee) {
//   const func = isArray(collection) ? arrayMap : baseMap;
//   return func(collection, getIteratee(iteratee, 3));
// }

// map
//   arrayMap
//   baseMap
//     baseEach
//       createBaseEach 
//         baseForOwn
//           baseFor
//             createBaseFor


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

