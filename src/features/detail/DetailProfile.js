import React from 'react';

import './DetailProfile.scss';

const DetailProfile = props => {
  return (
    <section className="detail-profile">
      <h3 className="detail-profile__section-name">Profile</h3>
      <div>
        <h5 className="detail-profile__label">Name:</h5>
        <a
          className="detail-profile__value detail-profile__value--link"
          href="http://www.apple.com"
        >
          Alphabet Inc.
        </a>
      </div>
      <div>
        <h5 className="detail-profile__label">Sector:</h5>
        <p className="detail-profile__value">Technology Services</p>
      </div>
      <div>
        <h5 className="detail-profile__label">Industry:</h5>
        <p className="detail-profile__value">Internet Software/Services</p>
      </div>
      <div>
        <h5 className="detail-profile__label">Employees:</h5>
        <p className="detail-profile__value">118899</p>
      </div>
      <div>
        <h5 className="detail-profile__label">Country:</h5>
        <p className="detail-profile__value">US</p>
      </div>
      <p className="detail-profile__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illo
        numquam repellendus quam facilis provident animi laudantium voluptatibus
        asperiores est tenetur, odio ex vitae eum nulla delectus eius sunt
        itaque. Culpa neque magni facere fugit. Magnam ut, veritatis enim
        laudantium temporibus minima, amet veniam, sequi inventore ipsum aperiam
        reiciendis asperiores libero velit recusandae aliquam omnis saepe?
        Quisquam perspiciatis aspernatur beatae. Est molestiae nostrum sunt
        quos? Dignissimos fugit aut distinctio earum, nam labore ipsa eius.
      </p>
    </section>
  );
};

export default DetailProfile;
