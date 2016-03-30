/**
 * Created by Anton.Filin on 30.03.2016.
 */
import { Entity } from 'draft-js';

export default function findEntities(entityType, contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === entityType
      );
    },
    callback
  );
}
