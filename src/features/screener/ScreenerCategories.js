import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { fetchCategories } from './screenerCategoriesSlice';
import './ScreenerCategories.scss';

const ScreenerCategories = ({ topList }) => {
  const { '*': currentCategory } = useParams();
  const dispatch = useDispatch();

  const { categories, error, isFetching } = useSelector(
    (state) => state.screenerCategories
  );

  useEffect(() => {
    !categories.length && dispatch(fetchCategories());
  }, [categories.length, dispatch]);

  if (error) {
    return (
      <nav className="categories-box">
        <ul className="categories categories--full-width">
          <ErrorBox message={error} />
        </ul>
      </nav>
    );
  }

  if (isFetching) {
    return (
      <nav className="categories-box">
        <ul className="categories">
          <li className="category category--loading">
            <LoadingBox size="small" />
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="categories-box">
      <ul className="categories">
        {categories.length > 0 && [
          topList.map((item) => (
            <LinkTemplate
              key={item}
              destinationUrl={item}
              name={item}
              currentCategory={currentCategory}
            />
          )),
          categories.map((category) => (
            <LinkTemplate
              key={category}
              destinationUrl={category}
              name={category}
              currentCategory={currentCategory}
            />
          )),
        ]}
      </ul>
    </nav>
  );
};

ScreenerCategories.propTypes = {
  topList: PropTypes.object,
};

const LinkTemplate = ({ destinationUrl, name, currentCategory }) => {
  const isActive = destinationUrl === currentCategory;
  return (
    <li
      className={classNames('category', {
        'category--active': isActive,
      })}
      data-testid={isActive ? `category-${name}--selected` : ''}
    >
      <Link
        className="category__link heading-secondary"
        to={`${destinationUrl}`}
      >
        {name}
      </Link>
    </li>
  );
};

LinkTemplate.propTypes = {
  destinationUrl: PropTypes.string,
  name: PropTypes.string,
  currentCategory: PropTypes.string,
};

export default ScreenerCategories;
