
const MAX_SAFE_INTEGER = 9007199254740991

function isLength(value) {
  return typeof value === 'number' && value > -1 && value < MAX_SAFE_INTEGER && value % 1 === 0
}

function isFunction(value) {
  return typeof value === 'function'
}

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value)
}

function isArray(value) {
  return Array.isArray(value)
}

// 遍历数组、类数组
// 
function baseForObject(object, iteratee) {
  let i = -1
  const iterable = Object(object)
  const props = Object.keys(object)
  let length = props.length

  while(length--) {
    if(iteratee(iterable[props[++i]], i, iterable) === false) {
      break
    }
  }

  return object
}
function baseForArray(arrayOrLike, iteratee) {
  let i = -1
  const iterable = Object(arrayOrLike)
  let length = arrayOrLike.length

  while(length--) {
    if(iteratee(iterable[++i], i, iterable)) {
      break
    }
  }

  return arrayOrLike
}

function baseEach(collection, iteratee) {
  if(collection == null) return collection

  const func = (isArray(collection) || isArrayLike(collection)) ? baseForArray : baseForObject

  return func(collection, iteratee)
}

function baseMap(collection, iteratee) {
  const result = []
  baseEach(collection, (value, index, collection)=> {
    result.push(iteratee(value, index, collection))
  })

  return result
}

function map(collection, iteratee) {
  return baseMap(collection, iteratee)
}


function baseFilter(collection, iteratee) {
  const result = []
  baseEach(collection, (value, index, collection)=> {
    if(iteratee(value,index,collection)) {
      
      result.push(value)
    }
  })

  return result
}

function filter(collection, iteratee) {
  return baseFilter(collection, iteratee)
}


// map([1,2,3],(v)=> { return v * v})
// console.log("🚀 ~ map([1,2,3],(v)=> { return v * v}):", map([1,2,3],(v)=> { return v * 2}))
// map(1, ()=>{})
// console.log("🚀 ~ map(1, ()=>{}):", map(null, (v)=>{ console.log(v)}))

// map的映射功能
// 数组的遍历功能
// 对象的遍历功能(对象、类数组对象)

// filter([1,2,3], (v)=> v > 1)
// console.log("🚀 ~ filter([1,2,3], (v)=> v > 1):", filter({length:2, 0:1,1:2}, (v)=> v >= 1))
