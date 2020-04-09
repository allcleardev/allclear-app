// "Dependency Injection" but make it bootleg
export default class ModalService {

  static serviceInstance = null;

  modalRefs = {};

  // constructor() {}

  static getInstance() {
    if (ModalService.serviceInstance == null) {
      ModalService.serviceInstance = new ModalService();
    }

    return this.serviceInstance;
  }

  registerModal(modalName, toggleFunc){
    this.modalRefs[modalName] = toggleFunc;
  }

  toggleModal(modalName, isOpen){
    this.modalRefs[modalName](isOpen);
  }
}
