import RESTSerializer from '@ember-data/serializer/rest';
import { decamelize } from 'botdistrikt-orders/utils/camelize';

export default class ApplicationSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (
      Array.from(['findRecord', 'findBelongsTo', 'createRecord']).includes(
        requestType,
      )
    ) {
      return store.normalize(primaryModelClass.modelName, payload);
    }

    return payload.reduce(
      (payload, value) => {
        payload.data.push(
          store.normalize(primaryModelClass.modelName, value).data,
        );

        return payload;
      },
      { data: [] },
    );
  }

  normalize(typeClass, hash) {
    hash.links = {};

    typeClass.eachRelationship((relationship) => {
      hash.links[relationship] = decamelize(relationship);
    });

    return super.normalize(typeClass, hash);
  }

  serializeIntoHash(hash, typeClass, snapshot, options) {
    Object.assign(hash, this.serialize(snapshot, options));
  }
}
