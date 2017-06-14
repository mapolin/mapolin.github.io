import React from 'react';
import { shallow } from 'enzyme';
import Crawler from 'components\Crawler.js';

describe('<Crawler />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Crawler />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "crawler-component"', function () {
      expect(component.hasClass('crawler-component')).to.equal(true);
    });
  });
});
