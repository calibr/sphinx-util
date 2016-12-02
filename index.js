exports.prepareQuery = function(query) {
  // replace OR operator by |
  query = query.replace(/\sOR\s/i, " | ");
  // replace special symbols by spaces
  query = query.replace(/\//g, " ");
  return query;
};

// very rough implementation of expand_keywords index param. use it only for excerpts building
exports.expandKeywords = function(query, searchablePrefixLength) {
  searchablePrefixLength = searchablePrefixLength || 3;
  // remove punctuation
  query = query.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/g, " ");
  var words = query.split(/\s+/).filter(word => word.length);
  var result = words.map(word => {
    if(word.length < searchablePrefixLength) {
      return word;
    }
    let expanded = "(" + word + " | " + word + "*)";
    return expanded;
  }).join(" ");
  return result;
};