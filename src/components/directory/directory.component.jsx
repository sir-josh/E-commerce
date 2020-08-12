import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const directory = ({ sections }) => (
    <div className="directory-menu">
        {
            sections.map(({ id, imageUrl, ...otherSectionProps }) => (
                <MenuItem key={id} imageLink={imageUrl} {...otherSectionProps} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(directory);