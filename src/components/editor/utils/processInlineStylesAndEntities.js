/**
 * Created by Anton.Filin on 30.03.2016.
 */
import template from 'lodash/template';
import sortBy from 'lodash/sortBy';

export default function processInlineStylesAndEntities(inlineTagMap, entityTagMap, entityMap, block) {
  if (!block.inlineStyleRanges && !block.entityRanges) {
    //TODO: optimisation, exit early if length === 0 as well
    return block.text;
  }

  let html = block.text;
  let tagInsertMap = {};

  // escape chars
  let escapeReplacements = [ ['<', '&lt;'], ['&', '&amp;']];

  escapeReplacements.forEach((arr) =>{
    for(var i=0; i<html.length;i++) {
      if (html[i] === arr[0]) {
        if (!tagInsertMap[i]) {
          tagInsertMap[i] = [];
        }
        tagInsertMap[i].push([ arr[0].length, arr[1] ]);
      }
    }
  });

  // important to process in order, so sort
  let sortedInlineStyleRanges = sortBy(block.inlineStyleRanges, 'offset');

  // map all the tag insertions we're going to do
  sortedInlineStyleRanges.forEach(function(range) {
    let tag = inlineTagMap[range.style];

    if (!tagInsertMap[range.offset]) { tagInsertMap[range.offset] = []; }

    tagInsertMap[range.offset].push(tag[0]);
    if (tag[1]) {
      if (!tagInsertMap[range.offset+range.length] ) { tagInsertMap[range.offset+range.length] = []; }
      // add closing tags to start of array, otherwise tag nesting will be invalid
      tagInsertMap[ range.offset+range.length].unshift(tag[1]);
    }
  });

  let sortedEntityRanges = sortBy(block.entityRanges, 'offset');

  sortedEntityRanges.forEach(function(range) {
    let entity = entityMap[range.key];
    let tag = entityTagMap[entity.type];

    let compiledTag0 = template(tag[0])(entity.data);
    let compiledTag1 = template(tag[1])(entity.data);

    if (!tagInsertMap[range.offset]) { tagInsertMap[range.offset] = []; }
    tagInsertMap[range.offset].push(compiledTag0);

    if (tag[1]) {

      if (!tagInsertMap[range.offset+range.length] ) { tagInsertMap[range.offset+range.length] = []; }
      // add closing tags to start of array, otherwise tag nesting will be invalid
      tagInsertMap[ range.offset+range.length].unshift(compiledTag1);
    }
  });

  // sort on position, as we'll need to keep track of offset
  let orderedKeys = Object.keys(tagInsertMap).sort(function(a, b) {
    a = Number(a);
    b = Number(b);
    if (a > b) { return 1; }
    if (a < b) { return -1; }
    return 0;
  });

  // insert tags into string, keep track of offset caused by our text insertions
  let offset = 0;
  orderedKeys.forEach(function(pos) {
    let index = Number(pos);

    tagInsertMap[pos].forEach(function(tag) {

      if (typeof tag === 'string') {
        html = html.substr(0, offset+index) +
          tag +
          html.substr(offset+index);
        offset += tag.length;
      } else {
        let [ length, replacement] = tag;
        html = html.substr(0, offset+index) +
          replacement +
          html.substr(offset+index+length);
        offset += (replacement.length - length );
      }

    });
  });

  return html;
}
