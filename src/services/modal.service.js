// "Dependency Injection" but make it bootleg
export default class ModalService {

  static serviceInstance = null;

  modalRefs = {};

  constructor() {
    console.log('constructing modal service')
  }

  static getInstance() {
    if (ModalService.serviceInstance == null) {
      ModalService.serviceInstance = new ModalService();
    }

    return this.serviceInstance;
  }

  registerModal(modalName, toggleFunc){
    console.log('registering', modalName);
    this.modalRefs[modalName] = toggleFunc;
  }

  toggleModal(modalName, isOpen){
    this.modalRefs[modalName](isOpen);
  }
}
