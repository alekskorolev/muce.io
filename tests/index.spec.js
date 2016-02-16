import {
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
    });
});
