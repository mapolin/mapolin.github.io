import React from 'react';
import { shallow } from 'enzyme';
import Header from 'components\header\Header.js';

describe('<Header />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Header />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "header-component"', function () {
      expect(component.hasClass('header-component')).to.equal(true);
    });
  });
});
