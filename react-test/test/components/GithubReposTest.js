import React from 'react';
import { shallow } from 'enzyme';
import GithubRepos from 'components\GithubRepos.js';

describe('<GithubRepos />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<GithubRepos />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "githubrepos-component"', function () {
      expect(component.hasClass('githubrepos-component')).to.equal(true);
    });
  });
});
