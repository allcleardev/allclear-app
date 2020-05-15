export default class MetadataService {
  static serviceInstance = null;

  static getInstance() {
    if (MetadataService.serviceInstance == null) {
      MetadataService.serviceInstance = new MetadataService();
    }

    return this.serviceInstance;
  }

}
