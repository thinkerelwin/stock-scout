import React, { useEffect } from 'react';
import { useLocation, Link, matchRoutes, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import LoadingBox from '../../components/LoadingBox';
import ErrorBox from '../../components/ErrorBox';

import { fetchCategories } from './screenerCategoriesSlice';
import './ScreenerCategories.scss';

const ScreenerCategories = ({ topList }) => {
  const { '*': currentCategory } = useParams();
  const dispatch = useDispatch();

  const { categories, error, isFetching } = useSelector(
    state => state.screenerCategories
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
          topList.map(item => (
            <LinkTemplate
              key={item}
              destinationUrl={item}
              name={item}
              currentCategory={currentCategory}
            />
          )),
          categories.map(category => (
            <LinkTemplate
              key={category}
              destinationUrl={category}
              name={category}
              currentCategory={currentCategory}
            />
          ))
        ]}
      </ul>
    </nav>
  );
};

const LinkTemplate = ({ destinationUrl, name, currentCategory }) => {
  return (
    <li
      className={classNames('category', {
        'category--active': destinationUrl === currentCategory
      })}
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

export default ScreenerCategories;
