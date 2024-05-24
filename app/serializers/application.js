import RESTSerializer from '@ember-data/serializer/rest';
import { dasherize } from '@ember/string';

export default class ApplicationSerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const links = Array.from(primaryModelClass.relationshipNames.belongsTo)
      .concat(primaryModelClass.relationshipNames.hasMany)
      .reduce((links, relationshipName) => {
        links[relationshipName] = dasherize(relationshipName);

        return links;
      }, {});

    if (
      Array.from(['findRecord', 'findBelongsTo', 'createRecord']).includes(
        requestType,
      )
    ) {
      payload.links = links;

      return store.normalize(primaryModelClass.modelName, payload);
    }

    return payload.reduce(
      (payload, value) => {
        value.links = links;
        value = store.normalize(primaryModelClass.modelName, value);

        payload.data.push(value.data);

        return payload;
      },
      { data: [] },
    );
  }

  serializeIntoHash(hash, typeClass, snapshot, options) {
    Object.assign(hash, this.serialize(snapshot, options));
  }
}
