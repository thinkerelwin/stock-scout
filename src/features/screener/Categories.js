import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { fetchCategories } from './CategoriesSlice';
import './Categories.scss';

const LinkTemplate = ({
  routeUrl,
  destinationUrl,
  handleClick,
  name,
  currentTab
}) => {
  return (
    <li
      className={classNames('category', {
        'category--active': currentTab === destinationUrl
      })}
      onClick={() => handleClick(destinationUrl)}
    >
      <Link
        className="category__link heading-secondary"
        to={`${routeUrl}/${destinationUrl}`}
      >
        {name}
      </Link>
    </li>
  );
};

const Categories = ({ topList, currentTab, setCurrentTab }) => {
  let { url } = useRouteMatch();
  const dispatch = useDispatch();

  const { categories, error, isFetching } = useSelector(
    state => state.categories
  );

  useEffect(() => {
    !categories.length && dispatch(fetchCategories());
  }, [categories.length, dispatch]);

  return (
    <nav className="categories-box">
      <ul className="categories">
        {error && (
          <LinkTemplate
            key={error}
            routeUrl={url}
            destinationUrl={''}
            handleClick={() => {}}
            name={error}
            currentTab={currentTab}
          />
        )}

        {isFetching ? (
          <li className="category">
            <p className="category__link heading-secondary">...loading</p>
          </li>
        ) : (
          categories.length > 0 && [
            topList.map(item => (
              <LinkTemplate
                key={item.url}
                routeUrl={url}
                destinationUrl={item.url}
                handleClick={setCurrentTab}
                name={item.name}
                currentTab={currentTab}
              />
            )),
            categories.map(category => (
              <LinkTemplate
                key={category}
                routeUrl={url}
                destinationUrl={category}
                handleClick={setCurrentTab}
                name={category}
                currentTab={currentTab}
              />
            ))
          ]
        )}
      </ul>
    </nav>
  );
};

export default Categories;
