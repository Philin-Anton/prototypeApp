/**
 * Created by Anton.Filin on 30.03.2016.
 */
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';

let { processHTML } = DraftPasteProcessor;

export default function(html) {
  return processHTML(html);
}
