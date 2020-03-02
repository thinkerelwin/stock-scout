import React from 'react';
import PropTypes from 'prop-types';

import './DetailProfile.scss';

const DetailProfile = ({
  profile: {
    website,
    companyName,
    sector,
    industry,
    employees,
    country,
    description
  }
}) => {
  return (
    <section className="detail-profile">
      <h3 className="detail-profile__section-name">Profile</h3>
      <div>
        <h5 className="detail-profile__label">Name:</h5>
        <a
          className="detail-profile__value detail-profile__value--link"
          href={website}
        >
          {companyName}
        </a>
      </div>
      <div>
        <h5 className="detail-profile__label">Sector:</h5>
        <p className="detail-profile__value">{sector}</p>
      </div>
      <div>
        <h5 className="detail-profile__label">Industry:</h5>
        <p className="detail-profile__value">{industry}</p>
      </div>
      <div>
        <h5 className="detail-profile__label">Employees:</h5>
        <p className="detail-profile__value">{employees}</p>
      </div>
      <div>
        <h5 className="detail-profile__label">Country:</h5>
        <p className="detail-profile__value">{country}</p>
      </div>
      <p className="detail-profile__description">{description}</p>
    </section>
  );
};

DetailProfile.defaultProps = {
  profile: {
    companyName: '',
    website: '',
    sector: '',
    industry: '',
    employees: 0,
    country: '',
    description: ''
  }
};

DetailProfile.propTypes = {
  profile: PropTypes.shape({
    website: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
    industry: PropTypes.string.isRequired,
    employees: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

export default DetailProfile;
