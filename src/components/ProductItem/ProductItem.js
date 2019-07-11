import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductItem.css';
import { Link } from 'react-router-dom';
import { addToCart } from './../../redux/actions';

class ProductItem extends Component {
  handleClick = id => {
    this.props.addToCart(id);
  };

  render() {
    const { imageUrl, name, snippet, id } = this.props;
    //show list id
    //console.log(id);
    return (
      <li className="phone-list">
        <Link to={`/${id}`}>
          <img
            className="picphone"
            src={`https://raw.githubusercontent.com/mate-academy/phone-catalogue-static/master/${imageUrl}`}
            alt=" "
          />
        </Link>
        <div className="phone-text">
          <Link to={`/${id}`}>
            <p>{name} </p>
          </Link>
          <p className="description">{snippet}</p>
          <span
            to="/"
            onClick={() => {
              this.handleClick(id);
            }}
          >
            <button className="button">Add to cart</button>
          </span>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);
