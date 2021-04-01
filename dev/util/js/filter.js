const {filter} = require('fuzzaldrin');
/**
 * Do a fuzzy search
 * @param {Array} list array of objects which is the input needs to be filtered
 * @param {String} key property in list object, which has to searched
 * @param {String} search This is a search string, which has to be found
 */
export const filterByKeyName=(list,key,search)=>{
    return filter(list,search,{key})
}

/**
 * Do a fuzzy search
 * @param {Array} list array of objects which is the input needs to be filtered
 * @param {String} key property in list object, which has to searched
 * @param {String} search This is a search string, which has to be found
 */
export const filterByKeyArray=(list,key,search)=>{
    return list.filter(item=>filter(item[key],search).length>0)
}