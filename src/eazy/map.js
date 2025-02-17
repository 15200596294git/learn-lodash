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
  while(++i < length) {
    result[i] = iteratee(array[i], i, array)
  }

  return result
}

// arrayMap(null, (i)=> console.log(i))

function baseMap(collection, iteratee) {
  const ret = []
  baseEach(collection, (value, key, collection)=> {
    ret.push(iteratee(value, key, collection))
  })

  return ret
}

// lodash
// function map(collection, iteratee) {
//   const func = isArray(collection) ? arrayMap : baseMap;
//   return func(collection, getIteratee(iteratee, 3));
// }


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

