import React, { Component } from 'react';
import './ProductView.css';

// https://raw.githubusercontent.com/mate-academy/fs_on_dec18/master/phones/phones.json
// https://raw.githubusercontent.com/mate-academy/phone-catalogue-static/master/api/phones.json

const baseUrl =
  'https://raw.githubusercontent.com/mate-academy/phone-catalogue-static/master/api/phones';
const imagesUrl =
  'https://raw.githubusercontent.com/mate-academy/phone-catalogue-static/master/';

const titles = {
  additionalFeatures: 'Additional Features',
  android: 'Android',
  availability: 'Availability and Networks',
  battery: 'Battery',
  camera: 'Camera',
  connectivity: 'Connectivity',
  display: 'Display',
  hardware: 'Hardware',
  sizeAndWeight: 'Size and Weight',
  storage: 'Storage and Memory',
};

const keysToSkip = ['id', 'images', 'name', 'description'];

class Product extends Component {
  state = {
    data: null,
    error: '',
    mainImg: '',
  };
  componentDidMount() {
    const productId = this.props.match.params.product;
    const dataUrl = `${baseUrl}/${productId}.json`;

    fetch(dataUrl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to load data');
        }
        return response.json();
      })
      .then(dataJson => {
        console.log('datdJ:', dataJson);
        this.setState({ data: dataJson });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  renderFeatureData(key, data) {
    let contents = null;

    if (keysToSkip.includes(key)) {
      return null;
    }

    if (typeof data === 'string' || typeof data === 'number') {
      contents = data;
    } else if (Array.isArray(data)) {
      contents = data.join(', ');
    } else if (typeof data === 'object' && data) {
      contents = Object.keys(data).map(subKey =>
        this.renderFeatureData(subKey, data[subKey])
      );
    } else if (typeof data === 'boolean') {
      contents = data ? '✓' : '✘';
    }

    return !key ? (
      contents
    ) : (
      <div key={key} className="feature-data">
        <h3 className="info-header">{titles[key] || key}</h3>
        <div classNmae="info-text">{contents}</div>
      </div>
    );
  }

  changeImg = img => {
    this.setState({
      mainImg: img,
    });
  };

  render() {
    const { data, error, mainImg } = this.state;
    console.log(data);
    if (!data) {
      return <div>Loading of data...</div>;
    }

    const productImages = data.images.map(item => imagesUrl + item);
    return (
      <div>
        <div className="header-and-pic">
          <img
            className="big-img"
            src={mainImg === '' ? productImages[0] : mainImg}
            alt={this.state.data.name}
          />
          <div>
            <h1 className="top-title">{this.state.data.name}</h1>
            <p>{this.state.data.description}</p>
            <div className="">
              {productImages.map(images => (
                <img
                  key={images}
                  className="mini-img"
                  src={images}
                  alt={this.state.data.name}
                  onClick={() => this.changeImg(images)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="main-description">
          {this.renderFeatureData(null, data)}
        </div>
      </div>
    );
  }
}

export default Product;
