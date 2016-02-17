import {
    _,
    $,
    BaseCollection,
    BaseComponent,
    BaseModel,
    BaseView,
    BaseRouter,
    BaseSimpleComponent,
    Storage,
    startHistory
} from '../index';

import {expect} from 'chai';

describe('Main script import and build', () => {
    it('should be have imported libs', () => {
        expect(BaseCollection).to.be.a('function');
        expect(BaseComponent).to.be.a('function');
        expect(BaseModel).to.be.a('function');
        expect(BaseView).to.be.a('function');
        expect(BaseRouter).to.be.a('function');
        expect(BaseSimpleComponent).to.be.a('function');
        expect(Storage).to.be.a('function');
        expect(startHistory).to.be.a('function');
        expect(_.extract).to.be.a('function');
        expect(_.mixed).to.be.a('function');
    });
});
