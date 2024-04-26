import RESTSerializer from '@ember-data/serializer/rest';

export default class ApplicationSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    if (Array.isArray(payload)) {
      return payload.reduce(
        function (documentHash, item) {
          let { data } = store.normalize(primaryModelClass.modelName, item);
  
          documentHash.data.push(data);
  
          return documentHash;
        },
        { data: [] },
      );

    }

    return store.normalize(primaryModelClass.modelName, payload);
    
  }

  serializeIntoHash(hash, typeClass, snapshot, options) {
    Object.assign(hash, this.serialize(snapshot, options));
  }
}
