import React, { Component } from 'react';
import ProductItem from '../ProductItem';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class ProductList extends Component {
  state = {
    inPhoneName: '',
    filterPhone: 'newest',
  };

  componentDidMount() {
    this.props.dispatch(actions.getPhoneList());
  }

  replacefilterPhome = e => {
    this.setState({ filterPhone: e.target.value });
  };

  filterItems = (check1, check2) => {
    let filterState = this.state.filterPhone;
    return filterState === 'alphabetical'
      ? (check1.name > check2.name) - (check1.name < check2.name)
      : check1.age - check2.age;
  };

  render() {
    const { phones } = this.props;
    const filteredTitles = phoneList =>
      phoneList.name
        .toLowerCase()
        .includes(this.state.inPhoneName.toLowerCase()) ||
      phoneList.snippet
        .toLowerCase()
        .includes(this.state.inPhoneName.toLowerCase());

    return (
      <div className="wrap">
        <div className="leftCol">
          <section>
            <p>
              Search:
              <input
                type="text"
                onChange={e => this.setState({ inPhoneName: e.target.value })}
                value={this.state.inPhoneName}
                name="search"
              />
            </p>
            <p>
              Sort by:
              <select
                className="selector"
                value={this.state.filterPhone}
                onChange={this.replacefilterPhome}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </p>
          </section>
        </div>
        <div className="rightCol">
          <ul>
            {phones
              .sort(this.filterItems)
              .filter(filteredTitles)
              .map(phoneList => (
                <ProductItem
                  imageUrl={phoneList.imageUrl}
                  name={phoneList.name}
                  snippet={phoneList.snippet}
                  id={phoneList.id}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  phones: state.phones,
});

export default connect(mapStateToProps)(ProductList);
