import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// class LocalStorage {
//   constructor() {
//     this.store = {};
//   }

//   getItem = key => {
//     return this.store[key];
//   };

//   setItem = (key, element) => {
//     return (this.store[key] = element);
//   };

//   clear() {
//     this.store = {};
//   }
// }

// global.localStorage = new LocalStorage();
