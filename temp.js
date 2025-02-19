// createBaseEach函数学习

function arrayMap() {

}

function isArrayLike() {}


function createBaseEach() {}
function baseForOwn() {}
function baseFor() {}
function createBaseFor() {}

function baseEach() {}

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

  func(collection, iteratee)
}