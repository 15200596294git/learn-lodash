function map(value, iterateFn) {
  const ret = []

  if(Array.isArray(value)) {
    for(let i = 0; i <= value.length - 1; i++) {
      const v = value[i]

      if(typeof iterateFn === 'function') {
        ret.push(iterateFn(v, i, value)) 
      } else {
        ret.push(v[iterateFn])
      }

    }
  } else {
    for(let key in  value) {
      const v = value[key]

      if(typeof iterateFn === 'function') {
        ret.push(iterateFn(v, key, value))
      } else {
        ret.push(v[iterateFn])
      }
    }
  }

  return ret

  // return Object.entries(value)
  //   .map(([k, v]) => {
  //     if(typeof iterateFn === 'function') {
  //       return iterateFn(v, k, value)
  //     }

  //     return v[iterateFn]
  //   })
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
console.log("🚀 ~ map(users, 'user'):", map(users, 'user'))
